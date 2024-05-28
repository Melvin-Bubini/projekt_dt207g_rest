# Webbtjänst för projekt dt207g

# Beskrivning
Min Express Webbtjänst är en enkel API-tjänst byggd med Node.js och Express som erbjuder autentisering och CRUD-funktionalitet för att hantera menyalternativ för en restaurang.

# Installation
För att köra den här webbtjänsten lokalt på din dator behöver du följande:

Node.js och npm: Se till att du har Node.js installerat på din dator. Du kan ladda ner och installera den från Node.js officiella webbplats.

Klona repository: Klona detta repository till din lokala maskin genom att köra följande kommando i terminalen:

git clone <repository-url>
Installera dependencies: Navigera till den klonade mappen och installera projektets dependencies genom att köra följande kommando:

cd min-express-webbtjanst
npm install

# Konfiguration
Innan du kör webbtjänsten måste du konfigurera några miljövariabler i en .env-fil:

PORT: Portnummer där servern ska köras. Om inte angivet, används standardporten 3000.
DATABASE: MongoDB URI för att ansluta till din databas.
JWT_SECRET_KEY: En hemlig nyckel för att signera JWT-token för autentisering.

# Användning
När webbtjänsten är igång kan klienter interagera med den genom följande endpoints:

Authentisering Endpoints:
POST /api/auth/register: Registrera en ny användare.
POST /api/auth/login: Logga in och få en JWT-token.
Menyhantering Endpoints:
GET /api/items: Hämta alla menyalternativ.
GET /api/items/:id: Hämta ett specifikt menyalternativ efter ID.
POST /api/items: Lägg till ett nytt menyalternativ.
PUT /api/items/:id: Uppdatera ett befintligt menyalternativ.
DELETE /api/items/:id: Ta bort ett menyalternativ.

# Skyddad Route
GET /api/admin: En skyddad route som kräver en giltig JWT-token för att komma åt. Visar en välkomsthälsning med användarnamnet från JWT-token.