# Gabriel H. Quiroga — Portfolio

> Estudiante avanzado de Contador Público & Desarrollador de Software.
> Automatizo procesos contables, impositivos y de auditoría con IA.

Landing page personal. Una sola página, sin frameworks, sin build step. HTML + CSS + JS vanilla.

## Stack del sitio

| Tecnología | Uso |
|---|---|
| HTML semántico | Estructura accesible y SEO-friendly |
| CSS moderno | Variables, `color-mix`, animaciones con `@keyframes` e `IntersectionObserver` |
| JavaScript vanilla | Sin dependencias. Typewriter, contadores animados, SVG draw-in, tema oscuro/claro |
| [Lucide](https://lucide.dev/) | Iconos vectoriales livianos |
| [Simple Icons](https://simpleicons.org/) | Iconos de tecnologías del stack |
| [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) + [Inter](https://fonts.google.com/specimen/Inter) | Tipografía |

## Estructura

```
├── index.html          # Página principal (portafolio)
├── cv.html             # Currículum vitae (imprimible, bilingüe)
├── styles.css          # Estilos
├── script.js           # Funcionalidad
├── assets/
│   └── images/         # Imágenes (vacío, sin usar)
├── docs/               # Documentación adicional (vacío)
├── .gitignore
└── README.md
```

## Features

- **CV imprimible** (`cv.html`) optimizado para A4, bilingüe (ES/EN), con diseño a dos columnas
- **Tema claro/oscuro** automático (respeta `prefers-color-scheme`) y manual (toggle con Lucide)
- **Animaciones al scroll** con `IntersectionObserver` (bidireccionales)
- **Typewriter** en el hero
- **Contadores animados** con métricas reales
- **SVG ilustrativos** animados por servicio
- **Tarjetas de problemas expandibles** con soluciones al hacer clic
- **Tooltips en badges** de tecnología con descripción al hover
- **SEO** con Open Graph tags
- **Accesibilidad** skip link, ARIA labels, navegación por teclado
- **Responsive** mobile-first

## Deploy

Abrí `index.html` en cualquier navegador. No necesita build.

**GitHub Pages:** https://gabrielhquiroga.github.io

## Principios aplicados

- KISS — la solución más simple que resuelve el problema real
- Accesibilidad desde la estructura, no como afterthought
- Performance sin frameworks — cero dependencias pesadas
- El diseño comunica, no decora
