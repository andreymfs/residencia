#!/bin/sh

set -e

# Substitui as variáveis de ambiente do GitLab nas configurações
if [ -f .env.production ]; then
    echo "Carregando variáveis do arquivo:.env.production"
    # Substitui variáveis do GitLab CI/CD
    # export $(cat .env.production | xargs)
    export $(grep -v '^#' .env.production | xargs)
else
    echo "Arquivo:.env.production não encontrado"
fi

echo "Executa o comando original: $@"
exec "$@"