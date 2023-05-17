window.addEventListener("DOMContentLoaded", (event) => {
  window.addEventListener("click", (e) => {
    console.log(e);
    if (e.path[0].id === "roblox_head") {
      alert("Has clickat a la imatge amb ID: " + e.path[0].id);
    } else if (e.path[0].id === "btn1") {
      alert("Has clickat al botó amb ID: " + e.path[0].id);
    }
  });
});
