# Node.js shop (Express + Sequelize)

Applicazione di esempio con Express, EJS e Sequelize (MySQL).

## Requisiti

- Node.js (versione LTS consigliata)
- Docker e Docker Compose (opzionale, per MySQL e strumenti di gestione DB)

## Comandi di base (Node / npm)

| Comando | Descrizione |
|--------|-------------|
| `npm install` | Installa le dipendenze elencate in `package.json`. |
| `npm start` | Avvia l’app con `nodemon` (riavvio automatico su modifiche). |
| `npm test` | Script di test (placeholder nel progetto). |

Avvio manuale senza script npm:

```bash
node app.js
```

L’app espone il server sulla porta **3000** (vedi `app.js`). URL locale: **http://localhost:3000**

---

## Docker (MySQL, Adminer, CloudBeaver)

Dalla root del progetto:

| Comando | Descrizione |
|--------|-------------|
| `docker compose up -d` | Avvia i servizi in background. |
| `docker compose down` | Ferma e rimuove i container (i volumi con i dati possono restare). |
| `docker compose down -v` | Come sopra e rimuove anche i volumi (attenzione: dati DB persi). |
| `docker compose logs -f` | Log in tempo reale di tutti i servizi. |
| `docker compose ps` | Stato dei container. |

Credenziali e nomi dei servizi sono definiti in `docker-compose.yml`. Non committare segreti reali: usa variabili d’ambiente o file esclusi da Git in ambienti di produzione.

### Interfacce web (localhost)

Avviato lo stack con `docker compose up -d`:

| Servizio | URL |
|----------|-----|
| **Adminer** | http://localhost:8080 |
| **CloudBeaver** | http://localhost:8082 |

- **MySQL** dal computer host: host `127.0.0.1` o `localhost`, porta **3306** (come da `docker-compose.yml`).

In Adminer, alla prima connessione scegli il sistema **MySQL**, inserisci server, utente e password coerenti con `docker-compose.yml` e il nome del database configurato lì.

---

## Composer (PHP)

Questo repository è basato su **Node.js**. La sezione seguente è utile se lavori anche su progetti PHP o strumenti che usano **Composer** (gestore dipendenze PHP).

| Comando | Descrizione |
|--------|-------------|
| `composer install` | Installa le dipendenze da `composer.lock` (o da `composer.json` se lock assente). |
| `composer update` | Aggiorna le dipendenze secondo i vincoli in `composer.json` e rigenera il lock. |
| `composer require nome/pacchetto` | Aggiunge una dipendenza e aggiorna `composer.json` / `composer.lock`. |
| `composer require --dev nome/pacchetto` | Aggiunge una dipendenza solo per sviluppo. |
| `composer remove nome/pacchetto` | Rimuove un pacchetto. |
| `composer dump-autoload` | Rigenera l’autoload PSR-4 / classmap. |
| `composer validate` | Verifica la sintassi di `composer.json`. |
| `composer outdated` | Elenca pacchetti con aggiornamenti disponibili. |

Installazione globale di Composer (esempio su ambienti Unix; su Windows si usano installer ufficiale o `php composer.phar`):

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Per dettagli aggiornati: [getcomposer.org](https://getcomposer.org/).

---

## Licenza

Vedi `package.json` (`license`).
