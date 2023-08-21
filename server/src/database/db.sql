DROP TRIGGER IF EXISTS event_logging_trigger ON ticket;
DROP TRIGGER IF EXISTS event_logging_trigger ON ticket_status;
DROP TRIGGER IF EXISTS event_logging_trigger ON sales_order;
DROP TRIGGER IF EXISTS event_logging_trigger ON order_details;
DROP TRIGGER IF EXISTS event_logging_trigger ON stock;
DROP TRIGGER IF EXISTS event_logging_trigger ON product;
DROP TRIGGER IF EXISTS event_logging_trigger ON supplier;
DROP TRIGGER IF EXISTS event_logging_trigger ON brand;
DROP TRIGGER IF EXISTS event_logging_trigger ON category;
DROP TRIGGER IF EXISTS event_logging_trigger ON customer;
DROP TRIGGER IF EXISTS event_logging_trigger ON employee;
DROP TRIGGER IF EXISTS event_logging_trigger ON person;
DROP TRIGGER IF EXISTS event_logging_trigger ON job;
DROP TRIGGER IF EXISTS event_logging_trigger ON team;
DROP TRIGGER IF EXISTS event_logging_trigger ON address;
DROP TRIGGER IF EXISTS event_logging_trigger ON municipality;
DROP TRIGGER IF EXISTS event_logging_trigger ON department;
DROP TRIGGER IF EXISTS event_logging_trigger ON gender;

DROP FUNCTION IF EXISTS log_event_trigger();

DROP TABLE IF EXISTS system_log CASCADE;
DROP TABLE IF EXISTS ticket CASCADE;
DROP TABLE IF EXISTS ticket_status CASCADE;
DROP TABLE IF EXISTS sales_order CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS stock CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS brand CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS job CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS municipality CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS gender CASCADE;

CREATE TABLE gender (
  id SERIAL PRIMARY KEY,
  gender_name VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE municipality (
  id SERIAL PRIMARY KEY,
  municipality_name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  address_description VARCHAR(255) NOT NULL,
  municipality_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (municipality_id) REFERENCES municipality(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(20) NOT NULL,
  team_description VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE job (
  id SERIAL PRIMARY KEY,
  job_title VARCHAR(50) NOT NULL,
  job_description VARCHAR(255) NOT NULL,
  team_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (team_id) REFERENCES team(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  birthdate DATE NOT NULL,
  gender_id INT NOT NULL,
  address_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (gender_id) REFERENCES gender(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  profile_pic_url VARCHAR(255) NOT NULL,
  is_pro BOOLEAN DEFAULT FALSE NOT NULL,
  subscription_end_date TIMESTAMP WITHOUT TIME ZONE,
  person_id INT NOT NULL,
  job_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES job(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  rtn VARCHAR(20) NOT NULL,
  person_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  category_description VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE brand (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE supplier (
  id SERIAL PRIMARY KEY,
  supplier_name VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  brand_id INT NOT NULL,
  supplier_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES supplier(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE stock (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  product_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  product_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE sales_order (
  id SERIAL PRIMARY KEY,
  order_date DATE DEFAULT CURRENT_DATE NOT NULL,
  order_status VARCHAR(20) NOT NULL,
  ship_date DATE NOT NULL,
  customer_id INT NOT NULL,
  employee_id INT NOT NULL,
  order_details_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (order_details_id) REFERENCES order_details(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ticket_status (
  id SERIAL PRIMARY KEY,
  status_name VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE ticket (
  id SERIAL PRIMARY KEY,
  ticket_description VARCHAR(255) NOT NULL,
  ticket_status_id INT NOT NULL,
  ticket_opened_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  ticket_closed_date TIMESTAMP WITHOUT TIME ZONE,
  customer_id INT NOT NULL,
  employee_id INT NOT NULL,
  product_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (ticket_status_id) REFERENCES ticket_status(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE system_log (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id INT NOT NULL
);

-- Functions
CREATE OR REPLACE FUNCTION log_event_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO system_log (event_type, table_name, record_id)
  VALUES (
    TG_OP,          -- Operation type (INSERT or UPDATE)
    TG_TABLE_NAME,  -- Name of the table
    NEW.id          -- Assuming 'id' is the primary key of the main table
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON gender
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON department
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON municipality
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON address
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON team
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON job
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON person
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON employee
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON customer
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON category
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON brand
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON supplier
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON product
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON stock
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON order_details
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON sales_order
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON ticket_status
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

CREATE TRIGGER event_logging_trigger
AFTER INSERT OR UPDATE ON ticket
FOR EACH ROW EXECUTE FUNCTION log_event_trigger();

-- Gender
INSERT INTO gender (gender_name) VALUES ('Femenino');
INSERT INTO gender (gender_name) VALUES ('Masculino');

-- Departments
INSERT INTO department (department_name) VALUES ('Atlántida');
INSERT INTO department (department_name) VALUES ('Colón');
INSERT INTO department (department_name) VALUES ('Comayagua');
INSERT INTO department (department_name) VALUES ('Copán');
INSERT INTO department (department_name) VALUES ('Cortés');
INSERT INTO department (department_name) VALUES ('Choluteca');
INSERT INTO department (department_name) VALUES ('El Paraíso');
INSERT INTO department (department_name) VALUES ('Francisco Morazán');
INSERT INTO department (department_name) VALUES ('Gracias a Dios');
INSERT INTO department (department_name) VALUES ('Intibucá');
INSERT INTO department (department_name) VALUES ('Islas de la Bahía');
INSERT INTO department (department_name) VALUES ('La Paz');
INSERT INTO department (department_name) VALUES ('Lempira');
INSERT INTO department (department_name) VALUES ('Ocotepeque');
INSERT INTO department (department_name) VALUES ('Olancho');
INSERT INTO department (department_name) VALUES ('Santa Bárbara');
INSERT INTO department (department_name) VALUES ('Valle');
INSERT INTO department (department_name) VALUES ('Yoro');

-- Atlántida
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Ceiba', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Porvenir', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Tela', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Jutiapa', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Masica', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Arizona', 1);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Esparta', 1);

-- Colón
INSERT INTO municipality (municipality_name, department_id) VALUES ('Trujillo', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Balfate', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Iriona', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Limón', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sabá', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Fe', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Rosa de Aguán', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sonaguera', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Tocoa', 2);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Bonito Oriental', 2);

-- Comayagua
INSERT INTO municipality (municipality_name, department_id) VALUES ('Comayagua', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ajuterique', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Rosario', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Esquías', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Humuya', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Libertad', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Lamaní', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Trinidad', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Lejamaní', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Meámbar', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Minad de Oro', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ojos de Agua', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Jerónimo', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José de Comayagua', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José del Potrero', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Luis', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Sebastián', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Siguatepeque', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Villa de San Antonio', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Las Lajas', 3);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Taulabé', 3);

-- Copán
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Rosa de Copán', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Cabañas', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepción', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Copán Ruinas', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Corquín', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Cucuyagua', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Dolores', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Dulce Nombre', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Paraíso', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Florida', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Jigua', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Unión', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Nueva Arcadia', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Agustín', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Jerónimo', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Juan de Opoa', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Nicolás', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Pedro', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Rita', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Trinidad de Copán', 4);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Veracruz', 4);

-- Cortés
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Pedro Sula', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Choloma', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Omoa', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Pimienta', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Potrerillos', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Puerto Cortés', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio de Cortés', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de Yojoa', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Manuel', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Cruz de Yojoa', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Villanueva', 5);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Lima', 5);

-- Choluteca
INSERT INTO municipality (municipality_name, department_id) VALUES ('Choluteca', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Apacilagua', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepcion de María', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Duyure', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Corpus', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Triunfo', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Marcovia', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Morolica', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Namasigue', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Orocuina', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Pespire', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Isidro', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Marcos de Colón', 6);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Ana de Yusguare', 6);

-- El Paraíso
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yuscarán', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Alauca', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Danlí', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Paraíso', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Güinope', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Jacaleapa', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Liure', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Morocelí', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Oropolí', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Potrerillos', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Lucas', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Matías', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Soledad', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Teupasenti', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Texiguat', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Vado Ancho', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yauyupe', 7);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Trojes', 7);

-- Francisco Morazán
INSERT INTO municipality (municipality_name, department_id) VALUES ('Distrito Central', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Alubarén', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Cedros', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Curarén', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Porvenir', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guaimaca', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Libertad', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Venta', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Lepaterique', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Maraita', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Marale', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Nueva Armenia', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ojojona', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Orica', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Reitoca', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sabanagrande', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio de Oriente', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Buenaventura', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Ignacio', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Juan de Flores', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Miguelito', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Ana', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Lucía', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Tatumbla', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Valle de Ángeles', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Villa de San Francisco', 8);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Vallecillo', 8);

-- Gracias a Dios
INSERT INTO municipality (municipality_name, department_id) VALUES ('Puerto Lempira', 9);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Brus Laguna', 9);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ahuas', 9);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Juan Francisco Bulnes', 9);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Villeda Morales', 9);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Wampusirpe', 9);

-- Intibucá
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Esperanza', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Camasca', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Colomoncagua', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepción', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Dolores', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Intibucá', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Jesús de Otoro', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Magdalena', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Isidro', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Juan', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Marcos de la Sierra', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Miguelito', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Lucía', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yamaranguila', 10);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de Opalaca', 10);

-- Islas de la Bahía
INSERT INTO municipality (municipality_name, department_id) VALUES ('Roatán', 11);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guanaja', 11);
INSERT INTO municipality (municipality_name, department_id) VALUES ('José Santos Guardiola', 11);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Utila', 11);

-- La Paz
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Paz', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Aguanqueterique', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Cabañas', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Cane', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Chinacla', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guajiquiro', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Lauterique', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Marcala', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Mercedes de Oriente', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Opatoro', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Antonio del Norte', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Juan', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Pedro de Tutule', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Ana', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Elena', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa María', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santiago de Puringla', 12);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yarula', 12);

-- Lempira
INSERT INTO municipality (municipality_name,department_id) VALUES ('Gracias', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Belén', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Candelaria', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Cololaca', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Erandique', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Gualcince', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Guarita', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('La Campa', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('La Iguala', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Las Flores', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('La Unión', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('La Virtud', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Lepaera', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Mapulaca', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Piraera', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Andrés', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Francisco', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Juan Guarita', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Manuel Colohete', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Rafael', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Sebastián', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Santa Cruz', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Talgua', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Tambla', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Tomalá', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Valladolid', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('Virginia', 13);
INSERT INTO municipality (municipality_name,department_id) VALUES ('San Marcos de Caiquín', 13);

-- Ocotepeque
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ocotepeque', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Belén Gualcho', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepción', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Dolores Merendón', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Fraternidad', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Encarnación', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Labor', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Lucerna', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Mercedes', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Fernando', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco del Valle', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Jorge', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Marcos', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Fe', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sensenti', 14);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sinuapa', 14);

-- Olancho
INSERT INTO municipality (municipality_name, department_id) VALUES ('Juticalpa', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Campamento', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Catacamas', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concordia', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Dulce Nombre de Culmí', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Rosario', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Esquipulas del Norte', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Gualaco', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guarizama', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guata', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Guayape', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Jano', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('La Unión', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Mangulile', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Manto', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Salamá', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Esteban', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de Becerra', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de la Paz', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa María del Real', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Silca', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yocón', 15);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Patuca', 15);

-- Santa Bárbara
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Bárbara', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Arada', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Atima', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Azacualpa', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ceguaca', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepción del Norte', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Concepción del Sur', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Chinda', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Níspero', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Gualala', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Ilama', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Las Vegas', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Macuelizo', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Naranjito', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Nuevo Celilac', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Nueva Frontera', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Petoa', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Protección', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Quimistán', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de Ojuera', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San José de las Colinas', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Luis', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Marcos', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Nicolás', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Pedro Zacapa', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Vicente Centenario', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Rita', 16);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Trinidad', 16);

-- Valle
INSERT INTO municipality (municipality_name, department_id) VALUES ('Nacaome', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Alianza', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Amapala', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Aramecina', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Caridad', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Goascorán', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Langue', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Francisco de Coray', 17);
INSERT INTO municipality (municipality_name, department_id) VALUES ('San Lorenzo', 17);

-- Yoro
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yoro', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Arenal', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Negrito', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('El Progreso', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Jocón', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Morazán', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Olanchito', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Santa Rita', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Sulaco', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Victoria', 18);
INSERT INTO municipality (municipality_name, department_id) VALUES ('Yorito', 18);

-- Address
INSERT INTO address (address_description, municipality_id) VALUES ('Ciudad Universitaria', 110);
INSERT INTO address (address_description, municipality_id) VALUES ('Ciudad Universitaria', 110);
INSERT INTO address (address_description, municipality_id) VALUES ('Residencial Las Uvas', 110);
INSERT INTO address (address_description, municipality_id) VALUES ('Prados Universitarios', 110);
INSERT INTO address (address_description, municipality_id) VALUES ('Residencial El Trapiche', 110);
INSERT INTO address (address_description, municipality_id) VALUES ('Lomas del Toncontin', 110);

-- Team
INSERT INTO team (team_name, team_description) VALUES ('TI', 'Gestiona la infraestructura tecnológica y brinda soporte técnico.');
INSERT INTO team (team_name, team_description) VALUES ('Recursos Humanos', 'Administra el personal y las políticas laborales.');
INSERT INTO team (team_name, team_description) VALUES ('Almacén', 'Genera ingresos a través de la venta de productos/servicios.');
INSERT INTO team (team_name, team_description) VALUES ('Ventas', 'Gestiona las adquisiciones de productos y servicios necesarios.');
INSERT INTO team (team_name, team_description) VALUES ('Servicio al Cliente', 'Brinda soporte y atención a los clientes.');

-- Job
INSERT INTO job (
	job_title,
	job_description,
	team_id
) VALUES (
	'Administrador de Sistemas',
	'Es el encargado de gestionar el sistema y el equipo de TI.',
	1
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Ingeniero de Redes', 
  'Responsable de diseñar, implementar y mantener la infraestructura de red de la empresa.', 
  1
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Desarrollador de Software', 
  'Encargado de crear y mantener aplicaciones y sistemas informáticos según las necesidades de la empresa.', 
  1
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Especialista en Seguridad Informática', 
  'Responsable de proteger los sistemas y datos de la empresa contra amenazas cibernéticas.', 
  1
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Técnico de Soporte', 
  'Brinda asistencia técnica y resuelve problemas relacionados con el hardware y software para los usuarios internos.', 
  1
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Analista de Recursos Humanos', 
  'Encargado de llevar a cabo el proceso de selección y reclutamiento de nuevos empleados.', 
  2
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Especialista en Nómina', 
  'Gestiona el cálculo y pago de salarios y beneficios para los empleados.', 
  2
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Capacitador', 
  'Diseña y lleva a cabo programas de capacitación y desarrollo profesional para el personal.', 
  2
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Especialista en Relaciones Laborales', 
  'Maneja las relaciones entre la empresa y los sindicatos, si los hubiera, y se encarga de resolver conflictos laborales.', 
  2
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Gerente de Almacén', 
  'Supervisa las operaciones diarias del almacén y garantiza un flujo eficiente de productos y servicios.', 
  3
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Coordinador de Inventario', 
  'Lleva un registro preciso del inventario y realiza auditorías periódicas.', 
  3
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Empacador/Receptor', 
  'Se encarga de recibir y enviar los productos y servicios, así como de empacar los pedidos para su entrega.', 
  3
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Controlador de Calidad', 
  'Verifica que los productos cumplan con los estándares de calidad antes de ser enviados a los clientes.', 
  3
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Ejecutivo de Ventas', 
  'Responsable de identificar y cerrar oportunidades de ventas con clientes potenciales.', 
  4
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id)
VALUES (
  'Gerente de Cuentas', 
  'Gestiona las relaciones con clientes existentes, asegurando su satisfacción y fidelización.', 
  4
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Especialista en Desarrollo de Negocios', 
  'Investiga y desarrolla nuevas oportunidades de mercado y colabora en la expansión de la empresa.', 
  4
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Analista de Ventas', 
  'Recopila y analiza datos de ventas para identificar tendencias y oportunidades de mejora.', 
  4
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
)
VALUES (
  'Representante de Atención al Cliente', 
  'Responde a las consultas y problemas de los clientes, brindando un excelente servicio.', 
  5
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Especialista en Soporte Técnico', 
  'Ofrece asistencia técnica para resolver problemas técnicos o de productos/servicios.', 
  5
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
) VALUES (
  'Coordinador de Retención de Clientes', 
  'Implementa estrategias para mantener y fidelizar a los clientes existentes.', 
  5
);

INSERT INTO job (
  job_title, 
  job_description, 
  team_id
)
VALUES (
  'Encuestador de Satisfacción del Cliente', 
  'Realiza encuestas y análisis de satisfacción para mejorar la calidad del servicio al cliente.', 
  5
);

-- Person
INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Jane',
  'Doe',
  'jane.doe@example.com',
  '0000-0000',
  '1990-01-01',
  1,
  1
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'John',
  'Doe',
  'john.doe@example.com',
  '1111-1111',
  '1990-01-01',
  2,
  1
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Alice',
  'Smith',
  'alice.smith@example.com',
  '2222-2222',
  '1988-05-15',
  2,
  2
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Bob',
  'Johnson',
  'bob.johnson@example.com',
  '3333-3333',
  '1992-09-03',
  1,
  2
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Emily',
  'Johnson',
  'emily.johnson@example.com',
  '4444-4444',
  '1995-03-12',
  2,
  3
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Michael',
  'Williams',
  'michael.williams@example.com',
  '5555-5555',
  '1989-08-28',
  1,
  4
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Sophia',
  'Martinez',
  'sophia.martinez@example.com',
  '6666-6666',
  '1993-10-24',
  2,
  5
);

INSERT INTO person (
  first_name,
  last_name,
  email,
  phone,
  birthdate,
  gender_id,
  address_id
) VALUES (
  'Ethan',
  'Davis',
  'ethan.davis@example.com',
  '7777-7777',
  '1991-12-08',
  1,
  6
);

-- Employee
INSERT INTO employee (
  password,
  profile_pic_url,
  person_id,
  job_id
) VALUES (
  '$2a$10$QTiuId6lKWW1reqPJRIpyu3x3L5cmTGYyeTBGGcoKpSk3QPfdbNcO',
  'https://ui-avatars.com/api/?name=Jane+Doe&background=random&size=128',
  1,
  1
);

INSERT INTO employee (
  password,
  profile_pic_url,
  person_id,
  job_id
) VALUES (
  '$2a$10$QTiuId6lKWW1reqPJRIpyu3x3L5cmTGYyeTBGGcoKpSk3QPfdbNcO',
  'https://ui-avatars.com/api/?name=John+Doe&background=random&size=128',
  2,
  1
);

INSERT INTO employee (
  password,
  profile_pic_url,
  person_id,
  job_id
) VALUES (
  '$2a$10$QTiuId6lKWW1reqPJRIpyu3x3L5cmTGYyeTBGGcoKpSk3QPfdbNcO',
  'https://ui-avatars.com/api/?name=Alice+Smith&background=random&size=128',
  3,
  2
);

INSERT INTO employee (
  password,
  profile_pic_url,
  person_id,
  job_id
) VALUES (
  '$2a$10$QTiuId6lKWW1reqPJRIpyu3x3L5cmTGYyeTBGGcoKpSk3QPfdbNcO',
  'https://ui-avatars.com/api/?name=Bob+Johnson&background=random&size=128',
  4,
  2
);

-- Customer
INSERT INTO customer (rtn, person_id) VALUES ('08011995001234', 5);
INSERT INTO customer (rtn, person_id) VALUES ('05011989005678', 6);
INSERT INTO customer (rtn, person_id) VALUES ('10011993001234', 7);
INSERT INTO customer (rtn, person_id) VALUES ('12011991005678', 8);

-- Category
INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Teclados', 
  'Dispositivos de entrada para escribir y controlar la computadora'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Mouse', 
  'Dispositivos de control para mover el cursor en la pantalla'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Webcams', 
  'Cámaras para capturar video y transmitir en línea'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Tarjetas Gráficas', 
  'Componentes que procesan gráficos y video en la computadora'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Procesadores', 
  'Unidades de procesamiento central para ejecutar tareas en la computadora'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Monitores', 
  'Dispositivos de salida para mostrar imágenes y gráficos'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Almacenamiento', 
  'Dispositivos para guardar y acceder a datos digitales'
);

INSERT INTO category (
  category_name, 
  category_description
) VALUES (
  'Memoria', 
  'Componentes que almacenan datos temporalmente para la computadora'
);

-- Brand
INSERT INTO brand (brand_name) VALUES ('Logitech');
INSERT INTO brand (brand_name) VALUES ('Nvidia');
INSERT INTO brand (brand_name) VALUES ('AMD');
INSERT INTO brand (brand_name) VALUES ('Intel');
INSERT INTO brand (brand_name) VALUES ('HyperX');
INSERT INTO brand (brand_name) VALUES ('Corsair');
INSERT INTO brand (brand_name) VALUES ('Gigabyte');
INSERT INTO brand (brand_name) VALUES ('Razer');
INSERT INTO brand (brand_name) VALUES ('Samsung');
INSERT INTO brand (brand_name) VALUES ('Seagate');

-- Supplier
INSERT INTO supplier (supplier_name, email, phone, address_id)
VALUES ('TechCo Innovations', 'techco@example.com', '2222-1111', 1);

INSERT INTO supplier (supplier_name, email, phone, address_id)
VALUES ('ElectroTech Solutions', 'electrotech@example.com', '3333-2222', 2);

INSERT INTO supplier (supplier_name, email, phone, address_id)
VALUES ('CyberWave Components', 'cyberwave@example.com', '4444-3333', 3);

INSERT INTO supplier (supplier_name, email, phone, address_id)
VALUES ('FuturaTech Hardware', 'futuratech@example.com', '5555-4444', 4);

-- Products
INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Teclado Logitech G Pro X', 
  'Teclado mecánico para juegos', 
  3199.99, 
  1, 
  1,
  1
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Mouse Logitech G502 Hero', 
  'Mouse de alto rendimiento para juegos', 
  1999.99, 
  2, 
  1,
  1
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Webcam Logitech C920 HD', 
  'Webcam Full HD para transmisiones', 
  2499.99, 
  3, 
  1,
  1
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Nvidia GeForce RTX 3080', 
  'Tarjeta gráfica de alta gama para juegos', 
  1799.99, 
  4, 
  2,
  2
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'AMD Radeon RX 6800 XT', 
  'Tarjeta gráfica para juegos con trazado de rayos', 
  15999.99, 
  4, 
  3,
  2
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'AMD Ryzen 7 4700G', 
  'APU con gráficos Radeon integrados', 
  6199.99, 
  4, 
  3,
  2
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'AMD Ryzen 9 5900X', 
  'Procesador de escritorio de alto rendimiento', 
  13599.99, 
  5, 
  3,
  3
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Monitor Curvo Samsung de 27 pulgadas',
  'Monitor LED curvo con resolución Full HD',
  12399.99,
  6,
  7,
  3
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Disco Duro Externo Portátil Seagate de 1TB',
  'Disco duro externo portátil USB 3.0 para almacenamiento de datos',
  1999.99,
  7,
  8,
  3
);

INSERT INTO product (
  product_name,
  product_description,
  price,
  category_id,
  brand_id,
  supplier_id
) VALUES (
  'Memoria RAM Corsair Vengeance RGB Pro 16GB',
  'Módulo de memoria DDR4 con iluminación RGB',
  3199.99,
  8,
  6,
  4
);

-- Stock
INSERT INTO stock (quantity, product_id)
VALUES (100, 1); -- Teclado Logitech G Pro X

INSERT INTO stock (quantity, product_id)
VALUES (150, 2); -- Mouse Logitech G502 Hero

INSERT INTO stock (quantity, product_id)
VALUES (75, 3); -- Webcam Logitech C920 HD

INSERT INTO stock (quantity, product_id)
VALUES (50, 4); -- Nvidia GeForce RTX 3080

INSERT INTO stock (quantity, product_id)
VALUES (25, 5); -- AMD Radeon RX 6800 XT

INSERT INTO stock (quantity, product_id)
VALUES (15, 6); -- AMD Ryzen 7 4700G

INSERT INTO stock (quantity, product_id)
VALUES (20, 7); -- AMD Ryzen 9 5900X

INSERT INTO stock (quantity, product_id)
VALUES (40, 8); -- Monitor Curvo Samsung de 27 pulgadas

INSERT INTO stock (quantity, product_id)
VALUES (60, 9); -- Disco Duro Externo Portátil Seagate de 1TB

INSERT INTO stock (quantity, product_id)
VALUES (50, 10); -- Memoria RAM Corsair Vengeance RGB Pro 16GB

-- Order Details
INSERT INTO order_details (
  quantity,
  total_amount,
  product_id
) VALUES (
  2,
  (SELECT price * 2 FROM product WHERE id = 1),
  1
); -- Teclado Logitech G Pro X

INSERT INTO order_details (
  quantity,
  total_amount,
  product_id
) VALUES (
  3,
  (SELECT price * 3 FROM product WHERE id = 2),
  2
); -- Mouse Logitech G502 Hero

INSERT INTO order_details (
  quantity,
  total_amount,
  product_id
) VALUES (
  1,
  (SELECT price * 1 FROM product WHERE id = 3),
  3
); -- Webcam Logitech C920 HD

INSERT INTO order_details (
  quantity,
  total_amount,
  product_id
) VALUES (
  2,
  (SELECT price * 2 FROM product WHERE id = 4),
  4
); -- Nvidia GeForce RTX 3080

-- Sales Order
INSERT INTO sales_order (
  order_date,
  order_status,
  ship_date,
  customer_id,
  employee_id,
  order_details_id
) VALUES (
  '2023-08-16',
  'Pendiente',
  '2023-08-20',
  1,
  1,
  1
);

INSERT INTO sales_order (
  order_date,
  order_status,
  ship_date,
  customer_id,
  employee_id,
  order_details_id
) VALUES (
  '2023-08-16',
  'Pendiente',
  '2023-08-20',
  2,
  2,
  2
);
