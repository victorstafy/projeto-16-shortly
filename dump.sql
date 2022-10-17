--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://github.com/', 'o-OUyk06', 2, '2022-10-17 15:30:51');
INSERT INTO public.urls VALUES (2, 'https://bootcampra.notion.site/Projeto-Shortly-API-21533489cd5042058524caf3429b62e4', 'oo2AULwY', 2, '2022-10-17 15:32:13');
INSERT INTO public.urls VALUES (4, 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1', '6xPaXCN6', 3, '2022-10-17 15:34:03');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'victor0', 'victor11@driven.com.br', '$2b$12$KACZ/5HkAn.ru8dJ0ijX1e5ao0zXtDXP9T.5XykOYa0Acy1OT8fWy', '2022-10-17 15:28:38');
INSERT INTO public.users VALUES (2, 'victor1', 'victor0@driven.com.br', '$2b$12$B5vn/CW75xNDo1TTpYTGieh.DaF6MqxT.SW5rX/5oe6sDEeCLnp1.', '2022-10-17 15:29:01');
INSERT INTO public.users VALUES (3, 'victor2', 'victor1@driven.com.br', '$2b$12$HdUNCpYd5E/lQLlSy2mlZuc8Med.w8wsh6kcIG1Cyq8hPe6BcPMUe', '2022-10-17 15:29:06');
INSERT INTO public.users VALUES (4, 'victor3', 'victor2@driven.com.br', '$2b$12$7IsmaBWpAQRTLMFZvrET1e36Q0qBhREm5x1smzk8N0Tqm0Qpy.6DC', '2022-10-17 15:29:12');
INSERT INTO public.users VALUES (5, 'victor4', 'victor3@driven.com.br', '$2b$12$kC.pgqqU4JDWUo3d.xy/JuoUFhTeRTiYTKC1EvCKjavB0qNbQvJWW', '2022-10-17 15:29:17');
INSERT INTO public.users VALUES (6, 'victor5', 'victor4@driven.com.br', '$2b$12$eQdMBVc747z2AaDwo0/wkuWOUC0vFH6jy/YrFbo4HwOk.K2f2CDTe', '2022-10-17 15:29:23');
INSERT INTO public.users VALUES (7, 'victor6', 'victor5@driven.com.br', '$2b$12$tO.LwRvn6U58gb7k/tYMnus/EazRUlRPYGXBTvd46cu2zcjVo7VS6', '2022-10-17 15:29:29');
INSERT INTO public.users VALUES (8, 'victor7', 'victor6@driven.com.br', '$2b$12$HtTsfV7fozA46uguYM9VH.LJ5DLw2m6KqXqzDL5bHOW46q4lrngPq', '2022-10-17 15:29:36');
INSERT INTO public.users VALUES (9, 'victor8', 'victor7@driven.com.br', '$2b$12$GViEddT3OveP8rvomdnoY.lt.5nudzzGPSIBeJ/tQc2lQgVGBorZ.', '2022-10-17 15:29:41');
INSERT INTO public.users VALUES (10, 'victor9', 'victor8@driven.com.br', '$2b$12$tRls17S86M7KMAwkHteLIu/vkbMC4wRg1vVvOXBvGmAqB5/5M9FbW', '2022-10-17 15:29:48');
INSERT INTO public.users VALUES (11, 'victor10', 'victor9@driven.com.br', '$2b$12$5hdYF4JXMdtZ1c70ih9ooOqMrDuheACt36250kvxX0YIr92JKycv6', '2022-10-17 15:29:53');
INSERT INTO public.users VALUES (12, 'victor11', 'victor10@driven.com.br', '$2b$12$/pTK8GLbGbXbRVLL4oS78OibccWet/oWye7EvQw7SQpwr1Ly1cxp6', '2022-10-17 15:29:57');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (1, 1, '2022-10-17 15:31:47');
INSERT INTO public.visits VALUES (2, 1, '2022-10-17 15:31:52');
INSERT INTO public.visits VALUES (3, 1, '2022-10-17 15:31:53');
INSERT INTO public.visits VALUES (4, 2, '2022-10-17 15:32:37');
INSERT INTO public.visits VALUES (5, 2, '2022-10-17 15:32:41');
INSERT INTO public.visits VALUES (10, 4, '2022-10-17 15:34:22');
INSERT INTO public.visits VALUES (11, 4, '2022-10-17 15:34:23');
INSERT INTO public.visits VALUES (12, 4, '2022-10-17 15:34:24');
INSERT INTO public.visits VALUES (13, 4, '2022-10-17 15:34:26');
INSERT INTO public.visits VALUES (14, 4, '2022-10-17 15:34:28');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 14, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- PostgreSQL database dump complete
--

