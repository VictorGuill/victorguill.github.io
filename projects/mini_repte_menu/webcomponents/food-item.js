import { addFood } from "../app.js";

class FoodItem extends HTMLElement {
  nombre = "";
  descripcion = "";
  precio = "";
  imgpath = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").onclick = (e) => addFood(this);
  }

  static get observedAttributes() {
    return ["nombre", "precio", "descripcion", "imgpath"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "nombre":
        this.nombreElement.textContent = newValue || "";
        break;
      case "precio":
        this.precioElement.textContent = newValue + "€" || "";
        break;
      case "descripcion":
        this.descElement.textContent = newValue || "";
        break;
      case "imgpath":
        this.imgElement.setAttribute("src", "./assets/" + newValue || "");
        break;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
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
          margin: 0px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        
          flex-direction: column;
        }
        
        img {
          height: 100%;
          object-fit: cover;
          width: 150px;
          border-right: 1px solid #242444;
          border-radius: 8px 0 0 8px;
        }
        
        h2,
        h5,
        p,
        button {
          /* Margin reset */
          margin: 0;
        }
        
        h2 {
          margin-bottom: 5px;
        }
        
        h5 {
          font-size: 1.4rem;
        }
        
        p {
          margin-bottom: 15px;
        }
        
        button {
          padding: 10px;
          bottom: 10px;
          right: 10px;
          cursor: pointer;
          border-radius: 8px;
          background: none;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-weight: bold;
          transition: transform 0.1s ease-in-out;
        }
        
        button:hover {
          background: #242444;
          color: white;
          transform: scale(1.05);
        }
        
        button:active {
          transform: scale(0.95);
        }
        
        .price_add {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        @media (max-width: 550px) {
          .wrapper {
            flex-direction: column;
          }
          img {
            width: 100%;
            border-radius: 8px 8px 0 0;
            border-bottom: 1px solid #242444;
          }
          .wrapper div:nth-child(2) {
            width: 90%;
          }
          .price_add {
            margin-bottom: 10px;
          }
          h2 {
            margin-top: 10px;
          }
        }
      </style>

        <div class="wrapper">
          <div>
            <img src="${this.imgpath}">
          </div>
          <div>
            <h2>${this.nombre}</h2>
            <p>${this.descripcion}</p>
            <div class="price_add">
              <h5>${this.precio}</h5>
              <button>AFEGIR</button>
            </div>
          </div>
        </div>`;

    this.nombreElement = this.shadowRoot.querySelector("h2");
    this.descElement = this.shadowRoot.querySelector("p");
    this.precioElement = this.shadowRoot.querySelector("h5");
    this.imgElement = this.shadowRoot.querySelector("img");
  }
}

customElements.define("food-item", FoodItem);
