export POSTGRES_PASSWORD=root
export POSTGRES_DB=task

export TYPEORM_CONNECTION=postgres
export TYPEORM_HOST=db
export TYPEORM_DATABASE=task
export TYPEORM_USERNAME=postgres
export TYPEORM_PASSWORD=root
export TYPEORM_PORT=5432
export PORT=3000
export EXTERNAL_PORT=3000

export TYPEORM_ENTITIES=src/shared/typeorm/entities/*.model.{js,ts}
export TYPEORM_ENTITIES_DIR=src/shared/typeorm/entities
export TYPEORM_MIGRATIONS=src/shared/typeorm/migrations/*.{js,ts}
export TYPEORM_MIGRATIONS_DIR=src/shared/typeorm/migrations