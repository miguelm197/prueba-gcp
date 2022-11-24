const { Entidad } = require("./Entidad");

class Cliente extends Entidad {
  Id;
  EntidadId;
  EmpresaId;
  Codigo;
  Activo;
  Empresa;

  constructor(cliente) {
    super(cliente);

    if (cliente) {
      this.Id = cliente.clienteId || cliente.Id || cliente.id;
      this.EntidadId = cliente.EntidadId || cliente.entidadId;
      this.EmpresaId = cliente.EmpresaId;
      this.Codigo = cliente.Codigo || cliente.codigo;
      this.Activo = cliente.clienteActivo || cliente.Activo || cliente.activo || true;
    }
  }
}


class ClienteBDC {
  entidad_Id;
  cliente_Id;
  entidad_Nombre;
  entidad_Email;
  cliente_Codigo;
  entidad_Telefono;
  entidad_Telefono2;
  cliente_EmpresaId;
  cliente_Activ;
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

  constructor(cliBD) {
    this.entidad_Id = cliBD.entidad_Id;
    this.cliente_Id = cliBD.cliente_Id;
    this.entidad_Nombre = cliBD.entidad_Nombre;
    this.entidad_Email = cliBD.entidad_Email;
    this.cliente_Codigo = cliBD.cliente_Codigo;
    this.entidad_Telefono = cliBD.entidad_Telefono;
    this.entidad_Telefono2 = cliBD.entidad_Telefono2;
    this.cliente_EmpresaId = cliBD.cliente_EmpresaId;
    this.cliente_Activ = cliBD.cliente_Activ;
    this.empresa_Id = cliBD.empresa_Id;
    this.empresa_Nombre = cliBD.empresa_Nombre;
    this.empresa_RazonSocial = cliBD.empresa_RazonSocial;
    this.empresa_Rut = cliBD.empresa_Rut;
    this.empresa_Direccion = cliBD.empresa_Direccion;
    this.empresa_PaisId = cliBD.empresa_PaisId;
    this.empresa_EstadoId = cliBD.empresa_EstadoId;
    this.empresa_Ciudad = cliBD.empresa_Ciudad;
    this.empresa_Comentario = cliBD.empresa_Comentario;
    this.empresa_Activo = cliBD.empresa_Activo;
  }
}

module.exports = { Cliente, ClienteBDC };
