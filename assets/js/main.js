// Toh Tours Yucatán : petit script partagé
// (menu, apparitions, détails des circuits, activités à la carte, vos envies, défilement des avis)
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

  // Apparition progressive des sections et des cartes au défilement
  var aApparaitre = document.querySelectorAll("[data-apparition]");
  if ("IntersectionObserver" in window) {
    aApparaitre.forEach(function (el) {
      // Décalage léger entre éléments voisins (cartes d'une même rangée)
      var freres = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.hasAttribute("data-apparition"); });
      el.style.setProperty("--rang", Math.min(freres.indexOf(el), 3));
    });
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("est-visible"); observateur.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    aApparaitre.forEach(function (el) { observateur.observe(el); });
  } else {
    aApparaitre.forEach(function (el) { el.classList.add("est-visible"); });
  }

  // En-tête qui se resserre une fois la page défilée
  var entete = document.querySelector(".entete");
  if (entete) {
    var majEntete = function () { entete.classList.toggle("est-compacte", window.scrollY > 24); };
    window.addEventListener("scroll", majEntete, { passive: true });
    majEntete();
  }

  // Vos envies : la grande photo change selon l'envie survolée (ou touchée sur téléphone)
  document.querySelectorAll("[data-envies]").forEach(function (bloc) {
    var boutons = bloc.querySelectorAll(".envies__bouton");
    var vues = bloc.querySelectorAll(".envies__scene > *");
    var choisir = function (i) {
      boutons.forEach(function (b, j) { b.setAttribute("aria-pressed", i === j ? "true" : "false"); });
      vues.forEach(function (v, j) { v.classList.toggle("est-active", i === j); });
    };
    boutons.forEach(function (b, i) {
      b.addEventListener("click", function () { choisir(i); });
      b.addEventListener("mouseenter", function () { if (window.matchMedia("(hover: hover)").matches) choisir(i); });
      b.addEventListener("focus", function () { choisir(i); });
    });
    choisir(0);
  });

  // Itinéraire : la carte et la liste des étapes se répondent
  document.querySelectorAll("[data-itineraire]").forEach(function (bloc) {
    var etapes = bloc.querySelectorAll(".itin__etape");
    var marques = bloc.querySelectorAll(".itin__pin, .itin__point");
    var etiquette = bloc.querySelector(".itin__etiquette");
    bloc.querySelectorAll(".itin__pin").forEach(function (pin, i) { pin.style.setProperty("--i", i); });
    var choisir = function (n) {
      etapes.forEach(function (b) {
        var actif = b.dataset.etape === n;
        b.classList.toggle("est-actif", actif);
        b.setAttribute("aria-pressed", actif ? "true" : "false");
        if (actif && b.dataset.x) {
          etiquette.textContent = b.textContent.replace(/^\s*\d+\s*/, "");
          etiquette.style.setProperty("--ex", b.dataset.x + "%");
          etiquette.style.setProperty("--ey", b.dataset.y + "%");
        }
        if (actif) etiquette.classList.toggle("est-visible", !!b.dataset.x);
      });
      marques.forEach(function (m) { m.classList.toggle("est-actif", m.dataset.etape === n); });
    };
    etapes.forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { choisir(b.dataset.etape); });
      b.addEventListener("focus", function () { choisir(b.dataset.etape); });
      b.addEventListener("mouseenter", function () { if (window.matchMedia("(hover: hover)").matches) choisir(b.dataset.etape); });
    });
    bloc.querySelectorAll(".itin__pin").forEach(function (pin) {
      pin.addEventListener("click", function () { choisir(pin.dataset.etape); });
      pin.addEventListener("mouseenter", function () { choisir(pin.dataset.etape); });
    });
  });

  // Les avis ne défilent que lorsqu'ils sont à l'écran
  if ("IntersectionObserver" in window) {
    var obsAvis = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { e.target.classList.toggle("est-en-pause", !e.isIntersecting); });
    });
    document.querySelectorAll("[data-defilement]").forEach(function (b) { obsAvis.observe(b); });
  }
})();
