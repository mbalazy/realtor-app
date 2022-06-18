docker compose down postgres_db
docker compose run -p='5432:5432' --rm -d postgres_db
