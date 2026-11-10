# Serena Lux – Website (Testversion)

Statische Website für Schmerzmedizin & Injektionstherapie in Basel.

## Aufbau
- `index.html` – Startseite (Schmerzmedizin, Stufenkonzept, Methoden, Forschung, Ablauf & Kosten, Über mich, Termin)
- `aesthetik.html` – Ästhetik mit Preisliste
- `impressum.html`, `datenschutz.html`
- `send.php` – Formularversand (nur auf Hostpoint aktiv, nicht auf GitHub Pages)
- `assets/css/style.css` – Farben und Schriften zentral in `:root`
- `assets/img/logo-mark.svg` – Platzhalter-Logo (einfach ersetzen)
- `assets/video/` – Videos aus Google Flow hier ablegen:
  `hero.mp4`, `ultraschall.mp4`, `botulinumtoxin.mp4`, `prp.mp4`, `hyaluron.mp4`

## Offen vor dem Livegang
- Name und Logo final
- Foto für «Über mich» (`assets/img/portrait.jpg`)
- E-Mail-Adresse (in `send.php`, Impressum, Datenschutz)
- UID der JMK Medizin AG im Impressum
- Stripe-Zahlungslink fürs Depot
- `noindex` entfernen, Domain verbinden (Hostpoint)
- Rechtliche Prüfung der Texte (Heilmittelwerbung)
