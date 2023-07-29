CREATE TABLE gender (
  id SERIAL PRIMARY KEY,
  gender_name VARCHAR(10) UNIQUE NOT NULL,
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
  email VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  address_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  birthdate DATE NOT NULL,
  gender_id INT NOT NULL,
  address_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (gender_id) REFERENCES gender(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  rtn VARCHAR(20) UNIQUE NOT NULL,
  person_id INT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  profile_pic_url VARCHAR(255) NOT NULL,
  person_id INT UNIQUE NOT NULL,
  job_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES job(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  category_description VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  brand_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE CASCADE
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

CREATE TABLE system_action (
  id SERIAL PRIMARY KEY,
  system_action_name VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE system_log (
  id SERIAL PRIMARY KEY,
  system_log_message VARCHAR(255) NOT NULL,
  system_log_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  system_action_id INT NOT NULL,
  employee_id INT NOT NULL,
  FOREIGN KEY (system_action_id) REFERENCES system_action(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE
);

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

-- Address
INSERT INTO address (address_description, municipality_id) VALUES ('Ciudad Universitaria', 110);

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
  'John',
  'Doe',
  'john.doe@levelup-is.tech',
  '0000-0000',
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
  'Jane',
  'Doe',
  'jane.doe@levelup-is.tech',
  '1111-1111',
  '1990-01-01',
  1,
  1
);

-- Employee
INSERT INTO employee (
  password,
  profile_pic_url,
  person_id,
  job_id
) VALUES (
  '$2a$10$QTiuId6lKWW1reqPJRIpyu3x3L5cmTGYyeTBGGcoKpSk3QPfdbNcO',
  'https://ui-avatars.com/api/?name=John+Doe&background=random&size=128',
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
  'https://ui-avatars.com/api/?name=Jane+Doe&background=random&size=128',
  2,
  1
);

-- Brand
INSERT INTO brand (
  brand_name
) VALUES (
  'Logitech'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'Nvidia'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'AMD'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'Intel'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'HyperX'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'Corsair'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'Gigabyte'
);

INSERT INTO brand (
  brand_name
) VALUES (
  'Razer'
);
