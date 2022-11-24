CREATE TABLE [dbo].PAISES (
    [Id] int,
    [Nombre] varchar(50) NOT NULL,
    CONSTRAINT [PK_paises] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].ESTADOS_PAISES (
    [Id] int,
    [PaisId] int,
    [Nombre] varchar(50) NOT NULL,
    CONSTRAINT [PK_estados] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_570] FOREIGN KEY ([PaisId]) REFERENCES [dbo].[PAISES]([Id]),
);
CREATE TABLE [dbo].[EMPRESAS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [RazonSocial] varchar(50) NOT NULL,
    [Rut] bigint NOT NULL,
    [Direccion] varchar(50) NULL,
    [PaisId] int NULL,
    [EstadoId] int NULL,
    [Ciudad] varchar(250) NULL,
    [Comentario] varchar(250) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_empresas] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_443] FOREIGN KEY ([PaisId]) REFERENCES [PAISES]([Id]),
    CONSTRAINT [FK_457] FOREIGN KEY ([EstadoId]) REFERENCES [ESTADOS_PAISES]([Id]),
    CONSTRAINT [UK_88] UNIQUE ([Rut])
);
CREATE TABLE [dbo].[CLIENTES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50),
    [Email] varchar(50) NOT NULL,
    [Codigo] nvarchar(50) NULL,
    [EmpresaId] int NULL,
    [Telefono] varchar(50),
    [Telefono2] varchar(50),
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_clientes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_88] FOREIGN KEY ([EmpresaId]) REFERENCES [dbo].[EMPRESAS]([Id])
);
CREATE TABLE [dbo].[PROVEEDORES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Email] varchar(50),
    [Codigo] varchar(50) NULL,
    [EmpresaId] int NULL,
    [Telefono] varchar(50),
    [Telefono2] varchar(50),
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_proveedores] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_83] FOREIGN KEY ([EmpresaId]) REFERENCES [dbo].[EMPRESAS]([Id])
);
CREATE TABLE [dbo].[ROLES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(200) NULL,
    CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[USUARIOS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Email] varchar(50) NOT NULL,
    [Password] varchar(100) NOT NULL,
    [EmailValidado] bit NOT NULL,
    [RolId] int NOT NULL,
    [Telefono] varchar(50),
    [Telefono2] varchar(50),
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_51] FOREIGN KEY ([RolId]) REFERENCES [dbo].[ROLES]([Id]),
);
CREATE TABLE [dbo].[CUENTAS_CORRIENTES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [UsuarioId] int NOT NULL,
    [MontoMax] int NOT NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_cuentas_corrientes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_426] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[USUARIOS]([Id])
);
CREATE TABLE [dbo].[TIPO_DESCUENTO] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_tipo_descuento] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[DESCUENTOS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Codigo] varchar(50) NULL,
    [Descripcion] varchar(250) NULL,
    [TipoDescuentoId] int NOT NULL,
    [Valor] int NOT NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_descuentos] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_435] FOREIGN KEY ([TipoDescuentoId]) REFERENCES [dbo].[TIPO_DESCUENTO]([Id])
);
CREATE TABLE [dbo].[INVENTARIO] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Codigo] varchar(50) NULL,
    [ProveedorId] int NOT NULL,
    [Fecha] datetime NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_inventario] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_123] FOREIGN KEY ([ProveedorId]) REFERENCES [dbo].[PROVEEDORES]([Id])
);
CREATE TABLE [dbo].[ITEMS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [InventarioId] int NULL,
    [Stock] int NULL,
    [Costo] decimal(18, 0) NULL,
    [Precio] decimal(18, 0) NULL,
    [PrecioViejo] decimal(18, 0) NULL,
    [DescuentoId] int NULL,
    [Encargo] bit NULL,
    [Destacar] bit NULL,
    [DestacarDescuento] bit NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_items] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_119] FOREIGN KEY ([InventarioId]) REFERENCES [dbo].[INVENTARIO]([Id]),
    CONSTRAINT [FK_309] FOREIGN KEY ([DescuentoId]) REFERENCES [dbo].[DESCUENTOS]([Id])
);
CREATE TABLE [dbo].[COMENTARIOS] (
    [Id] int IDENTITY(1, 1),
    [ItemId] int NOT NULL,
    [UsuarioId] int NOT NULL,
    [Fecha] date NOT NULL,
    [Comentario] varchar(250) NOT NULL,
    [Calificacion] smallint NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_comentarios] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_153] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id]),
    CONSTRAINT [FK_156] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[USUARIOS]([Id])
);
CREATE TABLE [dbo].[LISTA_DESEOS] (
    [ItemId] int NOT NULL,
    [UsuarioId] int NOT NULL,
    CONSTRAINT [PK_lista_deseos] PRIMARY KEY CLUSTERED ([ItemId] ASC, [UsuarioId] ASC),
    CONSTRAINT [FK_249] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id]),
    CONSTRAINT [FK_252] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[USUARIOS]([Id])
);
CREATE TABLE [dbo].[CATEGORIAS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(50) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_categorias] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[CATEGORIAS_ITEMS] (
    [ItemId] int NOT NULL,
    [CategoriaId] int NOT NULL,
    CONSTRAINT [PK_categorias_items] PRIMARY KEY CLUSTERED ([ItemId] ASC, [CategoriaId] ASC),
    CONSTRAINT [FK_136] FOREIGN KEY ([CategoriaId]) REFERENCES [dbo].[CATEGORIAS]([Id]),
    CONSTRAINT [FK_139] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[RECOMENDACIONES] (
    [ItemId] int NOT NULL,
    [Descripcion] varchar(50) NOT NULL,
    [ItemIdRecomendado] int NOT NULL,
    CONSTRAINT [PK_recomendaciones] PRIMARY KEY CLUSTERED ([ItemId] ASC, [ItemIdRecomendado] ASC),
    CONSTRAINT [FK_215] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id]),
    CONSTRAINT [FK_218] FOREIGN KEY ([ItemIdRecomendado]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[IMAGENES_ITEMS] (
    [Id] int IDENTITY(1, 1),
    [ItemId] int NOT NULL,
    [Nombre] varchar(50) NOT NULL,
    [Ruta] varchar(250) NOT NULL,
    [Principal] bit NOT NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_imagenes_items] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_208] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[ETIQUETAS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_etiquetas] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[ETIQUETAS_ITEMS] (
    [ItemId] int NOT NULL,
    [EtiquetaId] int NOT NULL,
    CONSTRAINT [PK_etiquetas_items] PRIMARY KEY CLUSTERED ([ItemId] ASC, [EtiquetaId] ASC),
    CONSTRAINT [FK_192] FOREIGN KEY ([EtiquetaId]) REFERENCES [dbo].[ETIQUETAS]([Id]),
    CONSTRAINT [FK_195] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[COLECCIONES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descrpicion] varchar(50) NULL,
    [RutaImagen] varchar(50) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_colecciones] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[COLECCIONES_ITEMS] (
    [ItemId] int NOT NULL,
    [ColeccionId] int NOT NULL,
    CONSTRAINT [PK_colecciones_items] PRIMARY KEY CLUSTERED ([ItemId] ASC, [ColeccionId] ASC),
    CONSTRAINT [FK_267] FOREIGN KEY ([ColeccionId]) REFERENCES [dbo].[COLECCIONES]([Id]),
    CONSTRAINT [FK_270] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[COLORES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [RutaImagen] varchar(250) NULL,
    [CodigoColor] varchar(50) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_colores] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[TALLES] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_talles] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[TALLES_ITEMS] (
    [ItemId] int NOT NULL,
    [TalleId] int NOT NULL,
    CONSTRAINT [PK_talles_items] PRIMARY KEY CLUSTERED ([ItemId] ASC, [TalleId] ASC),
    CONSTRAINT [FK_174] FOREIGN KEY ([TalleId]) REFERENCES [dbo].[TALLES]([Id]),
    CONSTRAINT [FK_177] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id])
);
CREATE TABLE [dbo].[ESTADOS] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [Color] varchar(50) NULL,
    [Icono] varchar(50) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_estados_items] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[METODO_PAGO] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varchar(250) NULL,
    [Icono] varchar(50) NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_medios_pago] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[TIPO_TRANSACCION] (
    [Id] int IDENTITY(1, 1),
    [Nombre] varchar(50) NOT NULL,
    [Descripcion] varbinary(50) NOT NULL,
    [Activo] bit DEFAULT 1,
    CONSTRAINT [PK_tipo_transaccion] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[TRANSACCIONES] (
    [Id] int IDENTITY(1, 1),
    [Fecha] date NOT NULL,
    [UsuarioId] int NOT NULL,
    [TipoId] int NOT NULL,
    [EmpresaId] int NOT NULL,
    [DescuentoId] int NULL,
    [ClienteId] int NOT NULL,
    [EstadoId] int NOT NULL,
    [MetodoPagoId] int NOT NULL,
    [CuentaCorrienteId] int NOT NULL,
    [Aceptado] bit NOT NULL,
    [Notas] varchar(250) NOT NULL,
    [SubTotal] decimal(18, 0) NOT NULL,
    [TotalImpuestos] decimal(18, 0) NOT NULL,
    [Total] decimal(18, 0) NOT NULL,
    CONSTRAINT [PK_transacciones] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_320] FOREIGN KEY ([DescuentoId]) REFERENCES [dbo].[DESCUENTOS]([Id]),
    CONSTRAINT [FK_323] FOREIGN KEY ([MetodoPagoId]) REFERENCES [dbo].[METODO_PAGO]([Id]),
    CONSTRAINT [FK_326] FOREIGN KEY ([EstadoId]) REFERENCES [dbo].[ESTADOS]([Id]),
    CONSTRAINT [FK_358] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[USUARIOS]([Id]),
    CONSTRAINT [FK_361] FOREIGN KEY ([ClienteId]) REFERENCES [dbo].[CLIENTES]([Id]),
    CONSTRAINT [FK_364] FOREIGN KEY ([EmpresaId]) REFERENCES [dbo].[EMPRESAS]([Id]),
    CONSTRAINT [FK_374] FOREIGN KEY ([CuentaCorrienteId]) REFERENCES [dbo].[CUENTAS_CORRIENTES]([Id]),
    CONSTRAINT [FK_407] FOREIGN KEY ([TipoId]) REFERENCES [dbo].[TIPO_TRANSACCION]([Id])
);
CREATE TABLE [dbo].[TRANSACCION_DETALLE] (
    [Id] int IDENTITY(1, 1),
    [TransaccionId] int NOT NULL,
    [ItemId] int NOT NULL,
    [NroLinea] smallint NOT NULL,
    [Cantidad] smallint NOT NULL,
    [MontoFinal] decimal(18, 0) NOT NULL,
    [MontoLinea] decimal(18, 0) NOT NULL,
    [MontoDescuento] decimal(18, 0) NOT NULL,
    [LineaDescripcion] varchar(250) NULL,
    [DecuentoId] int NULL,
    [DescuentoId] int NOT NULL,
    [TalleId] int NOT NULL,
    CONSTRAINT [PK_transaccion_detalle] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_389] FOREIGN KEY ([TransaccionId]) REFERENCES [dbo].[TRANSACCIONES]([Id]),
    CONSTRAINT [FK_392] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[ITEMS]([Id]),
    CONSTRAINT [FK_395] FOREIGN KEY ([DescuentoId]) REFERENCES [dbo].[DESCUENTOS]([Id]),
    CONSTRAINT [FK_410] FOREIGN KEY ([TalleId]) REFERENCES [dbo].[TALLES]([Id])
);
CREATE TABLE [dbo].[TRANSACCION_COLORES] (
    [TransaccionId] int NOT NULL,
    [ColorId] int NOT NULL,
    CONSTRAINT [PK_transaccion_colores] PRIMARY KEY CLUSTERED ([TransaccionId] ASC, [ColorId] ASC),
    CONSTRAINT [FK_417] FOREIGN KEY ([TransaccionId]) REFERENCES [dbo].[TRANSACCION_DETALLE]([Id]),
    CONSTRAINT [FK_423] FOREIGN KEY ([ColorId]) REFERENCES [dbo].[COLORES]([Id])
);
GO




SET IDENTITY_INSERT [dbo].[ROLES] ON 
INSERT [dbo].[ROLES] ([Id], [Nombre], [Descripcion]) VALUES (1, N'SuperAdministrador', N'Super administrador')
INSERT [dbo].[ROLES] ([Id], [Nombre], [Descripcion]) VALUES (2, N'Administrador', N'Administrador')
INSERT [dbo].[ROLES] ([Id], [Nombre], [Descripcion]) VALUES (3, N'Empleado', N'Empleado')
INSERT [dbo].[ROLES] ([Id], [Nombre], [Descripcion]) VALUES (4, N'Cliente', N'Cliente web')
SET IDENTITY_INSERT [dbo].[ROLES] OFF



GO
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (1, N'Australia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (2, N'Austria')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (3, N'Azerbaiyán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (4, N'Anguilla')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (5, N'Argentina')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (6, N'Armenia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (7, N'Bielorrusia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (8, N'Belice')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (9, N'Bélgica')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (10, N'Bermudas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (11, N'Bulgaria')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (12, N'Brasil')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (13, N'Reino Unido')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (14, N'Hungría')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (15, N'Vietnam')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (16, N'Haiti')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (17, N'Guadalupe')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (18, N'Alemania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (19, N'Países Bajos, Holanda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (20, N'Grecia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (21, N'Georgia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (22, N'Dinamarca')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (23, N'Egipto')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (24, N'Israel')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (25, N'India')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (26, N'Irán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (27, N'Irlanda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (28, N'España')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (29, N'Italia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (30, N'Kazajstán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (31, N'Camerún')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (32, N'Canadá')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (33, N'Chipre')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (34, N'Kirguistán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (35, N'China')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (36, N'Costa Rica')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (37, N'Kuwait')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (38, N'Letonia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (39, N'Libia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (40, N'Lituania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (41, N'Luxemburgo')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (42, N'México')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (43, N'Moldavia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (44, N'Mónaco')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (45, N'Nueva Zelanda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (46, N'Noruega')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (47, N'Polonia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (48, N'Portugal')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (49, N'Reunión')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (50, N'Rusia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (51, N'El Salvador')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (52, N'Eslovaquia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (53, N'Eslovenia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (54, N'Surinam')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (55, N'Estados Unidos')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (56, N'Tadjikistan')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (57, N'Turkmenistan')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (58, N'Islas Turcas y Caicos')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (59, N'Turquía')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (60, N'Uganda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (61, N'Uzbekistán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (62, N'Ucrania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (63, N'Finlandia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (64, N'Francia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (65, N'República Checa')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (66, N'Suiza')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (67, N'Suecia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (68, N'Estonia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (69, N'Corea del Sur')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (70, N'Japón')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (71, N'Croacia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (72, N'Rumanía')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (73, N'Hong Kong')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (74, N'Indonesia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (75, N'Jordania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (76, N'Malasia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (77, N'Singapur')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (78, N'Taiwan')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (79, N'Bosnia y Herzegovina')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (80, N'Bahamas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (81, N'Chile')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (82, N'Colombia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (83, N'Islandia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (84, N'Corea del Norte')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (85, N'Macedonia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (86, N'Malta')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (87, N'Pakistán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (88, N'Papúa-Nueva Guinea')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (89, N'Perú')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (90, N'Filipinas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (91, N'Arabia Saudita')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (92, N'Tailandia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (93, N'Emiratos árabes Unidos')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (94, N'Groenlandia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (95, N'Venezuela')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (96, N'Zimbabwe')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (97, N'Kenia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (98, N'Algeria')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (99, N'Líbano')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (100, N'Botsuana')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (101, N'Tanzania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (102, N'Namibia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (103, N'Ecuador')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (104, N'Marruecos')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (105, N'Ghana')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (106, N'Siria')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (107, N'Nepal')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (108, N'Mauritania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (109, N'Seychelles')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (110, N'Paraguay')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (111, N'Uruguay')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (112, N'Congo (Brazzaville)')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (113, N'Cuba')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (114, N'Albania')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (115, N'Nigeria')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (116, N'Zambia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (117, N'Mozambique')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (119, N'Angola')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (120, N'Sri Lanka')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (121, N'Etiopía')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (122, N'Túnez')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (123, N'Bolivia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (124, N'Panamá')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (125, N'Malawi')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (126, N'Liechtenstein')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (127, N'Bahrein')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (128, N'Barbados')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (130, N'Chad')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (131, N'Man, Isla de')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (132, N'Jamaica')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (133, N'Malí')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (134, N'Madagascar')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (135, N'Senegal')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (136, N'Togo')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (137, N'Honduras')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (138, N'República Dominicana')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (139, N'Mongolia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (140, N'Irak')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (141, N'Sudáfrica')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (143, N'Gibraltar')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (144, N'Afganistán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (145, N'Andorra')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (147, N'Antigua y Barbuda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (149, N'Bangladesh')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (152, N'Bután')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (154, N'Islas Virgenes Británicas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (156, N'Burkina Faso')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (157, N'Burundi')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (158, N'Camboya')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (159, N'Cabo Verde')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (164, N'Comores')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (165, N'Congo (Kinshasa)')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (166, N'Cook, Islas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (168, N'Costa de Marfil')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (169, N'Djibouti, Yibuti')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (171, N'Timor Oriental')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (172, N'Guinea Ecuatorial')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (173, N'Eritrea')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (175, N'Feroe, Islas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (176, N'Fiyi')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (178, N'Polinesia Francesa')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (180, N'Gabón')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (181, N'Gambia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (184, N'Granada')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (186, N'Guernsey')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (187, N'Guinea')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (188, N'Guinea-Bissau')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (189, N'Guyana')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (193, N'Jersey')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (195, N'Kiribati')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (196, N'Laos')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (197, N'Lesotho')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (198, N'Liberia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (200, N'Maldivas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (201, N'Martinica')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (202, N'Mauricio')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (206, N'Nauru')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (207, N'Antillas Holandesas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (208, N'Nueva Caledonia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (209, N'Nicaragua')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (210, N'Níger')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (212, N'Norfolk Island')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (213, N'Omán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (215, N'Isla Pitcairn')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (216, N'Qatar')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (217, N'Ruanda')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (218, N'Santa Elena')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (219, N'San Cristobal y Nevis')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (220, N'Santa Lucía')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (221, N'San Pedro y Miquelón')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (222, N'San Vincente y Granadinas')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (223, N'Samoa')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (224, N'San Marino')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (225, N'San Tomé y Príncipe')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (226, N'Serbia y Montenegro')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (227, N'Sierra Leona')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (228, N'Islas Salomón')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (229, N'Somalia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (232, N'Sudán')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (234, N'Swazilandia')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (235, N'Tokelau')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (236, N'Tonga')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (237, N'Trinidad y Tobago')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (239, N'Tuvalu')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (240, N'Vanuatu')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (241, N'Wallis y Futuna')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (242, N'Sáhara Occidental')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (243, N'Yemen')
INSERT [dbo].[PAISES] ([Id], [Nombre]) VALUES (246, N'Puerto Rico')
GO




 
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1642, 111, N'Artigas')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1643, 111, N'Canelones')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1644, 111, N'Cerro Lar ')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1645, 111, N'Colonia')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1646, 111, N'Durazno')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1647, 111, N'Flores')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1648, 111, N'Florida')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1649, 111, N'Lavalleja')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1650, 111, N'Maldonado')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1651, 111, N'Montevideo')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1652, 111, N'Paysandú')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1653, 111, N'Río Negro')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1654, 111, N'Rivera')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1655, 111, N'Rocha')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1656, 111, N'Salto')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1657, 111, N'San José')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1658, 111, N'Soriano')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1659, 111, N'Tacuarembó')
INSERT [dbo].[ESTADOS_PAISES] ([Id], [PaisId], [Nombre]) VALUES (1660, 111, N'Treinta y Tres')

 
