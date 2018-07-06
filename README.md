# Boostwiki
## Development
Prepare `.env` file.
```
BASE_URL=http://localhost:3000

PORT=3000

GITHUB_CLIENT_ID=elided
GITHUB_CLIENT_SECRET=elided

SESSION_SECRET=elided
SESSION_REDIS_PORT=6379
SESSION_REDIS_HOST=localhost
SESSION_REDIS_DB=0

WS_SECRET=elided
WS_REDIS_PORT=6379

DB_URL=mongodb://localhost

ADMIN_PASSWORD=elided

CACHE_REDIS_PORT=6379
CACHE_REDIS_HOST=localhost
CACHE_REDIS_DB=1
```
Start mongodb and redis.

Run Script.
```
npm i
npm nun dev
```
## Test
Run Script.
```
npm run test
```
(watch)
```
npm run test:watch
```