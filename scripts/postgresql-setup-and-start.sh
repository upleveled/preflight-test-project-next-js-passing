#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

echo "Setting up PostgreSQL..."
mkdir /run/postgresql
chown postgres:postgres /run/postgresql
mkdir /var/lib/postgresql/data
# Only allow postgres user access to data directory
chmod 0700 /var/lib/postgresql/data
chown postgres:postgres /var/lib/postgresql/data
su - postgres -c "initdb -D /var/lib/postgresql/data"
# Log to syslog, which is rotated (older logs are
# automatically deleted)
sed "/^[# ]*log_destination/clog_destination = 'syslog'" -i /var/lib/postgresql/data/postgresql.conf

echo "Starting PostgreSQL..."
su - postgres -c "pg_ctl start -D /var/lib/postgresql/data"

echo "Creating database, user and schema..."
psql -U postgres postgres << SQL
  CREATE DATABASE $PGDATABASE;
  CREATE USER $PGUSERNAME WITH ENCRYPTED PASSWORD '$PGPASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $PGDATABASE TO $PGUSERNAME;
  \\connect $PGDATABASE;
  CREATE SCHEMA $PGUSERNAME AUTHORIZATION $PGUSERNAME;
SQL
