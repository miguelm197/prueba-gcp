const DAL_Entidades = require("../DataAccess/DAL_Entidades");
const DAL_Empresas = require("../DataAccess/DAL_Empresas");
const DAL_Clientes = require("../DataAccess/DAL_Clientes");

const { Cliente, ClienteBDC } = require("../Entities/Cliente");
const { TransformFromBD } = require("../transformers/transformersBD");


exports.AltaCliente = async (cliente) => {
  let cli = new Cliente(cliente);

  let Entidad = false;
  let Empresa = false;

  // Validar existencia de Email en Entidades (si tiene)
  if (cli.Email) {
    console.log("cargó el email: ", cli.Email);
    let entidad = await DAL_Entidades.ObtenerEntidadPorEmail(cli.Email);
    if (entidad.Error) return { ok: false, error: entidad.Error };

    // SI existe la entidad
    if (entidad.Cant > 0) {
      Entidad = entidad.Data[0];
      console.log("tiene entidad: ", Entidad);

      // Validar existencia de CLIENTE por IdEntidad
      let cliente = await DAL_Clientes.ObtenerClientePorIdEntidad(Entidad.Id);
      if (cliente.Error) return { ok: false, error: cliente.Error };

      // SI existe el cliente
      if (cliente.Cant > 0) console.log("existe el cliente: ", cliente);
      if (cliente.Cant > 0) return { ok: false, error: false, existe: true };
      console.log("no tiene cliente");
      cli.EntidadId = Entidad.Id;
    }
  }

  // Validar existencia de Empresa si tiene EmpresaId
  if (cli.EmpresaId) {
    console.log("cargó la empresaId: ", cli.EmpresaId);
    let empresa = await DAL_Empresas.ObtenerEmpresaPorId(cli.EmpresaId);
    if (empresa.Error) return { ok: false, error: empresa.Error };

    // Si hay
    if (empresa.Cant > 0) console.log("existe la empresa: ", empresa);
    else console.log("no existe la empresa ");

    if (empresa.Cant > 0) Empresa = empresa.Data[0];
    else return { ok: false, error: true, noExisteEmpresa: true };
  } else console.log("no cargó empresa");


  // Validar existencia de cliente con mismo Codigo (si tiene)
  if (cli.Codigo) {
    console.log("SVC_Clientes.js - cargó el codigo: ", cli.Codigo);
    let cliente = await DAL_Clientes.ObtenerClientePorCodigo(cli.Codigo);
    if (cliente.Cant > 0) return { ok: false, error: true, existeCodigo: true };
  }

  
  // Crear la entidad si no la hay o si no tiene Email
  if (!Entidad || !cli.Email) {
    console.log("no tiene entidad o no tiene email (crear entidad)");
    let newEntidad = await DAL_Entidades.AltaEntidad(cli);
    if (newEntidad.Error) return { ok: false, error: newEntidad.Error };

    Entidad = { Id: newEntidad.Data[0].Id };
    cli.EntidadId = Entidad.Id;
    console.log("entidad creada: ", Entidad);
  }

  // Alta cliente
  let newCliente = await DAL_Clientes.AltaCliente(cli);
  console.log("alta cliente: ", newCliente);

  cli.EntidadId = Entidad.Id;
  cli.Id = newCliente.Data[0].Id;

  if (newCliente.Error) return { ok: false, error: newCliente.Error };
  if (newCliente.Cant > 0) return { ok: true, data: cli };
  else return { ok: false };
};

exports.EditarCliente = async (cliente) => {
  let cli = new Cliente(cliente);

  // Validar existencia
  let cliBDC = await DAL_Clientes.ObtenerClientePorId(cli.Id);
  if (cliBDC.Error) return { ok: false, error: cliBDC.Error };
  if (cliBDC.Cant == 0) return { ok: false, noExiste: true };


  let cliBD = new ClienteBDC(cliBDC.Data[0]);



  // Validar existencia de cliente con mismo Codigo (si tiene)
  if (cli.Codigo && cli.Codigo !== cliBD.cliente_Codigo) {
    console.log("SVC_Clientes.js - cargó el codigo: ", cli.Codigo);
    let cliente = await DAL_Clientes.ObtenerClientePorCodigo(cli.Codigo);
    if (cliente.Cant > 0) return { ok: false, error: true, existeCodigo: true };
  }



  // Validar existencia de Empresa si tiene EmpresaId
  if (cli.EmpresaId) {
    console.log("cargó la empresaId: ", cli.EmpresaId);
    let empresa = await DAL_Empresas.ObtenerEmpresaPorId(cli.EmpresaId);
    if (empresa.Error) return { ok: false, error: empresa.Error };

    // Si hay
    if (empresa.Cant > 0) console.log("existe la empresa: ", empresa);
    else console.log("no existe la empresa ");

    if (empresa.Cant > 0) Empresa = empresa.Data[0];
    else return { ok: false, error: true, noExisteEmpresa: true };
  } else console.log("no cargó empresa");

  console.log("SVC_Clientes.js - Cliente de la BD ------ ", cliBD);

  // Detectar cambios
  let newCliente = new Cliente(cliBD);

  if (cli.Id) newCliente.Id = cli.Id;
  if (cli.Nombre) newCliente.Nombre = cli.Nombre;
  if (cli.Codigo) newCliente.Codigo = cli.Codigo;
  if (cli.Activo) newCliente.Activo = cli.Activo;

  newCliente.Email = cli.Email || '';
  newCliente.Telefono = cli.Telefono || '';
  newCliente.Telefono2 = cli.Telefono2 || '';
  newCliente.EmpresaId = cli.EmpresaId || null;

  console.log("SVC_Clientes.js - Cliente a impactar", newCliente);

  // Realizar cambios entidad
  let cambiosEntidad = await DAL_Entidades.EditarEntidad(newCliente);
  if (cambiosEntidad.Error) return { ok: false, error: cambiosEntidad.Error };

  // Realizar cambios cliente
  let cambiosCliente = await DAL_Clientes.EditarCliente(newCliente);
  if (cambiosCliente.Error) return { ok: false, error: cambiosCliente.Error };

  return { ok: true, data: cli };
};

exports.ObtenerClientes = async () => {
  let clisBD = await DAL_Clientes.ObtenerClientes();

  if (clisBD.Error) return { ok: false, error: clisBD.Error };
  else return { ok: true, data: clisBD.Data.map(cli => TransformFromBD.cliente(cli)) };
};

exports.ObtenerClientePorId = async (idCliente) => {
  let cliBDC = await DAL_Clientes.ObtenerClientePorId(idCliente);
  
  if (cliBDC.Error) return { ok: false, error: cliBDC.Error };
  else return { ok: true, data: TransformFromBD.cliente(cliBDC.Data[0]) };
};

exports.EliminarCliente = async (idCliente) => {
  console.log(idCliente)
  // Validar existencia
  let cliente = await DAL_Clientes.ObtenerClientePorId(idCliente);
  if (cliente.Error) return { ok: false, error: cliente.Error };

  // TODO: Validar transacciones

  if (cliente.Cant == 0) return { ok: false, noExiste: true };

  console.log("Eliminar cliente por id:", idCliente);
  let eliminarCliente = await DAL_Clientes.EliminarCliente(idCliente);
  if (eliminarCliente.Error) return { ok: false, error: eliminarCliente.Error };

  return { ok: true, data: { Id: idCliente } };
};

// TODO: Asociar empresa al cliente
