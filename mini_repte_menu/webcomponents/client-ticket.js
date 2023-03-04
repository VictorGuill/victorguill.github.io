class ClientTicket extends HTMLElement {
  precio = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").onclick = () =>
      alert(this.precioElement.textContent);
  }

  static get observedAttributes() {
    return ["precio"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "precio":
        this.precioElement.textContent = "Total: " + newValue + "€" || "";
        break;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
        * {
          margin: 0;
          box-sizing: border-box;
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        
        div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        
          flex-direction: column;
        }
        
        h4 {
          font-size: 2rem;
          color: white;
          background-color: black;
          padding: 20px;
          width: 100%;
          border-radius: 6px 6px 0 0;
        }
        
        button {
          font-size: 1.4rem;
          width: calc(100% - 20px);
          height: 70px;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          margin-bottom: 10px;
          background: #242444;
          color: white;
          font-weight: 500;
          transition: transform 0.1s ease-int-out;
        }
        
        button:hover {
          border: 3px solid #242444;
          background: none;
          color: #242444;
          font-weight: 700;
        }
        
        button:active {
          transform: scale(0.95);
        }
        
        section {
          min-height: 10px;
          width: calc(100% - 20px);
        }      
      </style>

      <div>
        <h4>TICKET 🤌</h4>
        <section></section>
        <button>${this.precio}</button>
      </div>`;

    this.precioElement = this.shadowRoot.querySelector("button");
  }
}

customElements.define("client-ticket", ClientTicket);
