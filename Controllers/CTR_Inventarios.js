const { Generico } = require("../Entities/Genericos");
const log = require("../Utils/Log");

const SVC_Inventarios = require("../Services/SVC_Inventarios");

exports.AltaInventario = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("POST - AltaInventario /inventarios/alta \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.proveedorId) retorno.set(false, 406, "El proveedorId es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Crear inventario
  let newInventario = await SVC_Inventarios.AltaInventario(body);

  if (newInventario.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (newInventario.existeCodigo) retorno.set(false, 406, "El código " + body.codigo + " ya está registrado.");
  if (newInventario.noExisteProveedor) retorno.set(false, 406, "El proveedor no está registrado.");

  if (newInventario.ok) retorno.set(true, 200, "Inventario creado correctamente.", newInventario.data);

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerInventarios = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerInventarios /inventarios/lista \n", true);

  let retorno = new Generico();

  // Obtener los inentarios
  let inventarios = await SVC_Inventarios.ObtenerInventarios();
  if (inventarios.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (inventarios.ok) retorno.set(true, 200, "Lista de inventarios registrados.");
  retorno.Data = inventarios.data;

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerInventarioPorId = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerInventarioPorId /inventario/{id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  // Obtener el inventario
  let inventario = await SVC_Inventarios.ObtenerInventarioPorId(params.Id);
  if (inventario.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (inventario.noExiste) retorno.set(false, 400, "El inventario no está registrado");


  if (inventario.ok) retorno.set(true, 200, `Inventario con id ${params.Id}.`);
  retorno.Data = inventario.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.EditarInventario = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("PUT - EditarInventario /inventarios/editar \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.id) retorno.set(false, 406, "El identificador del inventario es requerido");
  if (!body.nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.proveedorId) retorno.set(false, 406, "El proveedor es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Editar inventario
  let cambioInventario = await SVC_Inventarios.EditarInventario(body);

  if (cambioInventario.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (cambioInventario.noExiste) retorno.set(false, 400, "El proveedor no está registrado");
  if (cambioInventario.existeCodigo) retorno.set(false, 406, "El código " + body.codigo + " ya está registrado.");
  if (cambioInventario.noExisteProveedor) retorno.set(false, 400, "La empresa no está registrada.");

  if (cambioInventario.ok) retorno.set(true, 200, "Inventario actualizado correctamente.", cambioInventario.data);

  return res.status(retorno.Status).json(retorno);
};

exports.EliminarInventario = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("DELETE - EliminarInventario /inventario/{Id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Eliminar inventario
  let eliminarInventarioResp = await SVC_Inventarios.EliminarInventario(params.Id);

  if (eliminarInventarioResp.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (eliminarInventarioResp.noExiste) retorno.set(false, 400, "El inventario no está registrado");

  if (eliminarInventarioResp.ok) retorno.set(true, 200, "Inventario eliminado correctamente.", eliminarInventarioResp.data);

  return res.status(retorno.Status).json(retorno);
};

// TODO: ObtenerProveeodorPorEmail

// TODO: EditarProveeodor

// TODO: BajaProveeodor
