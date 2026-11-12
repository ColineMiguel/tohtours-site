// Toh Tours Yucatán : petit script partagé (menu mobile, activités à la carte)
(function () {
  // Menu mobile
  var bouton = document.querySelector(".entete__menu");
  var nav = document.getElementById("nav");
  if (bouton && nav) {
    bouton.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("est-ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
  }

  // Activités à la carte : la grande photo change selon l'activité survolée ou choisie
  var carte = document.querySelector("[data-carte]");
  if (!carte) return;
  var items = carte.querySelectorAll(".carte__item");
  var photos = carte.querySelectorAll(".carte__scene img");
  var survol = window.matchMedia("(hover: hover) and (min-width: 861px)");

  function activer(index) {
    items.forEach(function (item, i) {
      var actif = i === index;
      item.classList.toggle("est-active", actif);
      item.querySelector(".carte__bouton").setAttribute("aria-expanded", actif ? "true" : "false");
    });
    photos.forEach(function (photo, i) {
      photo.classList.toggle("est-active", i === index);
    });
  }

  items.forEach(function (item, i) {
    var b = item.querySelector(".carte__bouton");
    b.addEventListener("click", function () {
      // Sur téléphone, un second appui referme l'activité
      if (!survol.matches && item.classList.contains("est-active")) {
        item.classList.remove("est-active");
        b.setAttribute("aria-expanded", "false");
        return;
      }
      activer(i);
    });
    item.addEventListener("mouseenter", function () {
      if (survol.matches) activer(i);
    });
  });
})();
