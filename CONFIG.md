# GitHub

## GitHub Secrets

1. Entrar a la configuración del repositorio.

2. Ir a `Secrets and variables`.

3. Seleccionar `Actions`.

4. Dar click en `New repository secret`.

5. Ingresar el nombre del secreto y su valor.

6. Dar click en `Add secret`.

Las variables de entorno (secretos) a configurar son:

```
JWT_SECRET
PG_HOST
PG_PORT
PG_USER
PG_PASSWORD
PG_DATABASE
PORT
VITE_API_BASE_URL
```

## GitHub Actions

1.  Crear un flujo de trabajo para Node.js

2.  Sustituir el archivo node.js.yml con:

```
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-client:

    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: client/package-lock.json

      - name: Install dependencies
        working-directory: ./client
        run: npm i

      - name: Create .env file
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
        run: echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env

      - name: Build the client project (if present)
        working-directory: ./client
        run: npm run build --if-present

  build-server:

    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: server/package-lock.json

      - name: Install dependencies
        working-directory: ./server
        run: npm i

      - name: Create .env file
        env:
          PG_HOST: ${{ secrets.PG_HOST }}
          PG_PORT: ${{ secrets.PG_PORT }}
          PG_USER: ${{ secrets.PG_USER }}
          PG_PASSWORD: ${{ secrets.PG_PASSWORD }}
          PG_DATABASE: ${{ secrets.PG_DATABASE }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: |
          echo "PG_HOST=${PG_HOST}" > .env
          echo "PG_PORT=${{ secrets.PG_PORT }}" >> .env
          echo "PG_USER=${{ secrets.PG_USER }}" >> .env
          echo "PG_PASSWORD=${{ secrets.PG_PASSWORD }}" >> .env
          echo "PG_DATABASE=${{ secrets.PG_DATABASE }}" >> .env
          echo "JWT_SECRET=${{ secrets.JWT_SECRET }}" >> .env
```

3. Entrar a la configuración del repositorio.

4. Ir a `Actions`.

5. Seleccionar `Runners`.

6. Dar click en `New self-hosted runner`.

7. Configurar el runner: Seleccionar `Linux` como la imagen, y `x64` como la arquitectura.

8. **La configuración continuará en los servidores.**

# Amazon Web Services

## RDS (PostgreSQL)

1. Crear la instancia RDS `levelup-db`. Para más información, [ver tutorial](https://www.youtube.com/watch?v=0A-5ITILrMA).

## EC2 (Back-end)

1. Crear la instancia EC2 `levelup-backend`.

2. Guardar el archivo `levelup-backend.pem`.

3. Crear y asignar la IP elástica para el servidor back-end.

4. Abrir la terminal en la carpeta `aws`.

5. Conectarse al servidor:

```
ssh -i "levelup-backend.pem" ubuntu@ec2-54-209-35-208.compute-1.amazonaws.com
```

6. Escribir `yes` en los prompts que aparezcan al conectarse al servidor.

7. Actualizar los paquetes:

```
$ sudo apt update

$ sudo apt upgrade
```

8.  Actualizar `Node.js`. Para más información, revisar el repositorio de [Node Version Manager](https://github.com/nvm-sh/nvm):

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

$ . ~/.nvm/nvm.sh

$ nvm install --lts
```

9. Instalar `nginx`:

```
$ sudo apt install nginx
```

10. Verificar que `nginx` esté funcionando:

```
$ sudo systemctl status nginx
```

11. Descargar el `GitHub Actions Runner`:

```
$ mkdir actions-runner && cd actions-runner

/actions-runner$ curl -o actions-runner-linux-x64-2.307.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.307.1/actions-runner-linux-x64-2.307.1.tar.gz

/actions-runner$ tar xzf ./actions-runner-linux-x64-2.307.1.tar.gz
```

12. Configurar el `GitHub Actions Runner`:

```
# TOKEN_ID se obtiene de GitHub

/actions-runner$ ./config.sh --url https://github.com/ifaguilar/levelup --token TOKEN_ID

/actions-runner$ ./run.sh
```

13. Instalar e iniciar el servicio de `GitHub Actions Runner`:

```
/actions-runner$ sudo ./svc.sh install

/actions-runner$ sudo ./svc.sh start
```

14. Cambiar los permisos de la carpeta `server`:

```
$ sudo chown -R www-data:www-data /home/ubuntu/actions-runner/_work/levelup/levelup/server
```

15. Crear un enlace simbólico entre el directorio `server` y el directorio del sitio web:

```
$ sudo ln -s /home/ubuntu/actions-runner/_work/levelup/levelup/server /var/www/levelup-backend
```

16. Desactivar la configuración por defecto de `nginx`:

```
sudo unlink /etc/nginx/sites-enabled/default
```

17. Configurar `nginx`:

```
$ sudo nano /etc/nginx/sites-available/levelup-backend
```

18. Sustituir el archivo de configuración de `nginx` con:

```
server {
        listen 80;
        listen [::]:80;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

19. Activar la configuración para el sitio web:

```
$ sudo ln -s /etc/nginx/sites-available/levelup-backend /etc/nginx/sites-enabled/levelup-backend
```

20. Verificar que la configuración de `nginx` esté correcta:

```
$ sudo nginx -t
```

21. Reiniciar `nginx`:

```
$ sudo systemctl restart nginx
```

22. Instalar `pm2`:

```
$ npm install -g pm2
```

23. Iniciar `server.js`:

```
$ cd actions-runner/_work/levelup/levelup/server

/actions-runner/_work/levelup/levelup/server$ pm2 start server.js

/actions-runner/_work/levelup/levelup/server$ pm2 startup

/actions-runner/_work/levelup/levelup/server$ pm2 save
```

## EC2 (Front-end)

1. Crear la instancia EC2 `levelup-frontend`.

2. Guardar el archivo `levelup-frontend.pem`.

3. Crear y asignar la IP elástica para el servidor front-end.

4. Abrir la terminal en la carpeta `aws`.

5. Conectarse al servidor:

```
ssh -i "levelup-frontend.pem" ubuntu@ec2-50-17-22-169.compute-1.amazonaws.com
```

6. Escribir `yes` en los prompts que aparezcan al conectarse al servidor.

7. Actualizar los paquetes:

```
$ sudo apt update

$ sudo apt upgrade
```

8.  Actualizar `Node.js`. Para más información, revisar el repositorio de [Node Version Manager](https://github.com/nvm-sh/nvm):

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

$ . ~/.nvm/nvm.sh

$ nvm install --lts
```

9. Instalar `nginx`:

```
$ sudo apt install nginx
```

10. Verificar que `nginx` esté funcionando:

```
$ sudo systemctl status nginx
```

11. Descargar el `GitHub Actions Runner`:

```
$ mkdir actions-runner && cd actions-runner

/actions-runner$ curl -o actions-runner-linux-x64-2.307.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.307.1/actions-runner-linux-x64-2.307.1.tar.gz

/actions-runner$ tar xzf ./actions-runner-linux-x64-2.307.1.tar.gz
```

12. Configurar el `GitHub Actions Runner`:

```
# TOKEN_ID se obtiene de GitHub

/actions-runner$ ./config.sh --url https://github.com/ifaguilar/levelup --token TOKEN_ID

/actions-runner$ ./run.sh
```

13. Instalar e iniciar el servicio de `GitHub Actions Runner`:

```
/actions-runner$ sudo ./svc.sh install

/actions-runner$ sudo ./svc.sh start
```

14. Cambiar los permisos de la carpeta `dist`:

```
$ sudo chown -R www-data:www-data /home/ubuntu/actions-runner/_work/levelup/levelup/client/dist

$ sudo chmod -R 755 /home/ubuntu/actions-runner/_work/levelup/levelup/client/dist
```

15. Crear un enlace simbólico entre el directorio `dist` y el directorio del sitio web:

```
$ sudo ln -s /home/ubuntu/actions-runner/_work/levelup/levelup/client/dist /var/www/levelup-frontend
```

16. Desactivar la configuración por defecto de `nginx`:

```
sudo unlink /etc/nginx/sites-enabled/default
```

17. Configurar `nginx`:

```
$ sudo nano /etc/nginx/sites-available/levelup-frontend
```

18. Sustituir el archivo de configuración de `nginx` con:

```
server {
        listen 80;
        listen [::]:80;
        server_name 50.17.22.169 levelup-is.tech www.levelup-is.tech;

        root /home/ubuntu/actions-runner/_work/levelup/levelup/client/dist;
        index index.html;
}
```

19. Activar la configuración para el sitio web:

```
$ sudo ln -s /etc/nginx/sites-available/levelup-frontend /etc/nginx/sites-enabled/levelup-frontend
```

20. Verificar que la configuración de `nginx` esté correcta:

```
$ sudo nginx -t
```

21. Reiniciar `nginx`:

```
$ sudo systemctl restart nginx
```
