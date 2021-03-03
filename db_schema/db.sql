--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.6

-- Started on 2021-03-03 20:35:05

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

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 24615)
-- Name: cloudinary_api; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cloudinary_api (
    key_id bigint NOT NULL,
    cloud_name text NOT NULL,
    api_key text NOT NULL,
    api_secret text NOT NULL
);


ALTER TABLE public.cloudinary_api OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24621)
-- Name: cloudinary_api_key_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cloudinary_api_key_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cloudinary_api_key_id_seq OWNER TO postgres;

--
-- TOC entry 2851 (class 0 OID 0)
-- Dependencies: 197
-- Name: cloudinary_api_key_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cloudinary_api_key_id_seq OWNED BY public.cloudinary_api.key_id;


--
-- TOC entry 198 (class 1259 OID 24623)
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    file_id bigint NOT NULL,
    file_name text NOT NULL,
    file_url text NOT NULL,
    file_image text NOT NULL,
    file_author text NOT NULL,
    file_album text
);


ALTER TABLE public.files OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 24629)
-- Name: files_file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_file_id_seq OWNER TO postgres;

--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 199
-- Name: files_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_file_id_seq OWNED BY public.files.file_id;


--
-- TOC entry 203 (class 1259 OID 24948)
-- Name: playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists (
    playlist_id bigint NOT NULL,
    playlist_owner text NOT NULL,
    playlist_name text NOT NULL
);


ALTER TABLE public.playlists OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 53285)
-- Name: playlists_musics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists_musics (
    playlist_id bigint NOT NULL,
    playlist_music_id bigint NOT NULL
);


ALTER TABLE public.playlists_musics OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24946)
-- Name: playlists_playlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.playlists_playlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.playlists_playlist_id_seq OWNER TO postgres;

--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 202
-- Name: playlists_playlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.playlists_playlist_id_seq OWNED BY public.playlists.playlist_id;


--
-- TOC entry 200 (class 1259 OID 24631)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_login text NOT NULL,
    user_password text NOT NULL,
    user_session_id text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 24637)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 2854 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2711 (class 2604 OID 24639)
-- Name: cloudinary_api key_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cloudinary_api ALTER COLUMN key_id SET DEFAULT nextval('public.cloudinary_api_key_id_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 24640)
-- Name: files file_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN file_id SET DEFAULT nextval('public.files_file_id_seq'::regclass);


--
-- TOC entry 2714 (class 2604 OID 24951)
-- Name: playlists playlist_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists ALTER COLUMN playlist_id SET DEFAULT nextval('public.playlists_playlist_id_seq'::regclass);


--
-- TOC entry 2713 (class 2604 OID 24641)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2716 (class 2606 OID 24643)
-- Name: cloudinary_api cloudinary_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cloudinary_api
    ADD CONSTRAINT cloudinary_primary_key PRIMARY KEY (key_id);


--
-- TOC entry 2718 (class 2606 OID 24645)
-- Name: files files_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_primary_key PRIMARY KEY (file_id);


--
-- TOC entry 2724 (class 2606 OID 24956)
-- Name: playlists playlists_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_primary_key PRIMARY KEY (playlist_id);


--
-- TOC entry 2720 (class 2606 OID 53289)
-- Name: users unique_user_session_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_user_session_id UNIQUE (user_session_id);


--
-- TOC entry 2722 (class 2606 OID 24647)
-- Name: users user_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_primary_key PRIMARY KEY (user_id);


-- Completed on 2021-03-03 20:35:05

--
-- PostgreSQL database dump complete
--

