-- Table: public.VinylRecords

-- DROP TABLE IF EXISTS public."VinylRecords";

CREATE TABLE IF NOT EXISTS public."VinylRecords"
(
    "RecordId" integer NOT NULL DEFAULT nextval('"VinylRecords_RecordId_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default",
    artist character varying(255) COLLATE pg_catalog."default",
    genre character varying(255) COLLATE pg_catalog."default",
    "ReleaseYear" integer,
    label character varying(255) COLLATE pg_catalog."default",
    condition character varying(255) COLLATE pg_catalog."default",
    price money,
    "Description" text COLLATE pg_catalog."default",
    CONSTRAINT "VinylRecords_pkey" PRIMARY KEY ("RecordId")
)

TABLESPACE pg_default;
