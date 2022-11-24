class Empresa {
  Id;
  Nombre;
  RazonSocial;
  Rut;
  Direccion;
  EstadoId;
  PaisId;
  Ciudad;
  Comentario;
  Activo;

  constructor(empresa) {
    if (empresa) {
      if (empresa.Id) this.Id = empresa.Id;
      if (empresa.Nombre) this.Nombre = empresa.Nombre;
      if (empresa.RazonSocial) this.RazonSocial = empresa.RazonSocial;
      if (empresa.Rut) this.Rut = empresa.Rut;
      if (empresa.Direccion) this.Direccion = empresa.Direccion;
      if (empresa.EstadoId) this.EstadoId = empresa.EstadoId;
      if (empresa.PaisId) this.PaisId = empresa.PaisId;
      if (empresa.Ciudad) this.Ciudad = empresa.Ciudad;
      if (empresa.Comentario) this.Comentario = empresa.Comentario;
      if (empresa.Activo) this.Activo = empresa.Activo;
    }
  }
}

module.exports = { Empresa };
