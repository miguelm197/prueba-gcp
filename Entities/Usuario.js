const { ROLES } = require("./Auth");

class Usuario  {
  Id;
  Nombre;
  Email;
  Telefono;
  Telefono2;
  Password;
  EmailValidado;
  RolId = ROLES.CLIENTE;
  Activo = true;

  constructor(usuario) {
    if (usuario) {
      if(usuario.Id) this.Id = usuario.Id;
      if(usuario.Nombre) this.Nombre = usuario.Nombre;
      if(usuario.Email) this.Email = usuario.Email;
      if(usuario.Telefono) this.Telefono = usuario.Telefono;
      if(usuario.Telefono2) this.Telefono2 = usuario.Telefono2;
      if(usuario.Password) this.Password = usuario.Password;
      if(usuario.EmailValidado) this.EmailValidado = usuario.EmailValidado;
      if(usuario.RolId) this.RolId = usuario.RolId;
      if(usuario.Activo) this.Activo = usuario.Activo;
    }
  }
}

module.exports = { Usuario };
