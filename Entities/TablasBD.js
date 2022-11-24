class UsuarioBD {
    Id;
    Nombre;
    Email;
    Password;
    EmailValidado;
    RolId;
    Telefono;
    Telefono2;
    Activo;

    constructor(usuario) {
        if (usuario) {
            if (usuario.Id) this.Id = usuario.Id;
            if (usuario.Nombre) this.Nombre = usuario.Nombre;
            if (usuario.Email) this.Email = usuario.Email;
            if (usuario.Password) this.Password = usuario.Password;
            if (usuario.EmailValidado) this.EmailValidado = usuario.EmailValidado;
            if (usuario.RolId) this.RolId = usuario.RolId;
            if (usuario.Telefono) this.Telefono = usuario.Telefono;
            if (usuario.Telefono2) this.Telefono2 = usuario.Telefono2;
            if (usuario.Activo) this.Activo = usuario.Activo;
        }
    }
}

class EmpresaBD {
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
module.exports = { UsuarioBD, EmpresaBD };