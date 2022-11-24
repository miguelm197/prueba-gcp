const { Generico } = require("../Entities/Genericos");
const log = require("../Utils/Log");

const SVC_Clientes = require("../Services/SVC_Clientes");

exports.AltaCliente = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("POST - AltaCliente /clientes/alta \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Nombre) retorno.set(false, 406, "El nombre es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Crear cliente
  let newCliente = await SVC_Clientes.AltaCliente(body);

  if (newCliente.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (newCliente.existe) retorno.set(false, 400, "El email " + body.email + " ya está registrado.");
  if (newCliente.noExisteEmpresa) retorno.set(false, 400, "La empresa no está registrada.");
  if (newCliente.existeCodigo) retorno.set(false, 406, "El código " + body.codigo + " ya está registrado.");


  if (newCliente.ok) retorno.set(true, 200, "Cliente creado correctamente.", newCliente.data);

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerClientes = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerClientes /clientes/lista \n", true);

  let retorno = new Generico();

  // Obtener los clientes
  let clientes = await SVC_Clientes.ObtenerClientes();
  if (clientes.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (clientes.ok) retorno.set(true, 200, "Lista de clientes registrados.");
  retorno.Data = clientes.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerClientePorId = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerClientePorId /clientes/{id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  // Obtener el cliente
  let clientes = await SVC_Clientes.ObtenerClientePorId(params.Id);
  if (clientes.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (clientes.ok) retorno.set(true, 200, `Cliente con id ${params.Id}.`);
  retorno.Data = clientes.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.EditarCliente = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("PUT - Editarcliente /clientes/editar \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.Id) retorno.set(false, 406, "El id es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Editar cliente
  let cambioCliente = await SVC_Clientes.EditarCliente(body);

  if (cambioCliente.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (cambioCliente.noExiste) retorno.set(false, 400, "El cliente no está registrado");
  if (cambioCliente.noExisteEmpresa) retorno.set(false, 400, "La empresa no está registrada.");
  if (cambioCliente.existeCodigo) retorno.set(false, 406, "El código '" + body.Codigo + "' ya está registrado.");

  if (cambioCliente.ok) retorno.set(true, 200, "Cliente actualizado correctamente.", cambioCliente.data);

  return res.status(retorno.Status).json(retorno);
};

exports.EliminarCliente = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("DELETE - EliminarCliente /clientes/{Id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Eliminar cliente
  let eliminarCliente = await SVC_Clientes.EliminarCliente(params.Id);

  if (eliminarCliente.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (eliminarCliente.noExiste) retorno.set(false, 400, "El cliente no está registrado");

  if (eliminarCliente.ok) retorno.set(true, 200, "Cliente eliminado correctamente.", eliminarCliente.data);

  return res.status(retorno.Status).json(retorno);
};

// TODO: ObtenerClientePorEmail

// TODO: EditarCliente

// TODO: BajaCliente
