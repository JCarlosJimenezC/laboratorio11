class WarningBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.observeAttributeChanges();
  }

  // Observar cambios en atributos
  static get observedAttributes() {
    return ['message', 'pulsing'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pulsing' && oldValue !== newValue) {
      this.updatePulsingState();
    } else if (name === 'message' && oldValue !== newValue) {
      this.updateMessage();
    }
  }

  observeAttributeChanges() {
    // Observa cambios del atributo pulsing
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'pulsing') {
          this.updatePulsingState();
        }
      });
    });

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['pulsing']
    });
  }

  updatePulsingState() {
    const badge = this.shadowRoot.querySelector('[part="badge"]');
    if (this.hasAttribute('pulsing')) {
      badge?.classList.add('pulsing');
    } else {
      badge?.classList.remove('pulsing');
    }
  }

  updateMessage() {
    const messageElement = this.shadowRoot.querySelector('[part="message"]');
    const iconElement = this.shadowRoot.querySelector('[part="icon"]');
    if (messageElement) {
      messageElement.textContent = this.getAttribute('message') || 'Sesión por expirar';
    }
    if (iconElement) {
      const message = this.getAttribute('message') || 'Sesión por expirar';
      iconElement.textContent = message.includes('activa') ? '✓' : '!';
    }
    // Re-renderizar para actualizar el color
    this.render();
  }

  getBadgeColor() {
    const message = this.getAttribute('message') || 'Sesión por expirar';
    // Verde para sesión activa, rojo para sesión por expirar
    if (message.includes('activa')) {
      return { bg: '#4CAF50', shadow: 'rgba(76, 175, 80, 0.3)' };
    }
    return { bg: '#ff6b6b', shadow: 'rgba(255, 107, 107, 0.3)' };
  }

  render() {
    const message = this.getAttribute('message') || 'Sesión por expirar';
    const hasPulsing = this.hasAttribute('pulsing');
    const { bg, shadow } = this.getBadgeColor();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --badge-bg: ${bg};
          --badge-text: #ffffff;
          --badge-shadow: 0 2px 8px ${shadow};
          --border-radius: 20px;
          --animation-duration: 1.5s;
        }

        [part="badge"] {
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 8px 16px;
          border-radius: var(--border-radius);
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--badge-shadow);
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        [part="badge"]:hover:not(.pulsing) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
        }

        [part="badge"].pulsing {
          animation: pulse var(--animation-duration) ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: var(--badge-shadow);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
          }
        }

        [part="icon"] {
          font-size: 16px;
          animation: bounce var(--animation-duration) ease-in-out infinite;
        }

        [part="badge"].pulsing [part="icon"] {
          animation: bounce var(--animation-duration) ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        [part="message"] {
          margin: 0;
        }
      </style>

      <div part="badge" ${hasPulsing ? 'class="pulsing"' : ''}>
        <span part="icon">${message.includes('activa') ? '✓' : '!'}</span>
        <span part="message">${message}</span>
      </div>
    `;
  }
}

customElements.define('warning-badge', WarningBadge);
