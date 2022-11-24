const express = require("express");
const app = express();

const { verificaToken, ADMINISTRADOR } = require("./Middlewares/MID_Auth");

// Controladores
const CTR_AUTH = require("./Controllers/CTR_Auth");
const CTR_USUARIOS = require("./Controllers/CTR_Usuarios");
const CTR_CLIENTES = require("./Controllers/CTR_Clientes");
const CTR_PROVEEDORES = require("./Controllers/CTR_Proveedores.js");
const CTR_INVENTARIOS = require("./Controllers/CTR_Inventarios.js");
const CTR_EMPRESAS = require("./Controllers/CTR_Empresas");

// #region RUTAS WEB

// Auth
app.post("/api/auth/login", CTR_AUTH.Login);
app.post("/api/auth/registro", CTR_USUARIOS.AltaUsuario);

// Usuarios
// app.get("/usuarios/:id", verificaTokenWEB, CTR_USUARIOS.ObtenerUsuarioPorId);

// #endregion ----------------------------------------------------------------------------------

// #region RUTAS API
// Auth
app.post("/api/auth/loginBO", CTR_AUTH.LoginBO);

// Usuarios
app.post("/api/usuarios/alta", [verificaToken, ADMINISTRADOR], CTR_USUARIOS.AltaUsuario);
app.put("/api/usuarios/editar", [verificaToken, ADMINISTRADOR], CTR_USUARIOS.EditarUsuario);
app.get("/api/usuarios/lista", [verificaToken, ADMINISTRADOR], CTR_USUARIOS.ObtenerUsuarios);
app.get("/api/usuarios/:Id", [verificaToken, ADMINISTRADOR], CTR_USUARIOS.ObtenerUsuarioPorId);
app.delete("/api/usuarios/:Id", [verificaToken, ADMINISTRADOR], CTR_USUARIOS.DesactivarUsuario);

// Clientes
app.post("/api/clientes/alta", [verificaToken, ADMINISTRADOR], CTR_CLIENTES.AltaCliente);
app.get("/api/clientes/lista", [verificaToken, ADMINISTRADOR], CTR_CLIENTES.ObtenerClientes);
app.put("/api/clientes/editar", [verificaToken, ADMINISTRADOR], CTR_CLIENTES.EditarCliente);

app.get("/api/cliente/:Id", [verificaToken, ADMINISTRADOR], CTR_CLIENTES.ObtenerClientePorId);
app.delete("/api/cliente/:Id", [verificaToken, ADMINISTRADOR], CTR_CLIENTES.EliminarCliente);

// Proveedores
app.post("/api/proveedores/alta", [verificaToken, ADMINISTRADOR], CTR_PROVEEDORES.AltaProveedor);
app.get("/api/proveedores/lista", [verificaToken, ADMINISTRADOR], CTR_PROVEEDORES.ObtenerProveedores);
app.put("/api/proveedores/editar", [verificaToken, ADMINISTRADOR], CTR_PROVEEDORES.EditarProveedor);

app.get("/api/proveedor/:Id", [verificaToken, ADMINISTRADOR], CTR_PROVEEDORES.ObtenerProveedorPorId);
app.delete("/api/proveedor/:Id", [verificaToken, ADMINISTRADOR], CTR_PROVEEDORES.EliminarProveedor);

// Empresas
app.post("/api/empresas/alta", [verificaToken, ADMINISTRADOR], CTR_EMPRESAS.AltaEmpresa);
app.get("/api/empresas/lista", [verificaToken, ADMINISTRADOR], CTR_EMPRESAS.ObtenerEmpresas);
app.get("/api/empresas/:Id", [verificaToken, ADMINISTRADOR], CTR_EMPRESAS.ObtenerEmpresaPorId);


// Inventarios
app.post("/api/inventarios/alta", [verificaToken, ADMINISTRADOR], CTR_INVENTARIOS.AltaInventario);
app.get("/api/inventarios/lista", [verificaToken, ADMINISTRADOR], CTR_INVENTARIOS.ObtenerInventarios);
app.put("/api/inventarios/editar", [verificaToken, ADMINISTRADOR], CTR_INVENTARIOS.EditarInventario);

app.get("/api/inventario/:Id", [verificaToken, ADMINISTRADOR], CTR_INVENTARIOS.ObtenerInventarioPorId);
app.delete("/api/inventario/:Id", [verificaToken, ADMINISTRADOR], CTR_INVENTARIOS.EliminarInventario);


// #endregion ----------------------------------------------------------------------------------

module.exports = app;
