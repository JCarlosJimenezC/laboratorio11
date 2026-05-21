# Laboratorio 11: Dashboard Interactivo con WebComponents

Un sistema completo de **WebComponents** implementando las mejores prácticas del curso: **Shadow DOM**, **atributos reactivos**, **CSS Parts**, **Slots** y **variables CSS**.

## 📋 Descripción

Este proyecto crea un dashboard interactivo compuesto por 4 componentes Web independientes que se comunican entre sí mediante eventos personalizados:

```
┌─────────────────────────────────────────────────┐
│         user-dashboard (Orquestador)            │
├─────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐ │
│  │user-card │  │weather-time  │  │warning-    │ │
│  │          │  │              │  │badge       │ │
│  │Avatar    │  │Liberia       │  │Sesión por  │ │
│  │Alonso    │  │31°C Sunny    │  │expirar     │ │
│  │Profesor  │  │              │  │(pulsing)   │ │
│  │[Saludar] │  │              │  │            │ │
│  └──────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────────────────────────────┘
```

## 🎯 Componentes

### 1. `<user-card>`
Muestra la información del usuario con un botón interactivo.

**Atributos:**
- `avatar` (string): Emoji o ícono del usuario
- `name` (string): Nombre del usuario
- `role` (string): Rol/posición del usuario

**Eventos:**
- `greeting-sent`: Se dispara al hacer clic en el botón, enviando:
  - `detail.name`: Nombre del usuario
  - `detail.timestamp`: Marca de tiempo

**Ejemplo:**
```html
<user-card 
    avatar="👨‍🏫" 
    name="Alonso" 
    role="Profesor">
</user-card>
```

### 2. `<weather-time>`
Muestra información meteorológica de una ubicación.

**Atributos:**
- `location` (string): Nombre de la ubicación
- `temperature` (number): Temperatura en Celsius
- `condition` (string): Condición climática (Sunny, Cloudy, Rainy, Snowy, Stormy, Windy)

**Ejemplo:**
```html
<weather-time 
    location="Liberia" 
    temperature="31" 
    condition="Sunny">
</weather-time>
```

### 3. `<warning-badge>`
Badge de advertencia con animación de pulso reactiva.

**Atributos:**
- `message` (string): Mensaje a mostrar
- `pulsing` (boolean): Activa la animación de pulso

**Ejemplo:**
```html
<warning-badge 
    message="Sesión por expirar"
    pulsing>
</warning-badge>
```

### 4. `<user-dashboard>`
Contenedor orquestador que gestiona la comunicación entre componentes.

**Características:**
- Captura eventos de `user-card`
- Actualiza el estado de `warning-badge` reactivamente
- Utiliza Slots para composición flexible

**Ejemplo:**
```html
<user-dashboard>
    <user-card slot="user-card" ...></user-card>
    <weather-time slot="weather" ...></weather-time>
    <warning-badge slot="warning" ...></warning-badge>
</user-dashboard>
```

## 🔧 Características Técnicas

### Shadow DOM
Todos los componentes utilizan Shadow DOM en modo `open` para encapsular estilos y estructura:

```javascript
this.attachShadow({ mode: 'open' });
```

### CSS Parts
Permite personalizar el estilo interno de componentes sin quebrar la encapsulación:

```css
user-card::part(card) {
    background: blue;
}

user-card::part(button) {
    color: white;
}
```

### Slots
Facilita la composición flexible de componentes:

```html
<user-dashboard>
    <user-card slot="user-card" ...></user-card>
</user-dashboard>
```

### Variables CSS
Todos los componentes exponen variables CSS personalizables:

```html
<user-card style="--card-bg: #fafafa; --button-bg: #4CAF50;">
</user-card>
```

### Atributos Reactivos
Los cambios en atributos se detectan automáticamente:

```javascript
static get observedAttributes() {
    return ['avatar', 'name', 'role'];
}

attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
        this.render();
    }
}
```

## 🎨 Personalización

### Personalizar colores

**user-card:**
```html
<user-card 
    avatar="👨‍💼"
    name="Juan"
    role="Desarrollador"
    style="
        --card-bg: #e3f2fd;
        --button-bg: #4CAF50;
        --button-hover: #45a049;
        --text-primary: #1a1a1a;
    ">
</user-card>
```

**weather-time:**
```html
<weather-time 
    location="San José"
    temperature="28"
    condition="Cloudy"
    style="
        --card-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --text-color: #ffffff;
    ">
</weather-time>
```

**warning-badge:**
```html
<warning-badge 
    message="⚠️ Advertencia"
    style="
        --badge-bg: #ff9800;
        --badge-text: #ffffff;
        --animation-duration: 1s;
    "
    pulsing>
</warning-badge>
```

### Personalizar con CSS externo

```css
/* Cambiar todos los badges rojo */
warning-badge {
    --badge-bg: #d32f2f;
    --animation-duration: 2s;
}

/* Personalizar partes específicas */
user-card::part(card) {
    border: 2px solid #667eea;
    border-radius: 16px;
}

user-card::part(greeting-button) {
    border: none;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Controlar el hover del botón */
user-card::part(greeting-button):hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

## ⚡ Flujo de Interacción

1. **Usuario hace clic en "Saludar"**
   - El evento `greeting-sent` se dispara desde `user-card`
   - Incluye el nombre del usuario y timestamp

2. **user-dashboard captura el evento**
   - Establece el atributo `show-warning="true"`
   - Inicia temporizador de 5 segundos

3. **warning-badge se actualiza**
   - Recibe el atributo `pulsing`
   - Se anima con efecto de pulso

4. **Después de 5 segundos**
   - Se remueve el atributo `pulsing`
   - El badge vuelve a estado normal

## 📁 Estructura del Proyecto

```
laboratorio11/
├── src/
│   ├── index.html              # Página principal con dashboard
│   ├── index.js                # Script principal con lógica global
│   ├── css/
│   │   └── global.css          # Estilos globales y variables CSS
│   ├── modules/
│   │   ├── user-card.js        # Componente de tarjeta de usuario
│   │   ├── weather-time.js     # Componente de clima
│   │   ├── warning-badge.js    # Componente de alerta
│   │   └── user-dashboard.js   # Componente orquestador
│   └── assets/                 # Carpeta de recursos
├── package.json
├── pnpm-lock.yaml
└── README.md                   # Esta documentación
```

## 🚀 Uso

### Ejecución

1. Abre `src/index.html` en tu navegador para ver el dashboard principal
3. Haz clic en el botón "Saludar" para ver la interacción entre componentes
4. Abre la consola (F12) para ver los eventos y logs

### Requisitos
- Navegador moderno con soporte para WebComponents (Chrome, Firefox, Edge, Safari)
- No requiere dependencias externas

### Funciones disponibles en consola

Al cargar `index.html`, las siguientes funciones estén disponibles en la consola:

```javascript
// Ver información de todos los componentes
logComponentsInfo()

// Probar cambios reactivos de atributos
testReactiveAttributes()

// Personalizar componentes programáticamente
customizeComponents()
```

## 📚 Conceptos Aplicados

✅ **Shadow DOM** - Encapsulación de estilos y estructura  
✅ **Custom Elements** - Definición de etiquetas HTML personalizadas  
✅ **CSS Parts** - Exposición controlada de partes internas  
✅ **Slots** - Composición de componentes  
✅ **CSS Custom Properties** - Variables CSS para personalización  
✅ **Atributos Reactivos** - Reactividad basada en atributos  
✅ **Eventos Personalizados** - Comunicación entre componentes  
✅ **Animaciones CSS** - Efectos visuales suaves  

## 📚 Ejemplos Avanzados

Nota: Los ejemplos separados fueron integrados en la documentación y simplificados; usa `index.html` y este README para ver demos y ejemplos de uso.

##  Debugging

### Ver Shadow DOM en DevTools
1. Abre DevTools (F12)
2. Ve a Settings → Preferences
3. Activa "Show user agent shadow DOM"
4. Ahora puedes inspeccionar el Shadow DOM

### Escuchar eventos personalizados
```javascript
document.addEventListener('greeting-sent', (e) => {
    console.log('Evento capturado:', e.detail);
});
```

## 📝 Notas

- Todos los componentes son independientes y reutilizables
- La comunicación se realiza mediante eventos (patrón publisher-subscriber)
- Los estilos están completamente encapsulados en Shadow DOM
- Compatible con frameworks (React, Vue, etc.)

## 👨‍💻 Autor

Laboratorio 11 - Curso de Multimedios  
Desarrollado con JavaScript Vanilla y WebComponents

---

**¡Disfruta creando componentes reutilizables!** 🎉
