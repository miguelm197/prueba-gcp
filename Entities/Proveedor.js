const { Entidad } = require("./Entidad");

class Proveedor extends Entidad {
  Id;
  EntidadId;
  EmpresaId;
  Codigo;
  Activo;
  Empresa;

  constructor(proveedor) {
    super(proveedor);

    if (proveedor) {
      this.Id = proveedor.proveedorId || proveedor.Id || proveedor.id;
      this.EntidadId = proveedor.EntidadId || proveedor.entidadId;
      this.EmpresaId = proveedor.EmpresaId;
      this.Codigo = proveedor.Codigo || proveedor.codigo;
      this.Activo = proveedor.proveedorActivo || proveedor.Activo || proveedor.activo || true;
    }
  }
}


class ProveedorBDC {
  entidad_Id;
  proveedor_Id;
  entidad_Nombre;
  entidad_Email;
  proveedor_Codigo;
  entidad_Telefono;
  entidad_Telefono2;
  proveedor_EmpresaId;
  proveedor_Activo;
  empresa_Id;
  empresa_Nombre;
  empresa_RazonSocial;
  empresa_Rut;
  empresa_Direccion;
  empresa_PaisId;
  empresa_EstadoId;
  empresa_Ciudad;
  empresa_Comentario;
  empresa_Activo;

  constructor(proBD) {
    this.entidad_Id = proBD.entidad_Id;
    this.proveedor_Id = proBD.proveedor_Id;
    this.entidad_Nombre = proBD.entidad_Nombre;
    this.entidad_Email = proBD.entidad_Email;
    this.proveedor_Codigo = proBD.proveedor_Codigo;
    this.entidad_Telefono = proBD.entidad_Telefono;
    this.entidad_Telefono2 = proBD.entidad_Telefono2;
    this.proveedor_EmpresaId = proBD.proveedor_EmpresaId;
    this.proveedor_Activo = proBD.proveedor_Activo;
    this.empresa_Id = proBD.empresa_Id;
    this.empresa_Nombre = proBD.empresa_Nombre;
    this.empresa_RazonSocial = proBD.empresa_RazonSocial;
    this.empresa_Rut = proBD.empresa_Rut;
    this.empresa_Direccion = proBD.empresa_Direccion;
    this.empresa_PaisId = proBD.empresa_PaisId;
    this.empresa_EstadoId = proBD.empresa_EstadoId;
    this.empresa_Ciudad = proBD.empresa_Ciudad;
    this.empresa_Comentario = proBD.empresa_Comentario;
    this.empresa_Activo = proBD.empresa_Activo;
  }
}

module.exports = { Proveedor, ProveedorBDC };
