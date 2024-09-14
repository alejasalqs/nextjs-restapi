# Development
Pasos para levantar la app en dev

1. levantar la base de datos
```
docker compose up -d 
```
2. Renombrar el archivo .env.template por .env
3. Reemplazar los valores de conextion del url

## Prisma commands
```
npx prisma init

npx prisma migrate dev

npx prisma generate
```

# Stage

# Prod