class WeatherTime extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Observar cambios en atributos
  static get observedAttributes() {
    return ['location', 'temperature', 'condition'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  getWeatherIcon() {
    const condition = this.getAttribute('condition') || 'Sunny';
    const iconMap = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Snowy': '❄️',
      'Stormy': '⛈️',
      'Windy': '💨'
    };
    return iconMap[condition] || '🌤️';
  }

  render() {
    const location = this.getAttribute('location') || 'Ubicación';
    const temperature = this.getAttribute('temperature') || '25';
    const condition = this.getAttribute('condition') || 'Sunny';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --card-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          --text-color: #ffffff;
          --border-radius: 12px;
        }

        [part="weather-card"] {
          background: var(--card-bg);
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
          padding: 20px;
          color: var(--text-color);
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s ease;
        }

        [part="weather-card"]:hover {
          transform: translateY(-2px);
        }

        [part="weather-icon"] {
          font-size: 48px;
          min-width: 56px;
          text-align: center;
        }

        [part="weather-info"] {
          flex: 1;
        }

        [part="location"] {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 4px 0;
          opacity: 0.9;
        }

        [part="temp-container"] {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        [part="temperature"] {
          font-size: 28px;
          font-weight: 700;
        }

        [part="condition"] {
          font-size: 14px;
          opacity: 0.85;
        }
      </style>

      <div part="weather-card">
        <div part="weather-icon">${this.getWeatherIcon()}</div>
        <div part="weather-info">
          <p part="location">${location}</p>
          <div part="temp-container">
            <span part="temperature">${temperature}°C</span>
            <span part="condition">${condition}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('weather-time', WeatherTime);
