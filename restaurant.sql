--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Homebrew)
-- Dumped by pg_dump version 15.8 (Homebrew)

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
-- Name: customer; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    c_name character varying(50) NOT NULL,
    allergies character varying(50),
    pastreservation timestamp without time zone,
    upcomingreservation timestamp without time zone,
    phonenumber character varying(15) NOT NULL
);


ALTER TABLE public.customer OWNER TO shiva;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: shiva
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO shiva;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shiva
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- Name: login; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.login (
    customer_id integer NOT NULL,
    login_id character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);


ALTER TABLE public.login OWNER TO shiva;

--
-- Name: login_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: shiva
--

CREATE SEQUENCE public.login_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_customer_id_seq OWNER TO shiva;

--
-- Name: login_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shiva
--

ALTER SEQUENCE public.login_customer_id_seq OWNED BY public.login.customer_id;


--
-- Name: party; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.party (
    customer_id integer NOT NULL,
    party_id integer NOT NULL,
    additionalallergies character varying(100),
    size integer NOT NULL,
    no_children integer,
    handicapped character varying(100),
    indoor_outdoor character varying(20)
);


ALTER TABLE public.party OWNER TO shiva;

--
-- Name: party_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: shiva
--

CREATE SEQUENCE public.party_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_customer_id_seq OWNER TO shiva;

--
-- Name: party_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shiva
--

ALTER SEQUENCE public.party_customer_id_seq OWNED BY public.party.customer_id;


--
-- Name: party_party_id_seq; Type: SEQUENCE; Schema: public; Owner: shiva
--

CREATE SEQUENCE public.party_party_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_party_id_seq OWNER TO shiva;

--
-- Name: party_party_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shiva
--

ALTER SEQUENCE public.party_party_id_seq OWNED BY public.party.party_id;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.rating (
    restaurantid integer NOT NULL,
    vote_count integer,
    average_rating double precision
);


ALTER TABLE public.rating OWNER TO shiva;

--
-- Name: reservation; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.reservation (
    reservationid integer NOT NULL,
    restaurantid integer,
    party_id integer,
    table_number integer,
    reservation_date timestamp without time zone,
    status character varying(20),
    payment_method character varying(20)
);


ALTER TABLE public.reservation OWNER TO shiva;

--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: shiva
--

CREATE TABLE public.restaurant (
    restaurantid integer NOT NULL,
    r_name character varying(50),
    address character varying(100),
    cuisine_type character varying(100),
    website character(2048),
    accessibility character varying(50)
);


ALTER TABLE public.restaurant OWNER TO shiva;

--
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- Name: login customer_id; Type: DEFAULT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.login ALTER COLUMN customer_id SET DEFAULT nextval('public.login_customer_id_seq'::regclass);


--
-- Name: party customer_id; Type: DEFAULT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.party ALTER COLUMN customer_id SET DEFAULT nextval('public.party_customer_id_seq'::regclass);


--
-- Name: party party_id; Type: DEFAULT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.party ALTER COLUMN party_id SET DEFAULT nextval('public.party_party_id_seq'::regclass);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.customer (customer_id, c_name, allergies, pastreservation, upcomingreservation, phonenumber) FROM stdin;
2	Jane Smith	None	2024-10-10 20:30:00	2024-11-15 20:30:00	555-5678
3	Emily Johnson	Gluten	2024-10-05 18:00:00	2024-10-25 18:00:00	555-8765
4	Michael Brown	Dairy	\N	2024-10-20 19:45:00	555-4321
5	Sophia Davis	None	\N	2024-12-05 17:30:00	555-9101
6	Chris Taylor	None	2024-01-03 17:30:00	2024-11-30 18:30:00	555-6789
7	Laura Wilson	Peanuts	\N	2024-11-12 19:00:00	555-7890
8	James Lee	Seafood	2023-11-28 20:00:00	2024-11-28 20:00:00	555-2345
9	Olivia Harris	Gluten	2024-10-01 18:15:00	2024-12-10 18:15:00	555-9876
10	David Martinez	Dairy, Peanuts	\N	2024-10-22 21:00:00	555-1357
1	TestONE	Peanuts,Gluten,Dairy	2024-10-15 19:00:00	2024-11-02 19:00:00	123-654
375	Thomas Beckett	\N	\N	\N	333-333-3333
848	Shiva Rudra	\N	\N	\N	333-333-3334
993	Shiva Rudra	Gluten	\N	\N	333-333-3334
343	Bob Joe	Gluten allergies	\N	\N	433-333-3334
958	Joe Bob	Gluten	\N	\N	433-344-3334
\.


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.login (customer_id, login_id, password) FROM stdin;
1	johndoe1	password123
2	janesmith1	mypassword
3	emilyj	glutenfree
4	michaelb	brownie123
5	sophiad	sophiaD1
6	chrismt	chris123
7	lauraw	laura321
8	jamesl	seajames1
9	oliviah	olivia567
10	davemart	david4321
1	tbeck	tb1
993	srudra	sr1
343	bobjoe	bobj1
958	joebob	joeb1
\.


--
-- Data for Name: party; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.party (customer_id, party_id, additionalallergies, size, no_children, handicapped, indoor_outdoor) FROM stdin;
2	3491728	Gluten-Free Options	6	3	Yes	Outdoor
3	4572639	Peanut Allergy	2	0	No	Indoor
4	5298471	None	8	4	No	Outdoor
5	6147382	Dairy-Free	3	1	Yes	Indoor
6	7219634	Nut-Free	5	2	No	Outdoor
7	8357294	None	7	3	No	Indoor
8	9462813	Gluten-Free	10	5	Yes	Outdoor
9	1058497	Egg-Free	2	0	Yes	Indoor
10	1165378	Dairy-Free	9	4	No	Outdoor
1	2468912	Nut-Free, Dairy-Free	4	2	No	Indoor
993	14	None	1	0	No	Indoor
993	15	None	1	0	No	Indoor
993	16	None	4	2	Yes	Outdoor
993	17	None	4	2	Yes	Outdoor
993	18	None	2	0	No	Indoor
343	19	Gluten	4	2	Yes	Outdoor
958	20	Gluten	5	3	Yes	Outdoor
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.rating (restaurantid, vote_count, average_rating) FROM stdin;
39898	4000	4.3
93678	1100	4.6
42001	912	4.6
66572	3300	4.5
72683	2600	4.7
20986	1500	4
33898	259	3.9
10636	2800	4
95853	1200	4.1
72928	611	4.5
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.reservation (reservationid, restaurantid, party_id, table_number, reservation_date, status, payment_method) FROM stdin;
984436	33898	1058497	1	2024-11-02 19:00:00	Confirmed	Credit Card
3380961	95853	1058497	2	2024-11-15 20:30:00	Pending	PayPal
9061593	39898	1165378	3	2024-10-25 18:00:00	Cancelled	Cash
6121009	20986	8357294	4	2024-10-20 19:45:00	Confirmed	Debit Card
3881954	93678	7219634	5	2024-12-05 17:30:00	Confirmed	Credit Card
8687472	42001	6147382	6	2024-10-31 18:15:00	Pending	Cash
754798	72683	5298471	7	2024-12-10 19:00:00	Cancelled	Credit Card
4221753	66572	4572639	8	2024-11-28 20:00:00	Confirmed	PayPal
7823312	10636	3491728	9	2024-11-18 21:00:00	Pending	Debit Card
4898961	95853	2468912	10	2024-11-02 19:30:00	Confirmed	Credit Card
139	10636	14	3	2024-12-10 00:30:00	Pending	Credit
667	10636	16	8	2024-12-13 00:30:00	Pending	Credit
157	10636	18	15	2024-12-19 23:38:00	Pending	Debit
367	10636	19	19	2024-12-17 23:42:00	Pending	Debit
\.


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: shiva
--

COPY public.restaurant (restaurantid, r_name, address, cuisine_type, website, accessibility) FROM stdin;
72928	Burgers and Brews	761 Woodvalley Rd SW\nMableton, Georgia, 30126	American	burgersandbrews@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         	20 indoor, 5 outdoor
95853	Tacos and Taps	1146 W Horseshoe Dr NW\nBackus, Minnesota, 56435	Mexican	tacosandtaps@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	30 indoor, 10 outdoor
10636	Gourmet Cafe	28 Parker St\nQuinton, Alabama, 35130	French	gourmetcafe@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	10 indoor, 2 outdoor
33898	Fresh Greens	1610 S Court St\nVisalia, California, 93277	Japanese	freshgreens@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	18 indoor, 5 outdoor
20986	Wok This Way	1203 Redwood Ln\nGulf Breeze, Florida, 32563	Chinese	wokthisway@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              	40 indoor, 0 outdoor
72683	Brunch Bunch	885 Orlando Ave\nWest Hempstead, New York, 11552	Italian	brunchbunch@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	33 indoor, 10 outdoor
66572	Spice of India	2206 W Azeele St\nTampa, Florida 33606	Indian	spiceofindia@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	10 indoor, 5 outdoor
42001	Gangnam Kitchen	203 E Walnut St\nBradford, Arkansas, 72020	Korean	gangnamkitchen@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	15 indoor, 3 outdoor
93678	Masala Oasis	1600 Airport Rd\nWaukesha, Wisconsin, 53188	Arabic	masalaoasis@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	13 indoor, 5 outdoor
39898	Authentic Pho	15506 Lourdes Dr\nHomer Glen, Illinois, 60491	Vietnamese	authentipho@usa.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	20 indoor, 10 outdoor
\.


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shiva
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 2, true);


--
-- Name: login_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shiva
--

SELECT pg_catalog.setval('public.login_customer_id_seq', 1, true);


--
-- Name: party_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shiva
--

SELECT pg_catalog.setval('public.party_customer_id_seq', 1, false);


--
-- Name: party_party_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shiva
--

SELECT pg_catalog.setval('public.party_party_id_seq', 20, true);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (login_id);


--
-- Name: party party_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.party
    ADD CONSTRAINT party_pkey PRIMARY KEY (party_id);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (restaurantid);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (reservationid);


--
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (restaurantid);


--
-- Name: login login_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: party party_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.party
    ADD CONSTRAINT party_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) ON DELETE CASCADE;


--
-- Name: reservation reservation_party_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_party_id_fkey FOREIGN KEY (party_id) REFERENCES public.party(party_id) ON DELETE CASCADE;


--
-- Name: reservation reservation_restaurantid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shiva
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_restaurantid_fkey FOREIGN KEY (restaurantid) REFERENCES public.restaurant(restaurantid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

