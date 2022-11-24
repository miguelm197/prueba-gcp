class Inventario {
  Id;
  Nombre;
  Codigo;
  ProveedorId;
  Fecha;
  Activo;
  Proveedor;

  constructor(inventario) {
    if (inventario) {
      this.Id = inventario.Id || inventario.id || inventario.inventario_Id;
      this.Nombre = inventario.Nombre || inventario.nombre || inventario.inventario_Nombre;
      this.Codigo = inventario.Codigo || inventario.codigo || inventario.inventario_Codigo;
      this.ProveedorId = inventario.ProveedorId || inventario.proveedorId || inventario.proveedor_Id;
      this.Fecha = inventario.Fecha || inventario.fecha || inventario.inventario_Fecha || null;
      this.Activo = inventario.Activo || inventario.activo || inventario.inventario_Activo || true;
    }
  }
}

class InventarioBDC {

  inventario_Id;
  inventario_Nombre;
  inventario_Codigo;
  inventario_Fecha;
  inventario_Activo;
  proveedor_Id;
  proveedor_Codigo;
  proveedor_Activo;
  entidad_Id;
  entidad_Nombre;
  entidad_Email;
  entidad_Telefono;
  entidad_Telefono2;
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


  constructor(invBD) {

    if (invBD) {
      this.inventario_Id = invBD.inventario_Id;
      this.inventario_Nombre = invBD.inventario_Nombre;
      this.inventario_Codigo = invBD.inventario_Codigo;
      this.inventario_Fecha = invBD.inventario_Fecha;
      this.inventario_Activo = invBD.inventario_Activo;
      this.proveedor_Id = invBD.proveedor_Id;
      this.proveedor_Codigo = invBD.proveedor_Codigo;
      this.proveedor_Activo = invBD.proveedor_Activo;
      this.entidad_Id = invBD.entidad_Id;
      this.entidad_Nombre = invBD.entidad_Nombre;
      this.entidad_Email = invBD.entidad_Email;
      this.entidad_Telefono = invBD.entidad_Telefono;
      this.entidad_Telefono2 = invBD.entidad_Telefono2;
      this.empresa_Id = invBD.empresa_Id;
      this.empresa_Nombre = invBD.empresa_Nombre;
      this.empresa_RazonSocial = invBD.empresa_RazonSocial;
      this.empresa_Rut = invBD.empresa_Rut;
      this.empresa_Direccion = invBD.empresa_Direccion;
      this.empresa_PaisId = invBD.empresa_PaisId;
      this.empresa_EstadoId = invBD.empresa_EstadoId;
      this.empresa_Ciudad = invBD.empresa_Ciudad;
      this.empresa_Comentario = invBD.empresa_Comentario;
      this.empresa_Activo = invBD.empresa_Activo;
    }
  }
}

module.exports = { Inventario, InventarioBDC };
