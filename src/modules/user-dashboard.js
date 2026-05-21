class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ['show-warning'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show-warning') {
      this.updateWarningState();
    }
  }

  setupEventListeners() {
    // Escuchar el evento 'greeting-sent' del user-card
    this.addEventListener('greeting-sent', (event) => {
      this.handleGreeting(event);
    });
  }

 handleGreeting(event) {
  const { name, timestamp } = event.detail;
  console.log(`¡Hola! ${name} saludó a las ${timestamp.toLocaleTimeString()}`);
  
  // Al saludar → sesión activa
  this.setAttribute('show-warning', 'true');
  this.updateWarningState();
}

updateWarningState() {
  const warningBadge = this.querySelector('warning-badge');
  if (warningBadge) {
    if (this.hasAttribute('show-warning')) {
      // Sesión activa: verde, sin pulso
      warningBadge.removeAttribute('pulsing');
      warningBadge.setAttribute('message', 'Sesión activa');
    } else {
      // Estado inicial: rojo, pulsando
      warningBadge.setAttribute('pulsing', '');
      warningBadge.setAttribute('message', 'Sesión por expirar');
    }
  }
}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --dashboard-bg: #f5f7fa;
          --gap-size: 20px;
          --border-radius: 12px;
        }

        [part="dashboard"] {
          background: var(--dashboard-bg);
          border-radius: var(--border-radius);
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--gap-size);
          align-items: start;
          min-height: 200px;
        }

        [part="dashboard-header"] {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap-size);
          flex-wrap: wrap;
        }

        [part="title"] {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        [part="content"] {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--gap-size);
          align-items: center;
        }

        @media (max-width: 768px) {
          [part="dashboard"] {
            grid-template-columns: 1fr;
          }

          [part="dashboard-header"] {
            flex-direction: column;
            align-items: flex-start;
          }

          [part="content"] {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div part="dashboard">
        <div part="dashboard-header">
          <h1 part="title">Dashboard</h1>
        </div>
        
        <div part="content">
          <slot name="user-card"></slot>
          <slot name="weather"></slot>
          <slot name="warning"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('user-dashboard', UserDashboard);
