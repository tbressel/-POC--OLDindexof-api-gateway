# indexof-api-gateway
Listen in port 5000

## Microservices throught the API Gateway
- 5002 : user content API: contains the user content like memos etc.
- 5004 : user API: contains user information and role permissions rules
- 5006 : interface API (front office) : contains the interface for the front office
- subscriptions API : contains the subscriptions information
- cheatsheets API : contains the cheatsheets generator

## Start the API Gateway
pnpm run dev

## Starting Redis server
redis-server --port 6379