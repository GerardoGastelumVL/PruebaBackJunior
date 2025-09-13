-- E-commerce Database Schema
-- This file contains the complete database schema for the e-commerce application

-- ===== Esquema base =====
CREATE TABLE customers (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL UNIQUE
);

CREATE TABLE products (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku         text NOT NULL UNIQUE,
  name        text NOT NULL,
  price       numeric(10,2) NOT NULL CHECK (price > 0),
  category_id integer NOT NULL REFERENCES categories(id),
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE inventory (
  product_id integer PRIMARY KEY REFERENCES products(id),
  stock      integer NOT NULL CHECK (stock >= 0)
);

CREATE TABLE orders (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id integer NOT NULL REFERENCES customers(id),
  status      text     NOT NULL CHECK (status IN ('pending','paid','shipped','cancelled')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  shipped_at  timestamptz,
  shipping_address jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE order_items (
  order_id   integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES products(id),
  qty        integer NOT NULL CHECK (qty > 0),
  price      numeric(10,2) NOT NULL CHECK (price > 0), -- snapshot del precio
  PRIMARY KEY (order_id, product_id)
);

-- ===== Índices para mejorar el rendimiento =====
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ===== Datos de ejemplo (opcional) =====
-- Insertar algunas categorías de ejemplo
INSERT INTO categories (name) VALUES 
  ('Electronics'),
  ('Clothing'),
  ('Books'),
  ('Home & Garden'),
  ('Sports');

-- Insertar algunos clientes de ejemplo
INSERT INTO customers (name, email) VALUES 
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com'),
  ('Bob Johnson', 'bob.johnson@example.com');

-- Insertar algunos productos de ejemplo
INSERT INTO products (sku, name, price, category_id, active) VALUES 
  ('LAPTOP001', 'Gaming Laptop', 1299.99, 1, true),
  ('SHIRT001', 'Cotton T-Shirt', 19.99, 2, true),
  ('BOOK001', 'Programming Guide', 49.99, 3, true),
  ('TOOL001', 'Garden Spade', 24.99, 4, true),
  ('BALL001', 'Soccer Ball', 29.99, 5, true);

-- Insertar inventario para los productos
INSERT INTO inventory (product_id, stock) VALUES 
  (1, 10),
  (2, 50),
  (3, 25),
  (4, 15),
  (5, 30);

-- ===== Comentarios sobre el esquema =====
-- 
-- customers: Almacena información de los clientes
-- - id: Identificador único auto-generado
-- - name: Nombre del cliente
-- - email: Email único del cliente
-- - created_at: Timestamp de creación
--
-- categories: Categorías de productos
-- - id: Identificador único auto-generado
-- - name: Nombre único de la categoría
--
-- products: Catálogo de productos
-- - id: Identificador único auto-generado
-- - sku: Código único del producto
-- - name: Nombre del producto
-- - price: Precio con validación > 0
-- - category_id: Referencia a la categoría
-- - active: Estado activo/inactivo
-- - created_at: Timestamp de creación
--
-- inventory: Control de inventario
-- - product_id: Referencia única al producto
-- - stock: Cantidad en stock (>= 0)
--
-- orders: Órdenes de compra
-- - id: Identificador único auto-generado
-- - customer_id: Referencia al cliente
-- - status: Estado de la orden (pending, paid, shipped, cancelled)
-- - created_at: Timestamp de creación
-- - shipped_at: Timestamp de envío (opcional)
-- - shipping_address: Dirección de envío en formato JSON
--
-- order_items: Items individuales de cada orden
-- - order_id: Referencia a la orden
-- - product_id: Referencia al producto
-- - qty: Cantidad (validación > 0)
-- - price: Precio snapshot al momento de la orden
-- - Clave primaria compuesta (order_id, product_id)
