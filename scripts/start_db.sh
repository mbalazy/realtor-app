docker compose stop postgres_db
docker compose rm postgres_db
docker compose run -p='5432:5432' -d postgres_db
