# angular-clientes

Este es un proyecto desarrollado con **Angular** que implementa un Dashboard informativo y un sistema de registro y gestión de clientes, utilizando Angular Material, gráficos con `Chart.js`, consumo de APIs y formularios reactivos.

> ⚠️ **Este proyecto se encuentra en etapa de revisión** y puede contener errores menores.

---

## 🚀 Funcionalidades principales

- 📊 Visualización de indicadores económicos de Chile (Dólar, UF, UTM) usando la API de [mindicador.cl](https://mindicador.cl)
- 📅 Filtro por tipo de indicador y rango de fechas con visualización en gráfico
- 🧾 Registro y visualización de clientes
- 🎨 Interfaz con Angular Material
- 🌐 Navegación por rutas (`/dashboard`, `/registro`, `/clientes`)
- ✅ Redirecciones listas para despliegue en Netlify

---

## 📁 Estructura del proyecto
angular-clientes/ ├── src/ # Código fuente de la app │ ├── app/ # Componentes, servicios, rutas │ └── assets/ # Imágenes, estilos globales ├── public/ # Archivos públicos ├── .gitignore ├── angular.json # Configuración Angular CLI ├── package.json # Dependencias y scripts ├── README.md # Este archivo ├── _redirects # Redirección para Netlify 

---

## 🛠️ Requisitos

- Node.js v14 o superior
- Angular CLI instalado globalmente (opcional para desarrollo)

---

## 🧪 Instalación y ejecución local

1. Clona el repositorio:

`` bash
git clone https://github.com/Juansix3/angular-clientes.git
cd angular-clientes

## 2. instalar dependencias 

npm install
ng serve

## Abrir tu navegador en http://localhost:4200/

## 🧱 Compilación para producción
npm run build

## 🧪 Pruebas unitarias
ng test

## 🔗 Despliegue
Netlify
## Configura el directorio de salida: dist/nombre-del-proyecto

## Asegúrate de tener el archivo _redirects en la raíz o dentro de src/

Vercel (opcional) (Me producia muchos errores por lo que se ejecuto en Netlify)
Comando de build: npm run build

Output directory: dist/nombre-del-proyecto

Asegúrate de tener el archivo vercel.json configurado correctamente

## 📎 Enlaces importantes
Repositorio: https://github.com/Juansix3/angular-clientes

## API utilizada: mindicador.cl

## Despliegue en Netlify: https://actividad-juan.netlify.app

## 📝 Estado del proyecto

Proyecto creado con fines de prueba. Algunas rutas pueden presentar errores al recargar directamente en entornos sin configuración de redirección (como Vercel). Se recomienda evaluar en local o en Netlify.

📧 Autor
Juan Carrasquero
Contacto: jjcoviol@gmail.com
