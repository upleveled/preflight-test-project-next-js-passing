#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

echo "Setting up PostgreSQL on Alpine Linux..."

# Create data directory
export PGDATA=/var/lib/postgresql/data
mkdir "$PGDATA"

# If the project has more environment variables then PGHOST, PGDATABASE, PGUSERNAME and PGPASSWORD, add them to the Array below
# e.g. echo '[ "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET" ]'
echo "PREFLIGHT_ENVIRONMENT_VARIABLES:"
echo '[]'

# Only allow postgres user access to data directory
chmod 0700 "$PGDATA"

# Initialize database in data directory
initdb -D "$PGDATA"

# Log to syslog, which is rotated (older logs automatically deleted)
sed "/^[# ]*log_destination/clog_destination = 'syslog'" -i "$PGDATA/postgresql.conf"

echo "Starting PostgreSQL..."
pg_ctl start --pgdata="$PGDATA" --log="/tmp/postgresql-server-start.log"
sleep 1
cat "/tmp/postgresql-server-start.log"

echo "Creating database, user and schema..."
psql -U postgres postgres << SQL
  CREATE DATABASE $PGDATABASE;
  CREATE USER $PGUSERNAME WITH ENCRYPTED PASSWORD '$PGPASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $PGDATABASE TO $PGUSERNAME;
  \\connect $PGDATABASE;
  CREATE SCHEMA $PGUSERNAME AUTHORIZATION $PGUSERNAME;
SQL
