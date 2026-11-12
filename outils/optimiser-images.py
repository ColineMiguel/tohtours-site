"""Crée les versions web des photos (WebP 800 px et 1600 px) dans assets/img/.

Usage : python3 outils/optimiser-images.py
Les originaux restent dans images/. Relancer le script après avoir ajouté une photo.
"""
from pathlib import Path
from PIL import Image, ImageOps

RACINE = Path(__file__).resolve().parent.parent
SOURCE = RACINE / "images"
CIBLE = RACINE / "assets" / "img"
LARGEURS = (800, 1600)

CIBLE.mkdir(parents=True, exist_ok=True)
for photo in sorted(SOURCE.rglob("*.jpg")):
    im = ImageOps.exif_transpose(Image.open(photo)).convert("RGB")
    for largeur in LARGEURS:
        sortie = CIBLE / f"{photo.stem}-{largeur}.webp"
        if sortie.exists() and sortie.stat().st_mtime > photo.stat().st_mtime:
            continue
        copie = im.copy()
        if copie.width > largeur:
            copie = copie.resize((largeur, round(copie.height * largeur / copie.width)), Image.LANCZOS)
        copie.save(sortie, "WEBP", quality=72, method=6)

logo = Image.open(SOURCE / "logo" / "logo-toh-tours.png")
for largeur in (320, 640):
    l = logo.copy()
    l = l.resize((largeur, round(l.height * largeur / l.width)), Image.LANCZOS)
    l.save(CIBLE / f"logo-toh-tours-{largeur}.webp", "WEBP", quality=90, method=6)
    l.save(CIBLE / f"logo-toh-tours-{largeur}.png", optimize=True)
print("Images prêtes dans", CIBLE)
