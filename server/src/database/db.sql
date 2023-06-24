CREATE TABLE Gender (
  id SERIAL PRIMARY KEY,
  gender_name VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Municipality (
  id SERIAL PRIMARY KEY,
  municipality_name VARCHAR(255) NOT NULL,
  department_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY(department_id) REFERENCES Department(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Address (
  id SERIAL PRIMARY KEY,
  address_description VARCHAR(255) NOT NULL,
  municipality_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY(municipality_id) REFERENCES Municipality(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Team (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(50) UNIQUE NOT NULL,
  team_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Employee_Role (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  role_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Category (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Brand (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE Person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL, 
  gender_id INTEGER NOT NULL,
  birthdate DATE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  address_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (gender_id) REFERENCES Gender(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Client (
  id SERIAL PRIMARY KEY,
  rtn INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES Person(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Employee (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  profile_pic_url VARCHAR(255) NOT NULL DEFAULT 'https://placehold.co/400',
  person_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (person_id) REFERENCES Person(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(team_id) REFERENCES Team(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(role_id) REFERENCES Employee_Role(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  brand_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (category_id) REFERENCES Category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES Brand(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Stock (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Company (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  address_id INTEGER NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  rtn INTEGER NOT NULL,
  website VARCHAR(100) UNIQUE NOT NULL,
  sanitary_registry VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Invoice_Details (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) NOT NULL,
  total_exonerated DECIMAL(10, 2) NOT NULL,
  total_excempt DECIMAL(10, 2) NOT NULL,
  total_taxed_15 DECIMAL(10, 2) NOT NULL,
  total_taxed_18 DECIMAL(10, 2) NOT NULL,
  isv_15 DECIMAL(10, 2) NOT NULL,
  isv_18 DECIMAL(10, 2) NOT NULL,
  total_amout DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Invoice (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  employee_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  invoice_details_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY (company_id) REFERENCES Company(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES Employee(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES Client(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (invoice_details_id) REFERENCES Invoice_Details(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE System_Log (
  id SERIAL PRIMARY KEY,
  log_description VARCHAR(255) NOT NULL,
  employee_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  FOREIGN KEY(employee_id) REFERENCES Employee(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Departments
INSERT INTO Department (department_name) VALUES ('Atlántida');
INSERT INTO Department (department_name) VALUES ('Colón');
INSERT INTO Department (department_name) VALUES ('Comayagua');
INSERT INTO Department (department_name) VALUES ('Copán');
INSERT INTO Department (department_name) VALUES ('Cortés');
INSERT INTO Department (department_name) VALUES ('Choluteca');
INSERT INTO Department (department_name) VALUES ('El Paraíso');
INSERT INTO Department (department_name) VALUES ('Francisco Morazán');
INSERT INTO Department (department_name) VALUES ('Gracias a Dios');
INSERT INTO Department (department_name) VALUES ('Intibucá');
INSERT INTO Department (department_name) VALUES ('Islas de la Bahía');
INSERT INTO Department (department_name) VALUES ('La Paz');
INSERT INTO Department (department_name) VALUES ('Lempira');
INSERT INTO Department (department_name) VALUES ('Ocotepeque');
INSERT INTO Department (department_name) VALUES ('Olancho');
INSERT INTO Department (department_name) VALUES ('Santa Bárbara');
INSERT INTO Department (department_name) VALUES ('Valle');
INSERT INTO Department (department_name) VALUES ('Yoro');

-- Atlántida
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Ceiba', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Porvenir', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tela', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jutiapa', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Masica', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arizona', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esparta', 1);

-- Colón
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trujillo', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Balfate', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Iriona', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Limón', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sabá', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Fe', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rosa de Aguán', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sonaguera', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tocoa', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Bonito Oriental', 2);

-- Comayagua
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Comayagua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ajuterique', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Rosario', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esquías', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Humuya', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Libertad', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lamaní', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Trinidad', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lejamaní', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Meámbar', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Minad de Oro', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ojos de Agua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jerónimo', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José de Comayagua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José del Potrero', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Luis', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Sebastián', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Siguatepeque', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villa de San Antonio', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Las Lajas', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Taulabé', 3);

-- Copán
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rosa de Copán', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cabañas', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Copán Ruinas', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Corquín', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cucuyagua', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dulce Nombre', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Paraíso', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Florida', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Jigua', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Unión', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Arcadia', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Agustín', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jerónimo', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan de Opoa', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Nicolás', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trinidad de Copán', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Veracruz', 4);

-- Cortés
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro Sula', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Choloma', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Omoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Pimienta', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Potrerillos', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Puerto Cortés', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Cortés', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Yojoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Manuel', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Cruz de Yojoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villanueva', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Lima', 5);

-- Choluteca
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Choluteca', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Apacilagua', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepcion de María', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Duyure', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Corpus', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Triunfo', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marcovia', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morolica', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Namasigue', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Orocuina', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Pespire', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Isidro', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos de Colón', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana de Yusguare', 6);

-- El Paraíso
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yuscarán', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alauca', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Danlí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Paraíso', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Güinope', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jacaleapa', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Liure', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morocelí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Oropolí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Potrerillos', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Lucas', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Matías', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Soledad', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Teupasenti', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Texiguat', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Vado Ancho', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yauyupe', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trojes', 7);

-- Francisco Morazán
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Distrito Central', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alubarén', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cedros', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Curarén', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Porvenir', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guaimaca', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Libertad', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Venta', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lepaterique', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Maraita', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marale', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Armenia', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ojojona', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Orica', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Reitoca', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sabanagrande', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Oriente', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Buenaventura', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Ignacio', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan de Flores', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Miguelito', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Lucía', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tatumbla', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Valle de Ángeles', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villa de San Francisco', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Vallecillo', 8);

-- Gracias a Dios
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Puerto Lempira', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Brus Laguna', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ahuas', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Juan Francisco Bulnes', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villeda Morales', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Wampusirpe', 9);

-- Intibucá
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Esperanza', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Camasca', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Colomoncagua', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Intibucá', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jesús de Otoro', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Magdalena', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Isidro', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos de la Sierra', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Miguelito', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Lucía', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yamaranguila', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Opalaca', 10);

-- Islas de la Bahía
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Roatán', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guanaja', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('José Santos Guardiola', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Utila', 11);

-- La Paz
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Paz', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Aguanqueterique', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cabañas', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cane', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Chinacla', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guajiquiro', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lauterique', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marcala', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mercedes de Oriente', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Opatoro', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio del Norte', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro de Tutule', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Elena', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa María', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santiago de Puringla', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yarula', 12);

-- Lempira
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Gracias', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Belén', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Candelaria', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Cololaca', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Erandique', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Gualcince', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Guarita', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Campa', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Iguala', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Las Flores', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Unión', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Virtud', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Lepaera', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Mapulaca', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Piraera', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Andrés', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Francisco', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Juan Guarita', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Manuel Colohete', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Rafael', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Sebastián', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Santa Cruz', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Talgua', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Tambla', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Tomalá', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Valladolid', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Virginia', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Marcos de Caiquín', 13);

-- Ocotepeque
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ocotepeque', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Belén Gualcho', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores Merendón', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Fraternidad', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Encarnación', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Labor', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lucerna', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mercedes', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Fernando', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco del Valle', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jorge', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Fe', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sensenti', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sinuapa', 14);

-- Olancho
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Juticalpa', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Campamento', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Catacamas', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concordia', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dulce Nombre de Culmí', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Rosario', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esquipulas del Norte', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Gualaco', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guarizama', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guata', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guayape', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jano', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Unión', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mangulile', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Manto', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Salamá', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Esteban', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Becerra', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de la Paz', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa María del Real', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Silca', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yocón', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Patuca', 15);

-- Santa Bárbara
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Bárbara', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arada', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Atima', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Azacualpa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ceguaca', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción del Norte', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción del Sur', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Chinda', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Níspero', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Gualala', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ilama', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Las Vegas', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Macuelizo', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Naranjito', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nuevo Celilac', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Frontera', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Petoa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Protección', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Quimistán', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Ojuera', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José de las Colinas', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Luis', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Nicolás', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro Zacapa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Vicente Centenario', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trinidad', 16);

-- Valle
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nacaome', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alianza', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Amapala', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Aramecina', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Caridad', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Goascorán', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Langue', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Coray', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Lorenzo', 17);

-- Yoro
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yoro', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arenal', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Negrito', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Progreso', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jocón', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morazán', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Olanchito', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sulaco', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Victoria', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yorito', 18);

-- Gender
INSERT INTO Gender (gender_name) VALUES ('Femenino');
INSERT INTO Gender (gender_name) VALUES ('Masculino');

-- Team
INSERT INTO Team (team_name, team_description) VALUES ('TI', 'Gestiona la infraestructura tecnológica y brinda soporte técnico.');
INSERT INTO Team (team_name, team_description) VALUES ('Ventas', 'Genera ingresos a través de la venta de productos/servicios.');
INSERT INTO Team (team_name, team_description) VALUES ('Compras', 'Gestiona las adquisiciones de productos y servicios necesarios.');
INSERT INTO Team (team_name, team_description) VALUES ('Finanzas', 'Maneja las finanzas y la contabilidad de la empresa.');
INSERT INTO Team (team_name, team_description) VALUES ('Servicio al Cliente', 'Brinda soporte y atención a los clientes.');
INSERT INTO Team (team_name, team_description) VALUES ('Recursos Humanos', 'Administra el personal y las políticas laborales.');
INSERT INTO Team (team_name, team_description) VALUES ('Marketing', 'Desarrolla estrategias de marketing y promoción.');

-- Employee Role
INSERT INTO Employee_Role (role_name, role_description) VALUES ('Administrador', 'Es el encargado principal del sistema y tiene los privilegios más altos.');
INSERT INTO Employee_Role (role_name, role_description) VALUES ('Gerente', 'Tiene funciones de supervisión y gestión sobre los empleados. ');
INSERT INTO Employee_Role (role_name, role_description) VALUES ('Empleado', 'Es el usuario regular del sistema y tiene acceso a las funciones y características necesarias para realizar su trabajo diario.');

-- Address
INSERT INTO Address (address_description, municipality_id) VALUES ('Boulevard Suyapa, Tegucigalpa', 110);

-- Person
INSERT INTO Person (
  first_name, 
  last_name, 
  gender_id, 
  birthdate, 
  phone, 
  address_id
) VALUES (
  'admin',
  '',
  2,
  '2023-01-01',
  '0000-0000',
  1
);

-- Employee
INSERT INTO Employee (
  email,
  password,
  person_id,
  team_id,
  role_id
) VALUES (
  'admin@levelup-is.tech',
  '$2a$10$b7e2FJ7jnnlhpq5wte0lL.Fl0/JDfnH0xbj133HxXp.B6IRcZiGyS',
  1,
  1,
  1
);