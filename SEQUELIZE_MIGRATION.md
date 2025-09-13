# Migración a Sequelize

Este documento describe los cambios realizados para migrar de consultas SQL directas a Sequelize ORM.

## Cambios Realizados

### 1. Instalación de Dependencias
- `sequelize`: ORM principal
- `sequelize-typescript`: Decoradores TypeScript para Sequelize
- `reflect-metadata`: Requerido para los decoradores

### 2. Configuración de Sequelize
- **Archivo**: `src/config/sequelize.ts`
- Configuración de conexión a PostgreSQL
- Configuración de pool de conexiones
- Logging de consultas

### 3. Modelos de Sequelize
Todos los modelos han sido convertidos a clases de Sequelize con decoradores:

#### Category (`src/models/Category.ts`)
```typescript
@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => Product)
  products!: Product[];
}
```

#### Customer (`src/models/Customer.ts`)
- Campos: id, name, email, created_at
- Relación: HasMany con Order

#### Product (`src/models/Product.ts`)
- Campos: id, sku, name, price, category_id, active, created_at
- Relaciones: BelongsTo Category, HasOne Inventory

#### Inventory (`src/models/Inventory.ts`)
- Campos: product_id (PK), stock
- Relación: BelongsTo Product

#### Order (`src/models/Order.ts`)
- Campos: id, customer_id, status, created_at, shipped_at, shipping_address
- Relaciones: BelongsTo Customer, HasMany OrderItem

#### OrderItem (`src/models/OrderItem.ts`)
- Campos: order_id (PK), product_id (PK), qty, price
- Relaciones: BelongsTo Order y Product

### 4. Asociaciones
Las asociaciones están configuradas usando decoradores:
- `@HasMany`: Una categoría tiene muchos productos
- `@BelongsTo`: Un producto pertenece a una categoría
- `@HasOne`: Un producto tiene un inventario
- `@ForeignKey`: Define claves foráneas

### 5. Controladores Actualizados
Todos los controladores han sido actualizados para usar métodos de Sequelize:

#### Métodos Principales:
- `Model.findAll()`: Obtener todos los registros
- `Model.findByPk()`: Buscar por clave primaria
- `Model.create()`: Crear nuevo registro
- `Model.update()`: Actualizar registros
- `Model.destroy()`: Eliminar registros

#### Características Adicionales:
- **Includes**: Carga de relaciones (`include: ['category', 'inventory']`)
- **Ordenamiento**: `order: [['created_at', 'DESC']]`
- **Transacciones**: Para operaciones complejas (crear órdenes)

### 6. Inicialización
- **Archivo**: `src/config/initSequelize.ts`
- Autenticación de conexión
- Sincronización de modelos (`sync({ alter: true })`)
- Cierre graceful de conexiones

### 7. Archivo Principal Actualizado
- `src/index.ts` ahora usa `initializeSequelize()` en lugar de `testConnection()`
- Manejo de señales SIGINT y SIGTERM para cierre graceful

## Ventajas de la Migración

1. **Type Safety**: TypeScript completo con tipos generados automáticamente
2. **Relaciones**: Manejo automático de joins y asociaciones
3. **Validaciones**: Validaciones de modelo integradas
4. **Transacciones**: Soporte nativo para transacciones
5. **Migrations**: Futuras migraciones de base de datos
6. **Hooks**: Lifecycle hooks para lógica de negocio
7. **Scopes**: Consultas reutilizables
8. **Lazy/Eager Loading**: Control sobre la carga de relaciones

## Uso de los Modelos

### Consultas Básicas
```typescript
// Obtener todos los productos con categoría
const products = await Product.findAll({
  include: ['category'],
  order: [['created_at', 'DESC']]
});

// Buscar producto por ID con inventario
const product = await Product.findByPk(id, {
  include: ['category', 'inventory']
});
```

### Transacciones
```typescript
const transaction = await sequelize.transaction();
try {
  const order = await Order.create(orderData, { transaction });
  await OrderItem.create(itemData, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

### Crear con Relaciones
```typescript
const product = await Product.create({
  sku: 'PROD-001',
  name: 'Producto Ejemplo',
  price: 99.99,
  category_id: 1,
  active: true
});
```

## Próximos Pasos Recomendados

1. **Migrations**: Implementar migraciones para cambios de esquema
2. **Validaciones**: Agregar validaciones de modelo
3. **Hooks**: Implementar hooks para lógica de negocio
4. **Scopes**: Crear scopes para consultas comunes
5. **Seeds**: Crear datos de prueba
6. **Testing**: Actualizar tests para usar Sequelize

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start
```
