-- Table: public.logins

-- DROP TABLE IF EXISTS public.logins;

CREATE TABLE IF NOT EXISTS public.logins
(
    login_id integer NOT NULL,
    username character varying(12) COLLATE pg_catalog."default" NOT NULL,
    password character varying(80) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    uuid uuid NOT NULL,
    last_updated timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT login_id PRIMARY KEY (login_id),
    CONSTRAINT email UNIQUE (email)
        INCLUDE(email),
    CONSTRAINT username UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.logins
    OWNER to postgres;