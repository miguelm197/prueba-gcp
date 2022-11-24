class Entidad {
  Id;
  Nombre;
  Email;
  Telefono;
  Telefono2;
  Activo;

  constructor(entidad) {
    this.Id = entidad.EntidadId || entidad.Id || entidad.id;
    this.Nombre = entidad.Nombre || entidad.nombre;
    this.Email = entidad.Email || entidad.email;
    this.Telefono = entidad.Telefono || entidad.telefono || "";
    this.Telefono2 = entidad.Telefono2 || entidad.telefono2 || "";
    this.Activo = entidad.EntidadActivo || entidad.Activo || entidad.activo || true;
  }
}

module.exports = { Entidad };
