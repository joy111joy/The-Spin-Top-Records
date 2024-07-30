-- Database: SpinTop

-- DROP DATABASE IF EXISTS "SpinTop";

CREATE DATABASE "SpinTop"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = True;

COMMENT ON DATABASE "SpinTop"
    IS 'This database is for the website search engine for Spin Top Records';