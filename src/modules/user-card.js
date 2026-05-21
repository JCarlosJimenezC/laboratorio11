class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  // Observar cambios en atributos
  static get observedAttributes() {
    return ['avatar', 'name', 'role'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setupListeners() {
    const button = this.shadowRoot.querySelector('[part="greeting-button"]');
    button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('greeting-sent', {
          detail: { 
            name: this.getAttribute('name') || 'Usuario',
            timestamp: new Date()
          },
          bubbles: true,
          composed: true
        })
      );
    });
  }

  render() {
    const avatar = this.getAttribute('avatar') || '👤';
    const name = this.getAttribute('name') || 'Nombre';
    const role = this.getAttribute('role') || 'Rol';
    
    // Detectar si el avatar es una URL de imagen
    const isImageUrl = avatar.includes('.png') || avatar.includes('.jpg') || avatar.includes('.jpeg') || avatar.includes('.gif');
    const avatarHTML = isImageUrl 
      ? `<img src="${avatar}" alt="Avatar" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">`
      : `<span>${avatar}</span>`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --card-bg: #ffffff;
          --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          --text-primary: #333;
          --text-secondary: #666;
          --button-bg: #007bff;
          --button-hover: #0056b3;
          --border-radius: 8px;
        }

        [part="card"] {
          background: var(--card-bg);
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
          padding: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
          min-width: 250px;
          transition: box-shadow 0.3s ease;
        }

        [part="card"]:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        [part="avatar"] {
          font-size: 48px;
          min-width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [part="info"] {
          flex: 1;
        }

        [part="name"] {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        [part="role"] {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
        }

        [part="greeting-button"] {
          background: var(--button-bg);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        [part="greeting-button"]:hover {
          background: var(--button-hover);
        }

        [part="greeting-button"]:active {
          transform: scale(0.98);
        }
      </style>

      <div part="card">
        <div part="avatar">${avatarHTML}</div>
        <div part="info">
          <p part="name">${name}</p>
          <p part="role">${role}</p>
        </div>
        <button part="greeting-button">Saludar</button>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);
