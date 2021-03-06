--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: Company; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Company" (
    comp_id integer NOT NULL,
    org_id integer,
    comp_name character varying,
    comp_tax_reg_no bigint,
    country_id integer,
    post_code integer,
    address_1 character varying,
    address_2 character varying,
    contact_no character varying
);


ALTER TABLE public."Company" OWNER TO byron;

--
-- Name: Countries; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Countries" (
    country_id integer NOT NULL,
    country_name character varying
);


ALTER TABLE public."Countries" OWNER TO byron;

--
-- Name: Department; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Department" (
    dep_id integer NOT NULL,
    div_id integer,
    dep_name character varying,
    dep_head integer,
    post_code integer,
    address_1 character varying,
    address_2 character varying,
    contact_no character varying,
    country_id integer
);


ALTER TABLE public."Department" OWNER TO byron;

--
-- Name: COLUMN "Department".dep_head; Type: COMMENT; Schema: public; Owner: byron
--

COMMENT ON COLUMN public."Department".dep_head IS 'employee_id';


--
-- Name: Division; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Division" (
    div_id integer NOT NULL,
    comp_id integer,
    div_name character varying,
    address_1 character varying,
    address_2 character varying,
    contact_no character varying,
    post_code integer,
    country_id integer
);


ALTER TABLE public."Division" OWNER TO byron;

--
-- Name: EmpQualification; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."EmpQualification" (
    qual_level character varying,
    qual_start_date date,
    qual_end_date date,
    qual_id integer NOT NULL
);


ALTER TABLE public."EmpQualification" OWNER TO byron;

--
-- Name: EmpRole; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."EmpRole" (
    employee_number integer NOT NULL,
    role_id integer,
    salary_id integer,
    reporting_line integer,
    dep_id integer NOT NULL,
    qual_id integer
);


ALTER TABLE public."EmpRole" OWNER TO byron;

--
-- Name: EmpSalary; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."EmpSalary" (
    salary_id integer NOT NULL,
    base_salary numeric,
    allowances numeric,
    max_bonus numeric,
    total_salary numeric
);


ALTER TABLE public."EmpSalary" OWNER TO byron;

--
-- Name: Employees; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Employees" (
    id integer NOT NULL,
    name character varying(30),
    surname character varying(30),
    birthdate date,
    employee_number integer NOT NULL,
    marital_status character varying,
    post_code integer,
    address_1 character varying,
    address_2 character varying,
    contact_no character varying,
    country_id integer
);


ALTER TABLE public."Employees" OWNER TO byron;

--
-- Name: Organization; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Organization" (
    org_id integer NOT NULL,
    org_name character varying,
    org_tax_reg_no bigint,
    post_code integer,
    address_1 character varying,
    address_2 character varying,
    contact_no character varying,
    country_id integer
);


ALTER TABLE public."Organization" OWNER TO byron;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: byron
--

CREATE TABLE public."Role" (
    role_id integer NOT NULL,
    role_name character varying,
    role_desc text
);


ALTER TABLE public."Role" OWNER TO byron;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: byron
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO byron;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: byron
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public."Employees".id;


--
-- Name: Employees id; Type: DEFAULT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Employees" ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Company" (comp_id, org_id, comp_name, comp_tax_reg_no, country_id, post_code, address_1, address_2, contact_no) FROM stdin;
1	1	Starlink SA	1884248755	1	4356	12 Anbury road	Pretoria	0124572344
2	1	Starlink Nigeria	7423546745	7	3421	4 Mamphud street	Lagos	33975178840
\.


--
-- Data for Name: Countries; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Countries" (country_id, country_name) FROM stdin;
1	South Africa
2	Australia
3	India
4	Canada
5	Japan
6	Spain
7	Nigeria
\.


--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Department" (dep_id, div_id, dep_name, dep_head, post_code, address_1, address_2, contact_no, country_id) FROM stdin;
1	1	Accounts	\N	2354	10 Pall mall crescent	Midrand	0114357865	1
2	2	Infrastructure	\N	1234	42 Fred street	Midrand	0125432367	1
\.


--
-- Data for Name: Division; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Division" (div_id, comp_id, div_name, address_1, address_2, contact_no, post_code, country_id) FROM stdin;
1	1	Finance	12 Anbury road	Pretoria	0123425743	4232	1
2	1	IT	12 Anbury road	Pretoria	0124356457	4232	1
3	2	IT	4 Mumphord road	Lagos	33245645765	3421	7
\.


--
-- Data for Name: EmpQualification; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."EmpQualification" (qual_level, qual_start_date, qual_end_date, qual_id) FROM stdin;
Bachelors	2017-02-01	2020-02-01	1
Masters	2016-02-01	2018-02-01	2
PhD	2009-02-01	2011-02-01	3
Bachelors	2008-02-01	2010-02-01	4
Masters	2015-02-01	2016-02-01	5
\.


--
-- Data for Name: EmpRole; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."EmpRole" (employee_number, role_id, salary_id, reporting_line, dep_id, qual_id) FROM stdin;
2	1	3	1	2	2
3	3	2	2	2	5
4	2	3	1	1	4
5	5	5	3	2	1
1	6	4	\N	2	3
\.


--
-- Data for Name: EmpSalary; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."EmpSalary" (salary_id, base_salary, allowances, max_bonus, total_salary) FROM stdin;
1	30000	5000	20000	35000
2	34000	6000	22000	40000
3	50000	7900	40000	57900
4	56000	10000	40000	66000
5	20000	1000	0	21000
\.


--
-- Data for Name: Employees; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Employees" (id, name, surname, birthdate, employee_number, marital_status, post_code, address_1, address_2, contact_no, country_id) FROM stdin;
5	Byron	Tomkinson	1999-07-03	5	Single	1692	88 Moan street	Midrand	0768796473	1
1	Benjamin	McAthur	1988-07-22	1	Married	1456	12 Folksbery	Pretoria	0835268546	1
2	Eben	van Staaden	1995-05-12	4	Single	1456	14 Joobly crescent	Pretoria	0831234533	1
3	Amelia	Spellwood	1997-08-28	2	Married	1965	32 Avenue	Fairland	0764238472	1
4	Elijah	Dawson	1983-07-12	3	Married	1492	9 Moonwalk street	Pretoria	0834158243	1
\.


--
-- Data for Name: Organization; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Organization" (org_id, org_name, org_tax_reg_no, post_code, address_1, address_2, contact_no, country_id) FROM stdin;
1	Starlink Group	1456549385	2195	14th Avenue	Fairland	0114236548	1
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: byron
--

COPY public."Role" (role_id, role_name, role_desc) FROM stdin;
5	Trainee	In training
6	CEO	Cheif of organization
1	Employee	Works on UI and UX front end
2	Employee	Manages accounts
3	Employee	Works on back end code
4	Employee	Manages and maintains network
7	Employee	Manages employees on projects
\.


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: byron
--

SELECT pg_catalog.setval('public.employees_id_seq', 13, true);


--
-- Name: Company company_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT company_pkey PRIMARY KEY (comp_id);


--
-- Name: Countries country_pk; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Countries"
    ADD CONSTRAINT country_pk PRIMARY KEY (country_id);


--
-- Name: Department dept_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT dept_pkey PRIMARY KEY (dep_id);


--
-- Name: Division div_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Division"
    ADD CONSTRAINT div_pkey PRIMARY KEY (div_id);


--
-- Name: Employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: EmpRole emprole_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT emprole_pkey PRIMARY KEY (employee_number);


--
-- Name: Organization org_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT org_pkey PRIMARY KEY (org_id);


--
-- Name: EmpQualification qual_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpQualification"
    ADD CONSTRAINT qual_pkey PRIMARY KEY (qual_id);


--
-- Name: Role role_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: EmpSalary salary_pkey; Type: CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpSalary"
    ADD CONSTRAINT salary_pkey PRIMARY KEY (salary_id);


--
-- Name: Division comp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Division"
    ADD CONSTRAINT comp_fkey FOREIGN KEY (comp_id) REFERENCES public."Company"(comp_id) NOT VALID;


--
-- Name: Employees country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT country_fkey FOREIGN KEY (country_id) REFERENCES public."Countries"(country_id) NOT VALID;


--
-- Name: Company country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT country_fkey FOREIGN KEY (country_id) REFERENCES public."Countries"(country_id) NOT VALID;


--
-- Name: Division country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Division"
    ADD CONSTRAINT country_fkey FOREIGN KEY (country_id) REFERENCES public."Countries"(country_id) NOT VALID;


--
-- Name: Department country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT country_fkey FOREIGN KEY (country_id) REFERENCES public."Countries"(country_id) NOT VALID;


--
-- Name: Organization country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT country_fkey FOREIGN KEY (country_id) REFERENCES public."Countries"(country_id) NOT VALID;


--
-- Name: EmpRole dep_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT dep_fkey FOREIGN KEY (dep_id) REFERENCES public."Department"(dep_id) NOT VALID;


--
-- Name: Department div_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT div_fkey FOREIGN KEY (div_id) REFERENCES public."Division"(div_id) NOT VALID;


--
-- Name: Employees employees_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT employees_fkey FOREIGN KEY (employee_number) REFERENCES public."EmpRole"(employee_number) NOT VALID;


--
-- Name: Department head_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT head_fkey FOREIGN KEY (dep_head) REFERENCES public."EmpRole"(employee_number) NOT VALID;


--
-- Name: Company org_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT org_fkey FOREIGN KEY (org_id) REFERENCES public."Organization"(org_id) NOT VALID;


--
-- Name: EmpRole qual_fk; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT qual_fk FOREIGN KEY (qual_id) REFERENCES public."EmpQualification"(qual_id) NOT VALID;


--
-- Name: EmpRole reporting_fk; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT reporting_fk FOREIGN KEY (reporting_line) REFERENCES public."EmpRole"(employee_number) NOT VALID;


--
-- Name: EmpRole role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT role_fkey FOREIGN KEY (role_id) REFERENCES public."Role"(role_id) NOT VALID;


--
-- Name: EmpRole salary_fk; Type: FK CONSTRAINT; Schema: public; Owner: byron
--

ALTER TABLE ONLY public."EmpRole"
    ADD CONSTRAINT salary_fk FOREIGN KEY (salary_id) REFERENCES public."EmpSalary"(salary_id) NOT VALID;


--
-- PostgreSQL database dump complete
--

