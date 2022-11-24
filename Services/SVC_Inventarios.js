const moment = require("moment");

const DAL_Inventarios = require("../DataAccess/DAL_Inventarios");
const DAL_Proveedores = require("../DataAccess/DAL_Proveedores");

const { Inventario, InventarioBDC } = require("../Entities/Inventario");
const { TransformFromBD } = require("../transformers/transformersBD");

exports.AltaInventario = async (inventario) => {
  let inv = new Inventario(inventario);

  if (!inv.Fecha) inv.Fecha = new Date();

  // Validar existencia de inventario con mismo Codigo (si tiene)
  if (inv.Codigo) {
    console.log("SVC_Inventarios.js - cargó el codigo: ", inv.Codigo);
    let inventario = await DAL_Inventarios.ObtenerInventarioPorCodigo(inv.Codigo);
    if (inventario.Cant > 0) return { ok: false, error: false, existeCodigo: true };
  }


  // Validar existencia proveedor
  console.log("SVC_Inventarios.js - cargó el proveedor id: ", inv.ProveedorId);
  let proveedor = await DAL_Proveedores.ObtenerProveedorPorId(inv.ProveedorId);
  if (proveedor.Error) return { ok: false, error: proveedor.Error };

  if (proveedor.Cant > 0) console.log("existe el proveedor: ", proveedor);
  else return { ok: false, error: true, noExisteProveedor: true };



  // Alta inventario
  let newInventario = await DAL_Inventarios.AltaInventario(inv);
  console.log("SVC_Inventarios.js - alta inventario: ", newInventario);

  if (newInventario.Error) return { ok: false, error: newInventario.Error };
  if (newInventario.Cant > 0) return { ok: true, data: inv };
  else return { ok: false };
};

exports.EditarInventario = async (inventario) => {
  let inv = new Inventario(inventario);

  // Validar existencia
  let invBDC = await DAL_Inventarios.ObtenerInventarioPorId(inv.Id);
  if (invBDC.Error) return { ok: false, error: invBDC.Error };
  if (invBDC.Cant == 0) return { ok: false, noExiste: true };

  let invBD = new InventarioBDC(invBDC.Data[0]);

  console.log("Inventario de la BD ------ ", invBD);


  // Validar existencia de inventario con mismo Codigo (si tiene)
  if (inv.Codigo && inv.Codigo !== invBD.inventario_Codigo) {
    console.log("SVC_Inventarios.js - cargó el codigo: ", inv.Codigo);
    let inventario = await DAL_Inventarios.ObtenerInventarioPorCodigo(inv.Codigo);
    if (inventario.Cant > 0) return { ok: false, error: true, existeCodigo: true };
  }



  // Validar existencia proveedor
  console.log("SVC_Inventarios.js - cargó el proveedor id: ", inv.ProveedorId);
  let proveedor = await DAL_Proveedores.ObtenerProveedorPorId(inv.ProveedorId);
  if (proveedor.Error) return { ok: false, error: proveedor.Error };

  if (proveedor.Cant > 0) console.log("existe el proveedor: ", proveedor);
  else return { ok: false, error: true, noExisteProveedor: true };



  // Detectar cambios
  let newInventario = new Inventario();

  newInventario.Id = invBD.inventario_Id;
  newInventario.Nombre = inv.Nombre ? inv.Nombre : invBD.inventario_Nombre;
  newInventario.Codigo = inv.Codigo ? inv.Codigo : invBD.inventario_Codigo;
  newInventario.ProveedorId = inv.ProveedorId ? inv.ProveedorId : invBD.proveedor_Id;
  newInventario.Fecha = moment(inv.Fecha ? inv.Fecha : invBD.inventario_Fecha).format("YYYY-MM-DD HH:mm:ss");
  newInventario.Activo = inv.Activo ? inv.Activo : invBD.inventario_Activo;


  console.log("SVC_Inventarios.js - Inventario a impactar: ", newInventario);

  // Realizar cambios inventario
  let cambiosInventario = await DAL_Inventarios.EditarInventario(newInventario);
  if (cambiosInventario.Error) return { ok: false, error: cambiosInventario.Error };

  return { ok: true, data: inv };
};

exports.ObtenerInventarios = async () => {
  let inventariosBD = await DAL_Inventarios.ObtenerInventarios();

  if (inventariosBD.Error) return { ok: false, error: inventariosBD.Error };
  else return { ok: true, data: inventariosBD.Data.map(inv => TransformFromBD.inventario(inv)) };
};

exports.ObtenerInventarioPorId = async (idInventario) => {
  let invBDC = await DAL_Inventarios.ObtenerInventarioPorId(idInventario);
  if (invBDC.Error) return { ok: false, error: invBDC.Error };
  if (invBDC.Cant == 0) return { ok: false, noExiste: true };

  else return { ok: true, data: TransformFromBD.inventario(invBDC.Data[0]) };
};

exports.EliminarInventario = async (idInventario) => {

  // Validar existencia
  let inventario = await DAL_Inventarios.ObtenerInventarioPorId(idInventario);
  if (inventario.Error) return { ok: false, error: inventario.Error };

  if (inventario.Cant == 0) return { ok: false, noExiste: true };

  console.log("Eliminar inventario por id:", idInventario);
  let eliminarInventario = await DAL_Inventarios.EliminarInventario(idInventario);
  if (eliminarInventario.Error) return { ok: false, error: eliminarInventario.Error };

  return { ok: true, data: { Id: idInventario } };
};

