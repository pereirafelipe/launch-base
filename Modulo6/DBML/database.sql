CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cpf" text UNIQUE NOT NULL,
  "birth" timestamp,
  "phone_number" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cnpj" text NOT NULL,
  "phone_number" text,
  "address_id" int UNIQUE NOT NULL
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "street" text NOT NULL,
  "neighborhood" text NOT NULL,
  "number" text NOT NULL,
  "city" text NOT NULL,
  "uf" text NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "color" text NOT NULL,
  "license_plate" text UNIQUE NOT NULL,
  "status" number NOT NULL DEFAULT 1,
  "models_id" int NOT NULL
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "brand" text NOT NULL,
  "model" text NOT NULL,
  "age" text NOT NULL,
  "chassi" text UNIQUE NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "price" int NOT NULL,
  "date" timestamp NOT NULL,
  "status" int NOT NULL DEFAULT 0,
  "customer_id" int NOT NULL,
  "agencie_id" int NOT NULL
);

CREATE TABLE "cars_orders" (
  "cars_id" int[],
  "orders_id" int
);

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("cars_id") REFERENCES "cars" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("orders_id") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("address_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agencie_id") REFERENCES "agencies" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("models_id") REFERENCES "models" ("id");
