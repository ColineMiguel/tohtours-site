// Toh Tours Yucatán : petit script partagé
// (menu mobile, détails des circuits, activités à la carte, défilement des avis)
(function () {
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Menu mobile
  var bouton = document.querySelector(".entete__menu");
  var nav = document.getElementById("nav");
  if (bouton && nav) {
    bouton.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("est-ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
  }

  // Circuits : « Voir les détails » déroule la description et le programme
  document.querySelectorAll(".circuit__basculer").forEach(function (b) {
    var zone = document.getElementById(b.getAttribute("aria-controls"));
    var libelle = b.querySelector("span");
    b.addEventListener("click", function () {
      var ouvert = zone.classList.toggle("est-ouvert");
      b.setAttribute("aria-expanded", ouvert ? "true" : "false");
      libelle.textContent = ouvert ? "Masquer les détails" : "Voir les détails";
    });
  });

  // Activités à la carte
  var carte = document.querySelector("[data-carte]");
  if (carte) {
    var items = carte.querySelectorAll(".carte__item");
    var photos = carte.querySelectorAll(".carte__scene img");
    var ordinateur = window.matchMedia("(min-width: 861px)");
    var survol = window.matchMedia("(hover: hover) and (min-width: 861px)");

    var montrer = function (index) {
      items.forEach(function (item, i) {
        var actif = i === index;
        item.classList.toggle("est-active", actif);
        item.querySelector(".carte__bouton").setAttribute("aria-expanded", actif ? "true" : "false");
      });
      photos.forEach(function (photo, i) {
        photo.classList.toggle("est-active", i === index);
      });
    };

    items.forEach(function (item, i) {
      item.querySelector(".carte__bouton").addEventListener("click", function () {
        // Un second appui referme l'activité (sauf sur ordinateur, où une photo reste affichée)
        if (item.classList.contains("est-active") && !ordinateur.matches) {
          montrer(-1);
        } else {
          montrer(i);
        }
      });
      item.addEventListener("mouseenter", function () {
        if (survol.matches) montrer(i);
      });
    });

    // Sur ordinateur, la première activité est ouverte pour que la grande photo ne soit pas vide.
    // Sur téléphone, tout est replié : seuls le titre et la durée s'affichent.
    if (ordinateur.matches) montrer(0);
  }

  // Avis : les cartes arrivent par la droite et défilent vers la gauche, en boucle
  document.querySelectorAll("[data-defilement]").forEach(function (bande) {
    if (reduit.matches) return;
    var piste = bande.querySelector(".avis__piste");
    var originales = Array.prototype.slice.call(piste.children);
    var copies = 0;
    // Dupliquer les avis jusqu'à couvrir deux fois la largeur de l'écran
    // (au moins une copie, pour que la boucle reprenne sans trou)
    while ((copies === 0 || piste.scrollWidth < window.innerWidth * 2 + 1000) && copies < 6) {
      originales.forEach(function (carteAvis) {
        var copie = carteAvis.cloneNode(true);
        copie.setAttribute("aria-hidden", "true");
        piste.appendChild(copie);
      });
      copies++;
    }
    // Le décalage correspond exactement à une série d'avis, pour une boucle sans saut
    var ecart = parseFloat(getComputedStyle(piste).columnGap) || 0;
    var serie = 0;
    originales.forEach(function (c) { serie += c.getBoundingClientRect().width + ecart; });
    piste.style.setProperty("--decalage", "-" + serie + "px");
    piste.style.setProperty("--duree", Math.round(serie / 30) + "s");
    bande.classList.add("est-anime");
  });
})();
