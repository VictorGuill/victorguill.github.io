import { removeFood } from "../app.js";
class TicketItem extends HTMLElement {
  nombre = "";
  precio = "";
  imgpath = "";
  cantidad = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").onclick = (e) => removeFood(this);
  }

  static get observedAttributes() {
    return ["nombre", "precio", "imgpath", "cantidad"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "nombre":
        this.nombreElement.textContent = newValue || "";
        break;
      case "precio":
        this.precioElement.textContent = newValue + "€" || "";
        break;
      case "imgpath":
        this.imgElement.setAttribute("src", "./assets/" + newValue || "");
        break;
      case "cantidad":
        this.cantidadElement.textContent = "x" + newValue || "";
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
        
        .wrapper {
          position: relative;
          display: flex;
          border: 1px solid #242444;
          border-radius: 8px;
          margin: 15px 0px;
        }
        .wrapper:hover {
          box-shadow: 0px 0px 0px 1px var(--cBlack);
        }
        
        .wrapper div:nth-child(2) {
          width: 100%;
          height: 75px;
          margin: 0px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .wrapper div:nth-child(1) {
          max-height: 75px;
        }
        
        img {
          height: 100%;
          object-fit: cover;
          width: 80px;
          border-right: 1px solid #242444;
          border-radius: 8px 0 0 8px;
        }
        
        h2 {
          font-size: 1.2rem;
        }
        
        h4 {
          opacity: 75%;
        }
        
        h3 {
          position: absolute;
          right: 10px;
          bottom: 50%;
          transform: translateY(50%);
        }
        
        button {
          width: 30px;
          height: 30px;
          position: absolute;
          right: -5px;
          top: -5px;
          padding: 0px;
          background-color: #242444;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button p {
          filter: brightness(10);
        }
        
        button:hover p {
          filter: brightness(0);
        }
        
        button:hover {
          background-color: red;
          border: 2px solid #242444;
        }
        
        @media (max-width: 550px) {
          h2 {
            font-size: 1.05rem;
          }
          h3 {
            font-size: 1rem;
          }
        }      
      </style>

      <div class="wrapper">
          <div>
              <img src="${this.imgpath}">
          </div>
          <div>
              <div>
                  <h2>${this.nombre}</h2>
                  <h4>${this.precio}</h4>
              </div>
              <h3>${this.cantidad}</h3>
          </div>
          <button>
            <p>❌</p>
          </button>
      </div>`;

    this.nombreElement = this.shadowRoot.querySelector("h2");
    this.precioElement = this.shadowRoot.querySelector("h4");
    this.cantidadElement = this.shadowRoot.querySelector("h3");
    this.imgElement = this.shadowRoot.querySelector("img");
  }
}

customElements.define("ticket-item", TicketItem);
