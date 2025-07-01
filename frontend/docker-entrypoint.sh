#!/bin/sh

set -e

echo "Executa o comando original: $@"
exec "$@"
