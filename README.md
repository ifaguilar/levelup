# LevelUp

## Prerequisitos

1. Haber creado las instancias EC2 para el front-end y el back-end.

2. Haber creado el archivo `NOMBRE_INSTANCIA.pem` el front-end y el back-end.

3. Haber creado las direcciones IP estática (Elastic IP Address) para el front-end y el back-end.

4. Haber creado instancia RDS para la base de datos PostgreSQL.

5. Haber configurado el grupo de seguridad (Security Group) para la instancia RDS para admitir conexiones PostgreSQL.

6. Haber comprado un dominio web.

## Primeros pasos

1.  Clonar repositorio:

        git clone https://github.com/ifaguilar/levelup.git

2.  Obtener los archivos `.pem` para cada una de las instancias (Google Drive).

3.  Crear la carpeta `aws` y guardar los archivos `.pem` en ella.

4.  Configurar los permisos de usuarios para la carpeta `aws` desde Windows Explorer, para admitir acceso solamente del usuario administrador.

## Front-end

### Configuración de servidor

1.  Abrir la terminal en la carpeta `aws`.

2.  Conectarse a la instancia EC2 mediante la terminal usando SSH:

        > ssh -i "levelup-frontend.pem" ubuntu@DIRECCION_IP_DE_INSTANCIA

3.  Escribir `yes` en el mensaje que sale al momento de conectarse a la isntancia.

4.  Actualizar los paquetes:

        $ sudo apt update

        $ sudo apt upgrade

5.  Actualizar `Node.js`:

        $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

        $ . ~/.nvm/nvm.sh

        $ nvm install --lts

6.  Instalar `nginx`:

        $ sudo apt install nginx

7.  Configurar el directorio de la app:

        $ sudo mkdir /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo chmod 755 -R /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo chown -R ubuntu:www-data /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo nano /etc/nginx/sites-available/DIRECCION_IP_DE_INSTANCIA

8.  Modificar el archivo:

        server {
            listen 80;
            listen [::]:80;
            server_name NOMBRE_DEL_DOMINIO www.NOMBRE_DEL_DOMINIO;

            root /var/www/DIRECCION_IP_DE_INSTANCIA;
            index index.html;
        }

9.  Enlazar nuestra nueva configuración con `nginx`:

        $ sudo unlink /etc/nginx/sites-enabled/default

        $ sudo ln -s /etc/nginx/sites-available/DIRECCION_IP_DE_INSTANCIA /etc/nginx/sites-enabled/

10. Reiniciar `nginx`:

        $ sudo systemctl restart nginx

11. Verificar configuración:

        $ sudo nginx -t

### Configuración de script para despliegue de la app:

1.  En la carpeta `client`, crear el archivo `deploy.sh`:

        echo "Building app..."
        npm run build

        echo "Deploying files to server..."
        scp -i "../aws/levelup-frontend.pem" -r dist/* ubuntu@54.209.35.208:/var/www/54.209.35.208/

        echo "Done!"

2.  Ejecutar archivo `deploy.sh`:

        > ./deploy.sh

3.  Si todo sale bien, el servidor ya estaría funcionando y la aplicación estaría disponible en `http://DIRECCION_IP_DE_INSTANCIA`.

### Configuración de SSL

1.  Instalar snapd:

        $ sudo apt install snapd

2.  Actualizar snapd:

        $ sudo snap install core; sudo snap refresh core

3.  Instalar certbot:

        $ sudo snap install --classic certbot

4.  Preparar certbot para su utilización:

        $ sudo ln -s /snap/bin/certbot /usr/bin/certbot

5.  Instalar los certificados:

        $ sudo certbot --nginx

6.  Seguir las instrucciones de instalación.

7.  Si todo sale bien, el servidor ya tendría habilitado SSL y podría ser accedido en `https://NOMBRE_DE_DOMINIO`.

### Configuración de PWA

[Ver documentación oficial](https://vite-pwa-org.netlify.app/)

## Back-end

### Configuración de servidor

1.  Abrir la terminal en la carpeta `aws`.

2.  Conectarse a la instancia EC2 mediante la terminal usando SSH:

        > ssh -i "levelup-backend.pem" ubuntu@DIRECCION_IP_DE_INSTANCIA

3.  Escribir `yes` en el mensaje que sale al momento de conectarse a la isntancia.

4.  Actualizar los paquetes:

        $ sudo apt update

        $ sudo apt upgrade

5.  Actualizar `Node.js`:

        $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

        $ . ~/.nvm/nvm.sh

        $ nvm install --lts

6.  Instalar `nginx`:

        $ sudo apt install nginx

7.  Configurar el directorio de la app:

        $ sudo mkdir /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo chmod 755 -R /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo chown -R ubuntu:www-data /var/www/DIRECCION_IP_DE_INSTANCIA

        $ sudo nano /etc/nginx/sites-available/DIRECCION_IP_DE_INSTANCIA

8.  Modificar el archivo:

        server {
            listen 80;
            listen [::]:80;

            location / {
                proxy_pass http://localhost:PUERTO_DE_LA_APLICACION;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }

9.  Enlazar nuestra nueva configuración con `nginx`:

        $ sudo unlink /etc/nginx/sites-enabled/default

        $ sudo ln -s /etc/nginx/sites-available/DIRECCION_IP_DE_INSTANCIA /etc/nginx/sites-enabled/

10. Reiniciar `nginx`:

        $ sudo systemctl restart nginx

11. Verificar configuración:

        $ sudo nginx -t

12. Instalar `pm2`:

        $ npm install -g pm2

### Configuración de script para despliegue de la app:

1.  En la carpeta `server`, crear el archivo `deploy.sh`:

        echo "Deploying files to server..."
        scp -i "../aws/levelup-backend.pem" -r ./* ubuntu@50.17.22.169:/var/www/50.17.22.169/

        echo "Done!"

2.  Ejecutar archivo `deploy.sh`:

        > ./deploy.sh

### Inicialización de la aplicación

1. Si todo sale bien, el servidor ya estaría funcionando y la aplicación estaría disponible en `http://DIRECCION_IP_DE_INSTANCIA`.

### Configuración de base de datos

1.
