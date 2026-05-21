/**
 * Laboratorio 11 - WebComponents
 * Script principal que inicializa y gestiona la aplicación
 */

// ============================================
// INICIALIZACIÓN DE COMPONENTES
// ============================================

console.log('🚀 Iniciando Laboratorio 11 - WebComponents');

// Los componentes se cargan automáticamente desde el HTML
// mediante tags <script type="module">

// ============================================
// ESCUCHADORES DE EVENTOS GLOBALES
// ============================================

// Escuchar eventos de saludo en todo el documento
document.addEventListener('greeting-sent', (event) => {
  const { name, timestamp } = event.detail;
  console.log(`👋 Evento capturado: ${name} saludó a las ${timestamp.toLocaleTimeString()}`);
  
  // Puedes hacer más cosas aquí, como enviar a un servidor
  logGreeting(name, timestamp);
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Registra los saludos en consola (simula envío a servidor)
 * @param {string} name - Nombre del usuario
 * @param {Date} timestamp - Marca de tiempo del evento
 */
function logGreeting(name, timestamp) {
  const log = `[${timestamp.toLocaleTimeString()}] Saludo de: ${name}`;
  console.log(`📝 ${log}`);
}

/**
 * Personaliza dinámicamente los componentes
 */
function customizeComponents() {
  // Ejemplo: cambiar dinamicamente un atributo
  const userCard = document.querySelector('user-card');
  
  if (userCard) {
    // Puedes cambiar atributos con JavaScript
    console.log(`👤 Usuario actual: ${userCard.getAttribute('name')}`);
  }
}

/**
 * Prueba de cambio reactivo de atributos
 */
function testReactiveAttributes() {
  const badge = document.querySelector('warning-badge');
  
  if (badge) {
    console.log('🧪 Probando atributos reactivos...');
    
    // Cambiar mensaje después de 2 segundos
    setTimeout(() => {
      badge.setAttribute('message', '⚠️ Sesión expirando pronto');
      console.log('✅ Mensaje actualizado');
    }, 2000);
    
    // Remover atributo pulsing después de 7 segundos
    setTimeout(() => {
      badge.removeAttribute('pulsing');
      console.log('✅ Pulso desactivado');
    }, 7000);
  }
}

/**
 * Muestra información de los componentes en consola
 */
function logComponentsInfo() {
  console.group('📊 Información de Componentes');
  
  const dashboard = document.querySelector('user-dashboard');
  const userCard = document.querySelector('user-card');
  const weatherTime = document.querySelector('weather-time');
  const warningBadge = document.querySelector('warning-badge');
  
  if (dashboard) {
    console.log('✓ user-dashboard:', dashboard.tagName);
  }
  if (userCard) {
    console.log('✓ user-card:', {
      avatar: userCard.getAttribute('avatar'),
      name: userCard.getAttribute('name'),
      role: userCard.getAttribute('role')
    });
  }
  if (weatherTime) {
    console.log('✓ weather-time:', {
      location: weatherTime.getAttribute('location'),
      temperature: weatherTime.getAttribute('temperature'),
      condition: weatherTime.getAttribute('condition')
    });
  }
  if (warningBadge) {
    console.log('✓ warning-badge:', {
      message: warningBadge.getAttribute('message'),
      pulsing: warningBadge.hasAttribute('pulsing')
    });
  }
  
  console.groupEnd();
}

// ============================================
// EJECUCIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM completamente cargado');
  
  // Dar un poco de tiempo para que los componentes se registren
  setTimeout(() => {
    logComponentsInfo();
    customizeComponents();
  }, 100);
});

// ============================================
// EXPORTAR FUNCIONES PARA USO EN CONSOLA
// ============================================

// Hacer funciones disponibles globalmente para debugging
window.testReactiveAttributes = testReactiveAttributes;
window.logComponentsInfo = logComponentsInfo;
window.customizeComponents = customizeComponents;

console.log('💡 Funciones disponibles en consola:');
console.log('   - testReactiveAttributes()');
console.log('   - logComponentsInfo()');
console.log('   - customizeComponents()');
