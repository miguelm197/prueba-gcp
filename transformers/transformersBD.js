const { Cliente } = require("../Entities/Cliente");
const { Empresa } = require("../Entities/Empresa");
const { Inventario } = require("../Entities/Inventario");
const { Proveedor } = require("../Entities/Proveedor");

exports.TransformFromBD = {
    inventario: (inv) => {

        let inventario = new Inventario({
            Id: inv.inventario_Id,
            Nombre: inv.inventario_Nombre,
            Codigo: inv.inventario_Codigo,
            Fecha: inv.inventario_Fecha,
            Activ: inv.inventario_Activo,
            ProveedorId: inv.proveedor_Id
        })

        if (inv.proveedor_Id) {
            inventario.Proveedor = new Proveedor({
                Id: inv.proveedor_Id,
                EntidadId: inv.entidad_Id,
                EmpresaId: inv.empresa_Id,
                Codigo: inv.proveedor_Codigo,
                Activo: inv.proveedor_Activo,

                Nombre: inv.entidad_Nombre,
                Email: inv.entidad_Email,
                Telefono: inv.entidad_Telefono,
                Telefono2: inv.entidad_Telefono2,
            });

            if (inv.empresa_Id) {
                inventario.Proveedor.Empresa = new Empresa({
                    Id: inv.empresa_Id,
                    Nombre: inv.empresa_Nombre,
                    RazonSocial: inv.empresa_RazonSocial,
                    Rut: inv.empresa_Rut,
                    Direccion: inv.empresa_Direccion,
                    EstadoId: inv.empresa_EstadoId,
                    PaisId: inv.empresa_PaisId,
                    Ciudad: inv.empresa_Ciudad,
                    Comentario: inv.empresa_Comentario,
                    Activo: inv.empresa_Activo,
                });
            }
        }

        return inventario;
    },

    cliente: (cli) => {
        let cliente = new Cliente({
            Id: cli.cliente_Id,
            EntidadId: cli.entidad_Id,
            EmpresaId: cli.empresa_Id,
            Codigo: cli.cliente_Codigo,
            Activo: cli.cliente_Activo,

            Nombre: cli.entidad_Nombre,
            Email: cli.entidad_Email,
            Telefono: cli.entidad_Telefono,
            Telefono2: cli.entidad_Telefono2,
        });

        if (cli.empresa_Id) {
            cliente.Empresa = new Empresa({
                Id: cli.empresa_Id,
                Nombre: cli.empresa_Nombre,
                RazonSocial: cli.empresa_RazonSocial,
                Rut: cli.empresa_Rut,
                Direccion: cli.empresa_Direccion,
                EstadoId: cli.empresa_EstadoId,
                PaisId: cli.empresa_PaisId,
                Ciudad: cli.empresa_Ciudad,
                Comentario: cli.empresa_Comentario,
                Activo: cli.empresa_Activo,
            });
        }

        return cliente;
    },

    proveedor: (pro) => {
        let proveedor = new Proveedor({
            Id: pro.proveedor_Id,
            EntidadId: pro.entidad_Id,
            EmpresaId: pro.empresa_Id,
            Codigo: pro.proveedor_Codigo,
            Activo: pro.proveedor_Activo,

            Nombre: pro.entidad_Nombre,
            Email: pro.entidad_Email,
            Telefono: pro.entidad_Telefono,
            Telefono2: pro.entidad_Telefono2,
        });

        if (pro.empresa_Id) {
            proveedor.Empresa = new Empresa({
                Id: pro.empresa_Id,
                Nombre: pro.empresa_Nombre,
                RazonSocial: pro.empresa_RazonSocial,
                Rut: pro.empresa_Rut,
                Direccion: pro.empresa_Direccion,
                EstadoId: pro.empresa_EstadoId,
                PaisId: pro.empresa_PaisId,
                Ciudad: pro.empresa_Ciudad,
                Comentario: pro.empresa_Comentario,
                Activo: pro.empresa_Activo,
            });
        }
        
        return proveedor;
    },
}


