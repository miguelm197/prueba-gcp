const DAL_Entidades = require("../DataAccess/DAL_Entidades");
const DAL_Empresas = require("../DataAccess/DAL_Empresas");
const DAL_Proveedores = require("../DataAccess/DAL_Proveedores");
const { Proveedor, ProveedorBDC } = require("../Entities/Proveedor");
const { TransformFromBD } = require("../transformers/transformersBD");

exports.AltaProveedor = async (proveedor) => {
  let prov = new Proveedor(proveedor);

  let Entidad = false;
  let Empresa = false;

  // Validar existencia de Email en Entidades (si tiene)
  if (prov.Email) {
    console.log("cargó el email: ", prov.Email);
    let entidad = await DAL_Entidades.ObtenerEntidadPorEmail(prov.Email);
    if (entidad.Error) return { ok: false, error: entidad.Error };

    // SI existe la entidad
    if (entidad.Cant > 0) {
      Entidad = entidad.Data[0];
      console.log("tiene entidad: ", Entidad);

      // Validar existencia de PROVEEDOR por IdEntidad
      let proveedor = await DAL_Proveedores.ObtenerProveedorPorIdEntidad(Entidad.Id);
      if (proveedor.Error) return { ok: false, error: proveedor.Error };

      // SI existe el proveedor
      if (proveedor.Cant > 0) console.log("existe el proveedor: ", proveedor);
      if (proveedor.Cant > 0) return { ok: false, error: false, existe: true };
      console.log("no tiene proveedor");
      prov.EntidadId = Entidad.Id;
    }
  }


  // Validar existencia de Empresa si tiene EmpresaId
  if (prov.EmpresaId) {
    console.log("cargó la empresaId: ", prov.EmpresaId);
    let empresa = await DAL_Empresas.ObtenerEmpresaPorId(prov.EmpresaId);
    if (empresa.Error) return { ok: false, error: empresa.Error };

    // Si hay
    if (empresa.Cant > 0) console.log("existe la empresa: ", empresa);
    else console.log("no existe la empresa ");

    if (empresa.Cant > 0) Empresa = empresa.Data[0];
    else return { ok: false, error: true, noExisteEmpresa: true };
  } else console.log("no cargó empresa");


  // Validar existencia de proveedor con mismo Codigo (si tiene)
  if (prov.Codigo) {
    console.log("SVC_Proveedores.js - cargó el codigo: ", prov.Codigo);
    let proveedor = await DAL_Proveedores.ObtenerProveedorPorCodigo(prov.Codigo);
    if (proveedor.Cant > 0) return { ok: false, error: true, existeCodigo: true };
  }


  // Crear la entidad si no la hay o si no tiene Email
  if (!Entidad || !prov.Email) {
    console.log("no tiene entidad o no tiene email (crear entidad)");
    let newEntidad = await DAL_Entidades.AltaEntidad(prov);
    if (newEntidad.Error) return { ok: false, error: newEntidad.Error };

    Entidad = { Id: newEntidad.Data[0].Id };
    prov.EntidadId = Entidad.Id;
    console.log("entidad creada: ", Entidad);
  }

  // Alta proveedor
  let newProveedor = await DAL_Proveedores.AltaProveedor(prov);
  console.log("alta proveedor: ", newProveedor);

  prov.EntidadId = Entidad.Id;
  prov.Id = newProveedor.Data[0].Id;

  if (newProveedor.Error) return { ok: false, error: newProveedor.Error };
  if (newProveedor.Cant > 0) return { ok: true, data: prov };
  else return { ok: false };
};

exports.EditarProveedor = async (proveedor) => {
  let prov = new Proveedor(proveedor);

  // Validar existencia
  let proBDC = await DAL_Proveedores.ObtenerProveedorPorId(prov.Id);
  if (proBDC.Error) return { ok: false, error: proBDC.Error };
  if (proBDC.Cant == 0) return { ok: false, noExiste: true };

  let proBD = new ProveedorBDC(proBDC.Data[0]);


  // Validar existencia de proveedor con mismo Codigo (si tiene)
  if (prov.Codigo && prov.Codigo !== proBD.proveedor_Codigo) {
    console.log("SVC_Proveedores.js - cargó el codigo: ", prov.Codigo);
    let proveedor = await DAL_Proveedores.ObtenerProveedorPorCodigo(prov.Codigo);
    if (proveedor.Cant > 0) return { ok: false, error: true, existeCodigo: true };
  }


  // Validar existencia de Empresa si tiene EmpresaId
  if (prov.EmpresaId) {
    console.log("cargó la empresaId: ", prov.EmpresaId);
    let empresa = await DAL_Empresas.ObtenerEmpresaPorId(prov.EmpresaId);
    if (empresa.Error) return { ok: false, error: empresa.Error };

    // Si hay
    if (empresa.Cant > 0) console.log("existe la empresa: ", empresa);
    else console.log("no existe la empresa ");

    if (empresa.Cant > 0) Empresa = empresa.Data[0];
    else return { ok: false, error: true, noExisteEmpresa: true };
  } else console.log("no cargó empresa");

  console.log("SVC_Proveedores.js - Proveedor de la BD ------ ", proBD);

  // Detectar cambios
  let newProveedor = new Proveedor(proBD);

  if (prov.Id) newProveedor.Id = prov.Id;
  if (prov.Nombre) newProveedor.Nombre = prov.Nombre;
  if (prov.Codigo) newProveedor.Codigo = prov.Codigo;
  if (prov.Activo) newProveedor.Activo = prov.Activo;

  newProveedor.Email = prov.Email || '';
  newProveedor.Telefono = prov.Telefono || '';
  newProveedor.Telefono2 = prov.Telefono2 || '';
  newProveedor.EmpresaId = prov.EmpresaId || null;

  console.log("SVC_proveedores.js - Proveedor a impactar: ", newProveedor);

  // Realizar cambios entidad
  let cambiosEntidad = await DAL_Entidades.EditarEntidad(newProveedor);
  if (cambiosEntidad.Error) return { ok: false, error: cambiosEntidad.Error };

  // Realizar cambios proveedor
  let cambiosProveedor = await DAL_Proveedores.EditarProveedor(newProveedor);
  if (cambiosProveedor.Error) return { ok: false, error: cambiosProveedor.Error };

  return { ok: true, data: prov };
};

exports.ObtenerProveedores = async () => {
  let prosBDC = await DAL_Proveedores.ObtenerProveedores();
  if (prosBDC.Error) return { ok: false, error: prosBDC.Error };
  else return { ok: true, data: prosBDC.Data.map(pro => TransformFromBD.proveedor(pro)) };
};

exports.ObtenerProveedorPorId = async (idProveedor) => {
  let proBDC = await DAL_Proveedores.ObtenerProveedorPorId(idProveedor);

  if (proBDC.Error) return { ok: false, error: proBDC.Error };
  if (proBDC.Cant == 0) return { ok: false, noExiste: true };

  return { ok: true, data: TransformFromBD.proveedor(proBDC.Data[0]) };
};

exports.EliminarProveedor = async (idProveedor) => {
  // Validar existencia
  let proveedor = await DAL_Proveedores.ObtenerProveedorPorId(idProveedor);
  if (proveedor.Error) return { ok: false, error: proveedor.Error };

  // TODO: Validar transacciones

  if (proveedor.Cant == 0) return { ok: false, noExiste: true };

  console.log("Eliminar proveedor por id:", idProveedor);
  let eliminarProveedor = await DAL_Proveedores.EliminarProveedor(idProveedor);
  if (eliminarProveedor.Error) return { ok: false, error: eliminarProveedor.Error };

  return { ok: true, data: { Id: idProveedor } };
};

// TODO: Asociar empresa al Proveedor
