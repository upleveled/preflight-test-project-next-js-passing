#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

echo "Setting up PostgreSQL..."
su postgres -
# Home directory for postgres user
cd /var/lib/postgresql
mkdir data
# Only allow postgres user access to data directory
chmod 0700 /var/lib/postgresql/data
initdb -D /var/lib/postgresql/data
# Use /tmp for PostgreSQL UNIX socket to avoid recreating it
sed -i "s/unix_socket_directories = '\/run\/postgresql'/unix_socket_directories = '\/tmp'/" /var/lib/postgresql/data/postgresql.conf
# Log to syslog, which is rotated (older logs are
# automatically deleted)
sed "/^[# ]*log_destination/clog_destination = 'syslog'" -i /var/lib/postgresql/data/postgresql.conf

echo "Starting PostgreSQL..."
pg_ctl start -D /var/lib/postgresql/data &

echo "Creating database, user and schema..."
psql -h /tmp -U postgres postgres << SQL
  CREATE DATABASE $PGDATABASE;
  CREATE USER $PGUSERNAME WITH ENCRYPTED PASSWORD '$PGPASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $PGDATABASE TO $PGUSERNAME;
  \\connect $PGDATABASE;
  CREATE SCHEMA $PGUSERNAME AUTHORIZATION $PGUSERNAME;
SQL
