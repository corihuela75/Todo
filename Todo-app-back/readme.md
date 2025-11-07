📝 README.md (Backend)
# 🟦 Todo API - Backend (Node.js + Express + MongoDB)

API REST utilizada por la aplicación **Todo App**.  
Permite gestionar tareas (todos), incluyendo crear, listar, actualizar y eliminar.

---

## 🧰 Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- CORS
- Body-Parser
- Dotenv

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone <url-del-repo>
cd backend
```

Instalar dependencias:

```bash
npm install
```

⚙️ Configuración de Variables de Entorno

Crear un archivo .env en la raíz:
```bash
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/todos_db
```


▶️ Ejecutar el Servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:
```bash
npm start
```

El servidor se ejecutará en:

http://localhost:3000

🗂 Endpoints
Obtener todas las tareas
GET /api/todos


Respuesta:
```bash
[
  {
    "uid": "f91a8e",
    "title": "Estudiar NgRx",
    "priority": "HIGH",
    "expiration": "2025-01-20",
    "state": "PENDING"
  }
]
```

Crear nueva tarea
POST /api/todos


Body (JSON):
```bash
{
  "title": "Comprar café",
  "priority": "LOW",
  "expiration": "2025-02-05"
}
```

Actualizar una tarea
PUT /api/todos/:uid


Body (JSON):
```bash
{
  "title": "Comprar café molido",
  "state": "DONE"
}
```

Eliminar una tarea
DELETE /api/todos/:uid


Respuesta:

{ "message": "Todo eliminado correctamente" }

🧱 Estructura del Proyecto
```bash
backend/
 ├── src/
 │   ├── models/
 │   │   └── Todo.js
 │   ├── routes/
 │   │   └── todo.routes.js
 │   ├── controllers/
 │   │   └── todo.controller.js
 │   └── server.js
 ├── .env
 ├── package.json
 └── README.md
```

🔒 CORS

El backend permite peticiones desde:

http://localhost:4200


Si cambias el dominio del frontend, actualiza la configuración en server.js.