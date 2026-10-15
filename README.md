# Hochzeitsanmeldung Tim & Becci

Statische Seite auf GitHub Pages. Die Anmeldungen landen in einem Google Sheet.

## 1. Google Sheet und Script einrichten

1. Ein neues Google Sheet anlegen, z. B. „Hochzeit Anmeldungen“.
2. **Erweiterungen → Apps Script** öffnen.
3. Den Inhalt von `Code.gs` hineinkopieren und speichern.
4. **Bereitstellen → Neue Bereitstellung**:
   - Typ: **Web-App**
   - Ausführen als: **Ich**
   - Zugriff: **Jeder**
5. Den Zugriff bestätigen. Google warnt bei eigenen Scripts, also „Erweitert → Zu … wechseln“ wählen.
6. Die **Web-App-URL** kopieren (endet auf `/exec`).

Der Tab „Anmeldungen“ mit Spaltenköpfen wird bei der ersten Anmeldung automatisch erstellt.

> Wenn du `Code.gs` später änderst: **Bereitstellen → Bereitstellungen verwalten → Bearbeiten → Version: Neue Version**. So bleibt die URL gleich.

## 2. Seite anpassen

In `index.html`:

- `SCRIPT_URL` auf die Web-App-URL setzen
- `FRIST` setzen, z. B. `"15.03.2027"`, oder leer lassen
- `ORT EINTRAGEN` ersetzen oder die Zeile löschen

## 3. Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen, z. B. `tim-und-becci`.
2. `index.html` hochladen. `Code.gs` muss **nicht** ins Repo.
3. **Settings → Pages → Source: Deploy from a branch → `main` / root**.
4. Nach ca. einer Minute ist die Seite unter `https://<dein-user>.github.io/tim-und-becci/` erreichbar.

Optional ist eine eigene Domain möglich, z. B. `tim-und-becci.de`, unter Settings → Pages → Custom domain.

## 4. Testen

Einmal mit Zusage und einmal mit Absage anmelden und prüfen, ob beide Zeilen im Sheet stehen. Danach die Testzeilen löschen.

## Auswertung

Die Spalte **Personen** zählt pro Antwort mit (0, 1 oder 2). Gesamtzahl der Gäste: `=SUMME(J:J)`.

Essen zählen, z. B. vegan:
`=ZÄHLENWENN(D:D;"Vegan")+ZÄHLENWENN(G:G;"Vegan")`

## Datenschutz

- Die Seite hat `noindex`, damit sie nicht bei Google auftaucht. Trotzdem kann jeder mit dem Link etwas eintragen.
- Allergien sind Gesundheitsdaten: Teilt das Sheet nur mit dem Brautpaar und dem Catering und löscht es nach der Feier.
