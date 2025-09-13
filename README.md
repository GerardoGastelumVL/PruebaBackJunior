# E-commerce Backend API (Simplificado)

Un backend simple en Express.js con TypeScript para una aplicación de e-commerce. Este API proporciona operaciones CRUD básicas para clientes, categorías, productos, inventario y órdenes con base de datos PostgreSQL.

## Características

- **TypeScript**: Tipado estático
- **Express.js**: Framework web simple
- **PostgreSQL**: Base de datos relacional
- **CRUD Completo**: Operaciones básicas para todas las entidades

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de PostgreSQL
│   ├── controllers/             # Controladores CRUD
│   ├── models/                  # Modelos de base de datos
│   ├── routes/                  # Rutas de la API
│   ├── types/                   # Interfaces TypeScript
│   └── index.ts                 # Servidor principal
├── database/
│   └── schema.sql              # Esquema de base de datos
├── scripts/
│   └── setup-db.js             # Script de configuración
└── package.json
```

## API Endpoints

### Customers
- `GET /api/customers` - Obtener todos los clientes
- `GET /api/customers/:id` - Obtener cliente por ID
- `POST /api/customers` - Crear cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

### Categories
- `GET /api/categories` - Obtener todas las categorías
- `GET /api/categories/:id` - Obtener categoría por ID
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

### Products
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Inventory
- `GET /api/inventory` - Obtener todo el inventario
- `GET /api/inventory/:productId` - Obtener inventario por producto
- `POST /api/inventory` - Crear registro de inventario
- `PUT /api/inventory/:productId` - Actualizar inventario
- `DELETE /api/inventory/:productId` - Eliminar inventario

### Orders
- `GET /api/orders` - Obtener todas las órdenes
- `GET /api/orders/:id` - Obtener orden por ID
- `POST /api/orders` - Crear orden
- `PUT /api/orders/:id` - Actualizar orden
- `DELETE /api/orders/:id` - Eliminar orden

## Instalación

1. **Instalar dependencias**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   # Editar .env con tus credenciales de PostgreSQL
   ```

3. **Configurar la base de datos**
   ```bash
   npm run setup-db
   ```

4. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar servidor de producción
- `npm run setup-db` - Configurar base de datos

## Ejemplos de Uso

### Crear un cliente
```bash
POST /api/customers
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

### Crear un producto
```bash
POST /api/products
{
  "sku": "PROD001",
  "name": "Laptop Gaming",
  "price": 1299.99,
  "category_id": 1,
  "active": true
}
```

### Crear una orden
```bash
POST /api/orders
{
  "customer_id": 1,
  "shipping_address": {"street": "Calle 123", "city": "Madrid"},
  "items": [
    {"product_id": 1, "qty": 2, "price": 1299.99}
  ]
}
```

## Base de Datos

El proyecto incluye un esquema SQL completo con:
- Tablas para todas las entidades
- Relaciones entre tablas
- Índices para rendimiento
- Datos de ejemplo

## Configuración de Base de Datos

Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
```

¡Listo! El backend está simplificado y listo para usar.