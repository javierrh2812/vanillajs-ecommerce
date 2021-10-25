# Simple E-commerce

## Objetivo:

App web, implementando cliente y servidor

- Cliente: HTML, CSS y JS vanilla
- Servidor (Api REST): NodeJS ExpressJS, Mysql y Prisma

## Live Demo:

## Funciones Básicas :

- [x] Listar categorias
- [x] Listar productos
- [x] Búsqueda por texto
- [x] Filtrar por categoria, precio y descuento

## Extras;

- [x] control de errores (conexión a api)
- [x] estado de búsqueda: mensajes de :cargando y vacio
- [x] documentacion (apirest, frontend, back, db)
- [x] Agregar a carrito
- [x] Controlar carrito con localStorage
- [x] Mostrar productos del carrito
- [x] Controlar los productos sin imagenes
- [x] Se pueden ver todos los productos ("scroll infinito")
- [x] Filtro responsive

## To-do :

- [ ] Mejorar UX filtro
- [ ] Comentar web y api / Documentar web y api
- [ ] Visualizar producto
- [ ] Ordenar productos
- [ ] codigo limpio, con buenas practicas (mejorar cliente)
- [ ] mejorar UX

## Requerimientos

- NodeJS
- Una instancia de mysql corriendo (se puede editar por cualquier bd sql soportada por prisma)

## Instalación

```bash
git clone
cd folder
mv .env.example .env
npm install

// si la base de datos ya existe
npx prisma generate
// si tu base de datos es nueva
npx prisma migrate dev --name "init"

npm run dev
```

# REST API

### Listar categoriar

- Ruta: /api/categories
- Método: GET
- Parametros: ninguno
- Recibe:

```JSON
{
	"data": {
		"id": Int,
		"name": String
	}[],
	"message": String
}
```

### Listar productos

- Ruta: /api/products
- Método: GET
- Query Parameters aceptados:
  | parámetro | tipo | descripción | valores aceptados |
  |----------|---|---|--|
  |page |Int |Página a consultar (de 20 en 20)| |
  |search |String |Término a filtrar| |
  |category|Int o "all"|Categoría de producto| "all", 1,2,3,4,5,6,7 |
  |discount|Int o "all"|Mínimo cantidad de descuento| "all", 0,15,10,20,30|
  |priceRange| String o "all"| Rango de precios| "all", "0-1000", "1000-2000", "2000-0" |

- Recibe:

```JSON
{
	"data": {
		"id": Int,
		"name": String,
		"url_image": String,
		"price": Int,
		"discount": Int,
		"category": Int
	}[],
	"message": String
}
```

# Modelo BD

```bash
npx prisma studio
```

# Cliente - Frontend

Es una emulación de una spa, y se utilizan strings como componentes (como en React)
Para editar el cliente revisar la carpeta "public", la cual se sirve desde express
con la ruta "/", mientras que la api se sirve con la ruta "/api", en el mismo dominio, para evitar error de cors.

El directorio es el siguiente
Para el layout rsponsive se usar css grid, con minmax y clamp

```
public /
      img/
      js/
        components.JS
        constants.JS
        fetch.JS
        utils.JS
      404.HTML
      index.HTML
      scripst.HTML
      styles.CSS
```
