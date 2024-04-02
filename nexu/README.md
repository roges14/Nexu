# Nexu Backend Coding Exercise

Nexu es una API desarrollada en NodeJs con el framework Nest (NestJS).

## Instalación

Usando Docker Compose se tiene un archivo de definición `docker-compose.yml`, el cual levanta una base de datos de MongoDb y un Api en NestJs.
para levantar los recursos, solo es necesario ejecutar:

```bash
docker compose up -d
```
En el compose se definen las credenciales para la base de datos, los puertos por los que se comunicarán y en el `Dockerfile` dentro del directorio nexu las instrucciones para levantar el proyecto de NEstJs que publica el api en el puerto `3000`

## Uso
Antes de poder usar el api es necesario poblar la base de datos con la información inicial, para esto se creó un Endpoint para inicializar la base de datos.El cual debe llamarse una vez levantado el proyecto.

POST
http://localhost:3000/seed


Endpoints disponibles

GET
http://localhost:3000/brands

GET
http://localhost:3000/brands/:id/models

POST
http://localhost:3000/brands

POST
http://localhost:3000/brands/:id/models

PUT
http://localhost:3000/models/:id

GET
http://localhost:3000/models?greater=&lower=


## Overview (Definición del Ejercicio)
You just got hired to join the *cool* engineering team at *Nexu*! The first story in your sprint backlog is to build a backend application for an already existing frontend. The frontend needs the next routes:


```
                              GET    /brands
                              GET    /brands/:id/models
                              POST   /brands
                              POST   /brands/:id/models
                              PUT    /models/:id
                              GET    /models
```

#### GET /brands

List all brands 
```json
[
  {"id": 1, "nombre": "Acura", "average_price": 702109},
  {"id": 2, "nombre": "Audi", "average_price": 630759},
  {"id": 3, "nombre": "Bentley", "average_price": 3342575},
  {"id": 4, "nombre": "BMW", "average_price": 858702},
  {"id": 5, "nombre": "Buick", "average_price": 290371},
  "..."
]
```
The average price of each brand is the average of its models average prices

#### GET /brands/:id/models

List all models of the brand
```json
[
  {"id": 1, "name": "ILX", "average_price": 303176},
  {"id": 2, "name": "MDX", "average_price": 448193},
  {"id": 1264, "name": "NSX", "average_price": 3818225},
  {"id": 3, "name": "RDX", "average_price": 395753},
  {"id": 354, "name": "RL", "average_price": 239050}
]
```

#### POST /brands

You may add new brands. A brand name must be unique.

```json
{"name": "Toyota"}
```

If a brand name is already in use return a response code and error message reflecting it.


#### POST /brands/:id/models

You may add new models to a brand. A model name must be unique inside a brand.

```json
{"name": "Prius", "average_price": 406400}
```
If the brand id doesn't exist return a response code and error message reflecting it.

If the model name already exists for that brand return a response code and error message reflecting it.

Average price is optional, if supply it must be greater than 100,000.


#### PUT /models/:id

You may edit the average price of a model.

```json
{"average_price": 406400}
```
The average_price must be greater then 100,000.

#### GET /models?greater=&lower=

List all models. 
If greater param is included show all models with average_price greater than the param
If lower param is included show all models with average_price lower than the param
```
# /models?greater=380000&lower=400000
```
```json
[
  {"id": 1264, "name": "NSX", "average_price": 3818225},
  {"id": 3, "name": "RDX", "average_price": 395753}
]
```
## TODO
Agregar informacion para documentar (swagger)
Optimizar Base de datos y relaciones.
Migrar a base datos relacional o manejar y agregar la relación con el ORM Mongoose.
Optimizar el autoincrementable de los id de las colecciones.
Agregar pruebas.
Homologar respuestas.
Optimizar

## License

[MIT](https://choosealicense.com/licenses/mit/)
