# Save Food - Frontend

Save Food es una aplicación frontend desarrollada con Angular, diseñada para gestionar comidas e interactuar con un backend Spring Boot. Este proyecto proporciona una interfaz amigable para administrar alimentos con soporte de imágenes a través de Cloudinary.

## 🚀 Características
- Autenticación y autorización de usuarios
- Operaciones CRUD para alimentos
- Carga y gestión de imágenes con integración Cloudinary
- Diseño responsive con componentes PrimeNG
- Sistema de categorización de comidas

## 🛠️ Tecnologías Utilizadas
- Angular 18
- TypeScript
- PrimeNG
- RxJS
- Angular Router

## 📂 Estructura del Proyecto
```
src/
├── app/
│   ├── components/    # Componentes reutilizables
│   ├── home/        # Inicio de la aplicación
│   ├── models/       # Modelos de datos
│   ├── pages/        # Componentes de páginas
│   └── recipes/       # Comidas
│   ├── services/     # Servicios API
├── assets/          # Archivos estáticos
```

## 📄 Componentes Principales
| Componente | Descripción |
|-----------|-------------|
| Home | Muestra todas las comidas categorizadas por tipo |
| FoodForm | Formulario para crear y editar alimentos |
| Login | Interfaz de autenticación de usuarios |
| Register | Interfaz de registro de nuevos usuarios |

## 🔑 Características de Autenticación
- Registro de usuarios
- Sistema de inicio de sesión
- Gestión de tokens JWT

## 📱 Características de la Interfaz
- Diseño responsive
- Diseño moderno basado en tarjetas
- Vista previa y carga de imágenes
- Diálogos interactivos
- Notificaciones toast

## ⚠️ Instrucciones de Configuración
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar el servidor de desarrollo:
```bash
ng serve
```
4. Asegúrate de que el servidor backend esté ejecutándose en `http://localhost:8080`

## 🔗 Integración con Backend
Esta aplicación frontend está diseñada para trabajar con el backend de Save Food. Puedes encontrar el repositorio del backend en: [SaveFood-Backend](https://github.com/SrtaLiv/SaveFood-Backend)

## 👩‍💻 Autora
Ana Olivia Todesco | [Instagram](https://www.instagram.com/oliviatodesco) | [LinkedIn](https://www.linkedin.com/in/anaoliviatodesco/) | [YouTube](https://www.youtube.com/@oliviatodesco)