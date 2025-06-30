#!/bin/sh

# Substitui as variáveis de ambiente do GitLab nas configurações
if [ ! -z "$DATABASE_URL" ]; then
  sed -i "s|^DATABASE_URL=.*|DATABASE_URL=${DATABASE_URL}|g" .env
fi

if [ ! -z "$JWT_SECRET" ]; then
  sed -i "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|g" .env
fi

echo "Executa o comando original: $@"
# Executar o comando passado para o container
exec "$@"