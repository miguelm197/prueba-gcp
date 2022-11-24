const DAL_Empresas = require("../DataAccess/DAL_Empresas");
const { Empresa } = require("../Entities/Empresa");

exports.ObtenerEmpresas = async () => {
  let empresas = await DAL_Empresas.ObtenerEmpresas();
  console.log("ObtenerEmpresas:", empresas);

  if (empresas.Error) return { ok: false, error: empresas.Error };
  else return { ok: true, data: empresas.Data };
};

exports.ObtenerEmpresaPorId = async (idEmpresa) => {
  let empresa = await DAL_Empresas.ObtenerEmpresaPorId(idEmpresa);
  console.log("Empresa:", empresa);

  if (empresa.Error) return { ok: false, error: empresa.Error };
  else return { ok: true, data: empresa.Data[0] };
};

exports.AltaEmpresa = async (empresa) => {
  let emp = new Empresa(empresa);

  // Validar existencia de empresa por RUT
  let empresaBd = await DAL_Empresas.ObtenerEmpresaPorRut(emp.Rut);
  if (empresaBd.Error) return { ok: false, error: empresaBd.Error };
  if (empresaBd.Cant > 0) return { ok: false, existe: true };

  let newEmpresa = await DAL_Empresas.AltaEmpresa(emp);
  console.log("newEmpresa", newEmpresa);
  if (newEmpresa.Error) return { ok: false, error: newEmpresa.Error };

  emp.Id = newEmpresa.Id;

  return { ok: true, data: emp };
};

// Editar empresa

// Eliminar empresa
