# Simple E-commerce

## Objetivo:

App web, implementando cliente y servidor

- Cliente: HTML, CSS y JS
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

## To-do :

- [ ] Mantener el estado del filtro e indicar estado del filtro fuera del modal
- [ ] Visualizar producto
- [ ] Ordenar productos
- [ ] Paginación
- [ ] codigo limpio, con buenas practicas
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

| Http Method | Ruta             | Descripción          |
| ----------- | ---------------- | -------------------- |
| GET         | /api/categories/ | Lista las categorias |
| GET         | /api/products/   | Lista los productos  |

# Para ver la bd

```bash
npx prisma studio
```
