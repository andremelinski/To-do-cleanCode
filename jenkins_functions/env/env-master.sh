TYPEORM_CONNECTION=postgres
TYPEORM_HOST=db # TODO: usa pra prod
# TYPEORM_HOST=localhost # TODO: usa pra dev
TYPEORM_DATABASE=task
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=root
TYPEORM_PORT=5432
PORT=3000

# informa o type como ele vai lidar com a migration
TYPEORM_ENTITIES=src/shared/typeorm/entities/*.model.{js,ts}
TYPEORM_ENTITIES_DIR=src/shared/typeorm/entities
TYPEORM_MIGRATIONS=src/shared/typeorm/migrations/*.{js,ts}
TYPEORM_MIGRATIONS_DIR=src/shared/typeorm/migrations