<?php
// Terminanfrage-Formular – läuft auf Hostpoint (PHP). Auf GitHub Pages (Testversion) nicht aktiv.
// Empfänger-Adresse hier eintragen, sobald die E-Mail eingerichtet ist:
$TO = 'termin@serenalux.ch';

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false]); exit; }
if (!empty($_POST['website'])) { echo json_encode(['ok'=>true]); exit; } // Spam-Falle

function f($k){ return trim(str_replace(["\r","\n"],' ', (string)($_POST[$k] ?? ''))); }
$weg = f('weg') === 'selbstzahler' ? 'Selbstzahler' : (f('weg') === 'zuweisung' ? 'Mit Zuweisung' : '');
$name = f('name'); $email = f('email'); $tel = f('telefon');
if ($weg === '' || $name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $tel === '' || f('datenschutz') !== 'ja') {
  echo json_encode(['ok'=>false,'error'=>'Pflichtfelder fehlen']); exit;
}
$body = "Neue Terminanfrage über die Website\n\n"
  ."Weg: $weg\nName: $name\nGeburtsdatum: ".f('geburtsdatum')."\nTelefon: $tel\nE-Mail: $email\n"
  ."Wunschtermine: ".f('wunschtermine')."\n\nAnliegen:\n".trim((string)($_POST['anliegen'] ?? ''))."\n";
$headers = "From: Website <no-reply@serenalux.ch>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";
$ok = mail($TO, '=?UTF-8?B?'.base64_encode("Terminanfrage: $name ($weg)").'?=', $body, $headers);
echo json_encode(['ok'=>(bool)$ok]);
