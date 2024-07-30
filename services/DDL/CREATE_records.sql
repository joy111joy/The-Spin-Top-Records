-- Table: public.records

-- DROP TABLE IF EXISTS public.records;

CREATE TABLE IF NOT EXISTS public.records
(
    record_id integer NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    artist character varying(255) COLLATE pg_catalog."default" NOT NULL,
    genre character varying COLLATE pg_catalog."default" NOT NULL,
    "ReleaseYear" integer NOT NULL,
    label character varying COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT record_id PRIMARY KEY (record_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.records
    OWNER to postgres;