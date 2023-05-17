import { PRIMERS, SEGONS, POSTRES, BEGUDES } from "./bd/info.js";

// #region NAVBAR INTERACTIU
const plats_container = document.getElementById("plats-container");
let navItems = document.querySelectorAll("#navigation ul li");

navItems.forEach((navLink) =>
  navLink.addEventListener("click", setActiveNavLink)
);

function setActiveNavLink(newSelection) {
  for (const item in navItems) {
    if (Object.hasOwnProperty.call(navItems, item)) {
      const navLink = navItems[item];
      navLink.removeAttribute("class", "link-active");

      if (navLink === newSelection.target) {
        newSelection.target.setAttribute("class", "link-active");
        loadMeals(newSelection.target.innerHTML);
      }
    }
  }
}

function loadMeals(number) {
  // Eliminem tots el plats del menu fins que no en quedi cap
  while (plats_container.firstChild) {
    plats_container.removeChild(plats_container.lastChild);
  }

  // Escollim el llistat de plats
  let meals;

  switch (number) {
    case "Primers🥗":
      meals = PRIMERS;
      break;
    case "Segons🍜":
      meals = SEGONS;
      break;
    case "Postres🍰":
      meals = POSTRES;
      break;
    case "Begudes🥤":
      meals = BEGUDES;
      break;
  }

  // Iterem el "json" i creem els plats corresponents
  for (const meal in meals) {
    const plat = document.createElement("food-item");

    plat.setAttribute("nombre", meals[meal].nombre);
    plat.setAttribute("precio", meals[meal].precio);
    plat.setAttribute("descripcion", meals[meal].descripcion);
    plat.setAttribute("imgPath", meals[meal].img);
    plat.setAttribute("base", meals[meal].precio);

    plats_container.appendChild(plat);
  }
}
//#endregion

//#region TICKET CONTROL
const ticket = document.querySelector("client-ticket");

// Afegim un plat al ticket o incrementem la seva quantitat
export function addFood(newItem) {
  // Selecionem tots els elements del ticket
  const allTicketItems = ticket.shadowRoot.querySelectorAll(
    "section ticket-item"
  );

  let addInDom = true;
  let totalPrice = 0;

  // Per cada item, si ja esta li afegim 1 de quantitat
  for (const item of allTicketItems) {
    if (item.getAttribute("nombre") === newItem.getAttribute("nombre")) {
      addInDom = false;

      const nuevaCantidad = parseInt(item.getAttribute("cantidad")) + 1;
      item.setAttribute("cantidad", nuevaCantidad);

      const precioBase = parseFloat(newItem.getAttribute("base"));
      item.setAttribute("precio", (precioBase * nuevaCantidad).toFixed(2));
    }

    totalPrice += parseFloat(item.getAttribute("precio"));
  }

  // Si no sa trobat el item al loop anterior (per tant, no s'ha afegit)
  // Afegim un element nou al ticket (ticket-item)
  if (addInDom) {
    const plat = document.createElement("ticket-item");

    plat.setAttribute("nombre", newItem.getAttribute("nombre"));
    plat.setAttribute("precio", newItem.getAttribute("precio"));
    plat.setAttribute("imgPath", newItem.getAttribute("imgPath"));
    plat.setAttribute("cantidad", 1);
    plat.setAttribute("base", newItem.getAttribute("base"));

    // Agefegim el plat a la section del component ticket
    ticket.shadowRoot.querySelector("section").appendChild(plat);

    totalPrice += parseFloat(newItem.getAttribute("precio"));
  }

  ticket.setAttribute("precio", totalPrice.toFixed(2));
}

// Eliminem un plat del menu o reduim la quantitat
export function removeFood(removeItem) {
  const allTicketItems = ticket.shadowRoot.querySelectorAll(
    "section ticket-item"
  );

  for (const item of allTicketItems) {
    // Quan trobem el item de la llista ⬇️
    if (item.getAttribute("nombre") === removeItem.getAttribute("nombre")) {
      const cantidad = parseInt(item.getAttribute("cantidad"));
      const precioBase = parseFloat(item.getAttribute("base"));

      // decidim si borrar o reduir quantitat
      if (cantidad > 1) {
        item.setAttribute("cantidad", cantidad - 1);
      } else {
        item.remove();
      }

      // Actualitzem el preu del plat al ticket
      const precioItemTotal = parseFloat(removeItem.getAttribute("precio"));
      removeItem.setAttribute(
        "precio",
        (precioItemTotal - precioBase).toFixed(2)
      );

      // Actualitzem el preu del ticket
      let precioActual = ticket.getAttribute("precio");
      ticket.setAttribute("precio", (precioActual - precioBase).toFixed(2));
    }
  }
}
//#endregion
