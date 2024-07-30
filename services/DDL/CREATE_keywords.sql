-- Table: public.keywords

-- DROP TABLE IF EXISTS public.keywords;

CREATE TABLE IF NOT EXISTS public.keywords
(
    keyword_id bigint NOT NULL DEFAULT nextval('keywords_keyword_id_seq'::regclass),
    login_id integer NOT NULL,
    keywords character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_updated timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT keyword_id PRIMARY KEY (keyword_id),
    CONSTRAINT login_id FOREIGN KEY (login_id)
        REFERENCES public.logins (login_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.keywords
    OWNER to postgres;