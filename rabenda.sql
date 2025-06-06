PGDMP                      }            test_rabenda    16.4    16.4 :    @           0    0    ENCODING    ENCODING     !   SET client_encoding = 'WIN1251';
                      false            A           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            B           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            C           1262    33712    test_rabenda    DATABASE     �   CREATE DATABASE test_rabenda WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE test_rabenda;
                postgres    false                        3079    33725 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            D           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    33744    clients    TABLE     z   CREATE TABLE public.clients (
    client_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL
);
    DROP TABLE public.clients;
       public         heap    postgres    false    2            �            1259    33786 	   discounts    TABLE     �   CREATE TABLE public.discounts (
    discount_id integer NOT NULL,
    name character varying(100) NOT NULL,
    percentage numeric(5,2) NOT NULL,
    description text,
    start_date timestamp with time zone,
    end_date timestamp with time zone
);
    DROP TABLE public.discounts;
       public         heap    postgres    false            �            1259    33785    discounts_discount_id_seq    SEQUENCE     �   CREATE SEQUENCE public.discounts_discount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.discounts_discount_id_seq;
       public          postgres    false    224            E           0    0    discounts_discount_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.discounts_discount_id_seq OWNED BY public.discounts.discount_id;
          public          postgres    false    223            �            1259    33803    feedback    TABLE     �   CREATE TABLE public.feedback (
    feedback_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    rating integer NOT NULL,
    text text NOT NULL,
    created timestamp with time zone
);
    DROP TABLE public.feedback;
       public         heap    postgres    false    2            �            1259    33755    masters    TABLE       CREATE TABLE public.masters (
    master_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    specialization character varying(100) NOT NULL,
    years_of_experience integer NOT NULL,
    tg_uid integer NOT NULL,
    work_examples text
);
    DROP TABLE public.masters;
       public         heap    postgres    false    2            �            1259    33811    requests    TABLE       CREATE TABLE public.requests (
    request_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    feedback_id uuid,
    discount_id integer,
    service_id integer NOT NULL,
    status_id integer NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    price numeric(10,2) NOT NULL,
    price_without_discount numeric(10,2),
    created_at timestamp with time zone,
    confirmation boolean NOT NULL,
    canceled_at timestamp with time zone,
    client_id uuid NOT NULL
);
    DROP TABLE public.requests;
       public         heap    postgres    false    2            �            1259    33714    service_types    TABLE     �   CREATE TABLE public.service_types (
    service_type_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);
 !   DROP TABLE public.service_types;
       public         heap    postgres    false            �            1259    33713 !   service_types_service_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.service_types_service_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.service_types_service_type_id_seq;
       public          postgres    false    217            F           0    0 !   service_types_service_type_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.service_types_service_type_id_seq OWNED BY public.service_types.service_type_id;
          public          postgres    false    216            �            1259    33769    services    TABLE     �   CREATE TABLE public.services (
    service_id integer NOT NULL,
    service_type_id integer NOT NULL,
    name character varying(100) NOT NULL,
    duration integer NOT NULL,
    price numeric(10,2) NOT NULL,
    master_id uuid NOT NULL
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    33768    services_service_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.services_service_id_seq;
       public          postgres    false    222            G           0    0    services_service_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.services_service_id_seq OWNED BY public.services.service_id;
          public          postgres    false    221            �            1259    33795    statuses    TABLE     �   CREATE TABLE public.statuses (
    status_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);
    DROP TABLE public.statuses;
       public         heap    postgres    false            �            1259    33794    statuses_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.statuses_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.statuses_status_id_seq;
       public          postgres    false    226            H           0    0    statuses_status_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.statuses_status_id_seq OWNED BY public.statuses.status_id;
          public          postgres    false    225            �            1259    33736    users    TABLE     �  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    father_name character varying(100),
    email character varying(100) NOT NULL,
    phone character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    birthday timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            �           2604    33789    discounts discount_id    DEFAULT     ~   ALTER TABLE ONLY public.discounts ALTER COLUMN discount_id SET DEFAULT nextval('public.discounts_discount_id_seq'::regclass);
 D   ALTER TABLE public.discounts ALTER COLUMN discount_id DROP DEFAULT;
       public          postgres    false    224    223    224            ~           2604    33717    service_types service_type_id    DEFAULT     �   ALTER TABLE ONLY public.service_types ALTER COLUMN service_type_id SET DEFAULT nextval('public.service_types_service_type_id_seq'::regclass);
 L   ALTER TABLE public.service_types ALTER COLUMN service_type_id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    33772    services service_id    DEFAULT     z   ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.services_service_id_seq'::regclass);
 B   ALTER TABLE public.services ALTER COLUMN service_id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    33798    statuses status_id    DEFAULT     x   ALTER TABLE ONLY public.statuses ALTER COLUMN status_id SET DEFAULT nextval('public.statuses_status_id_seq'::regclass);
 A   ALTER TABLE public.statuses ALTER COLUMN status_id DROP DEFAULT;
       public          postgres    false    225    226    226            4          0    33744    clients 
   TABLE DATA           5   COPY public.clients (client_id, user_id) FROM stdin;
    public          postgres    false    219   �H       9          0    33786 	   discounts 
   TABLE DATA           e   COPY public.discounts (discount_id, name, percentage, description, start_date, end_date) FROM stdin;
    public          postgres    false    224   �L       <          0    33803    feedback 
   TABLE DATA           F   COPY public.feedback (feedback_id, rating, text, created) FROM stdin;
    public          postgres    false    227   M       5          0    33755    masters 
   TABLE DATA           q   COPY public.masters (master_id, user_id, specialization, years_of_experience, tg_uid, work_examples) FROM stdin;
    public          postgres    false    220   �M       =          0    33811    requests 
   TABLE DATA           �   COPY public.requests (request_id, feedback_id, discount_id, service_id, status_id, start_time, end_time, price, price_without_discount, created_at, confirmation, canceled_at, client_id) FROM stdin;
    public          postgres    false    228   P       2          0    33714    service_types 
   TABLE DATA           K   COPY public.service_types (service_type_id, name, description) FROM stdin;
    public          postgres    false    217   0P       7          0    33769    services 
   TABLE DATA           a   COPY public.services (service_id, service_type_id, name, duration, price, master_id) FROM stdin;
    public          postgres    false    222   -R       ;          0    33795    statuses 
   TABLE DATA           @   COPY public.statuses (status_id, name, description) FROM stdin;
    public          postgres    false    226   JR       3          0    33736    users 
   TABLE DATA           n   COPY public.users (user_id, first_name, last_name, father_name, email, phone, password, birthday) FROM stdin;
    public          postgres    false    218   �R       I           0    0    discounts_discount_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.discounts_discount_id_seq', 1, false);
          public          postgres    false    223            J           0    0 !   service_types_service_type_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.service_types_service_type_id_seq', 1, false);
          public          postgres    false    216            K           0    0    services_service_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.services_service_id_seq', 1, false);
          public          postgres    false    221            L           0    0    statuses_status_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.statuses_status_id_seq', 1, false);
          public          postgres    false    225            �           2606    33749    clients clients_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            postgres    false    219            �           2606    33793    discounts discounts_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (discount_id);
 B   ALTER TABLE ONLY public.discounts DROP CONSTRAINT discounts_pkey;
       public            postgres    false    224            �           2606    33810    feedback feedback_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedback_id);
 @   ALTER TABLE ONLY public.feedback DROP CONSTRAINT feedback_pkey;
       public            postgres    false    227            �           2606    33762    masters masters_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masters_pkey PRIMARY KEY (master_id);
 >   ALTER TABLE ONLY public.masters DROP CONSTRAINT masters_pkey;
       public            postgres    false    220            �           2606    33816    requests requests_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (request_id);
 @   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_pkey;
       public            postgres    false    228            �           2606    33721     service_types service_types_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.service_types
    ADD CONSTRAINT service_types_pkey PRIMARY KEY (service_type_id);
 J   ALTER TABLE ONLY public.service_types DROP CONSTRAINT service_types_pkey;
       public            postgres    false    217            �           2606    33774    services services_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    222            �           2606    33802    statuses statuses_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (status_id);
 @   ALTER TABLE ONLY public.statuses DROP CONSTRAINT statuses_pkey;
       public            postgres    false    226            �           2606    33743    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            �           2606    33750    clients clients_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_user_id_fkey;
       public          postgres    false    4746    218    219            �           2606    33763    masters masters_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masters_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.masters DROP CONSTRAINT masters_user_id_fkey;
       public          postgres    false    218    220    4746            �           2606    33837     requests requests_client_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id) ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_client_id_fkey;
       public          postgres    false    4748    219    228            �           2606    33822 "   requests requests_discount_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts(discount_id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_discount_id_fkey;
       public          postgres    false    228    224    4754            �           2606    33817 "   requests requests_feedback_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_feedback_id_fkey FOREIGN KEY (feedback_id) REFERENCES public.feedback(feedback_id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_feedback_id_fkey;
       public          postgres    false    228    227    4758            �           2606    33827 !   requests requests_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_service_id_fkey;
       public          postgres    false    222    4752    228            �           2606    33832     requests requests_status_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.statuses(status_id) ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_status_id_fkey;
       public          postgres    false    4756    226    228            �           2606    33780     services services_master_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_master_id_fkey FOREIGN KEY (master_id) REFERENCES public.masters(master_id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.services DROP CONSTRAINT services_master_id_fkey;
       public          postgres    false    220    4750    222            �           2606    33775 &   services services_service_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_service_type_id_fkey FOREIGN KEY (service_type_id) REFERENCES public.service_types(service_type_id) ON UPDATE CASCADE;
 P   ALTER TABLE ONLY public.services DROP CONSTRAINT services_service_type_id_fkey;
       public          postgres    false    222    4744    217            4   �  x��K��0Cǝ�p�f/o�	O��R�q��kl�d+6qoI�fQ��ye������m$�x���^tVFlC>=�K��]]�z��A�k�6���߉��(ׂ���[Z�Q�{��O�t���D95%G�0k6���?���I��Ch�[Gj����'�G�+��7�M��O�v�7��K�N�r��;�������ֿ��e���Ӊ,�^J+|���m�_��r�t�AL?��Q՗V�ǲ�����h�+�u/ʅRswA���i?�%�|�\�N�F�g��-W�k�Z�ҵ ��K[�S�W����[力8
ӽ-Z�u������=d��d��I=xc��+���y�=�]��)ڇ�������DS��&���p�4�H?�
w��|��`w�U�b3���ܕz�|S@ֽ��AOW)b�.۶Nz����8k������������F	�)O�������y�-G~M�A7����
LY�9[��?�9#Pi�,,X��S�[c��r�UԌ��v��yv贸�v:���6�A[����T��G�iwq�	��(���C�;w��ۭyċ�xm��#��ǽz��|u8�}��՛n'̧���v�U����`n��7{��r�/��D��y���.8�S�����dܬs�K7NE���&d�G�l�xg���-.�0f��9��0ز��e��nzu_�r�S�o 4�h>.s����F6��<���'�;��=գE�0
�B��0n:�(r`A��:�\���c��{��
(�nL��-��Z��@r�3��`���Z�s��Ry-�:��e�+��ݛ�Ю��5c`&����#`�8n�����S�)9�@�r`>�/-#���{�r቞ �n�9.�τi��6�)	��OL4�P���[���l���ŀo"4��p!}G���<#�z�9I .�u��>�\b^�����È�*fG��Tw����2���!����"�����}�vQ�2      9   �   x��NK� ]�)fӕ� �⥽�`)eۤb��.M&��{�>��bpрK+Թ9��b��q�� ��C������+�_~�9�'�	d( ��	��LH�0�{P�L��wX!��#Q�SG���`�"?����WN)},��      <      x������ � �      5   g  x�m�A�1EיS��ǉ�Kp6N��%!nPb4�����#X�	�#v�������-�(�%��(�{.�C�ҁ-�d=M�^�.��j��,�G�kx���ۧ��J�V�PM^����ӈ�~g��	���j����#�ٍG�	��4	�)u(�݄[�Û����r�v��Z�W.G��,Y4��E��Jd��2Y��.�=!Vh��e�Z&������|�0L�b7M#G "�6V�ф�O�g^IL�Vp�n5�	}�I�,~5��~;�>l?�O�^kXͪ�U��.�k�Ɗ�d#���4�M��e��DP��ݔ�n��$�;�]�?��>l�ѵP���"F@��l#W(�1[������Z����J�x���Z]������v�x��l������bDF��j�T��sQ��ܛ�)Ŕ]��yp;kb��,��gT�kmp����%�c�	u����@[� ��D"9�<Ζ�&,ƽŪл��%��Ⱥ»������?κ�Xv�T�~܃���w6&Ur�����E�T}k�)H��0��u�b�=����|�~���M���G�ܩ�������/i�̠��>1CO��}qfu�+�����9��N{|�Z�Ջ���_�-O�      =      x������ � �      2   �  x�uRIr�0<������/yhސr���H9�!�����(���n��=�ӷ�Þ[�ԓ�����UG�P�A�iͻ�>.58Zu0v�&�j�CG�wT�&n[�]�-{���@e$p\
�zsM��Տ':�K~=�%�����<�k����� &jFt�-{=��z{Mo'��P}c������~\ĭ����[Q�0�#A���Z�t�2�lj�L��5%�M�;�0'/v��~$�q��ㆹTH�L�<��2ih���`SC��:
�@"�c�T��/��1F�l��'��P�2_��Yϩ��#�,,0Q��_y_s����4�3���[��:BL%p��{�ےR�`����c#H�on��ԧs�d�\�0�M�p&����%-��z:Р5�H3Z{�Tv�Ό��ztR��c)���r�������J��#�D9����}����<&���>�zG��u�<���/���.G�_g��r�V>֢ԗWJ�S�r      7      x������ � �      ;   �   x�M�;�@k�>��pڔ��N�M,��A�.	�=z�5T��բ�i���T6��E~ឍqu�ƿH3)�όqG���.��A%Zʖ/
��s��XNwP�w�D����K��IT����I���t�W��ﳊ      3   �  x����oW��7E�K���U��V*�-@��'����(�/��PQ
�T,�j'#�-����7��v*feKVdM�89�}��4y��ʻ�w�d$�2x�)tk\�8,&�3tTL�#�[���rT��\?m}����z?�k�-!�q!�Fg�;Cə/��֥s^8��ゾ�������{W77ԕo��<v��G_o�?��/�/ֿK�"0���wy���K�J�I�(��x,�`��z,���jÅ"�A1�^�G�|6���د*�>)����\�b��3�R,hN6S�I��1�M����J\8��7.A�n�?m$�:�hN��ڥ�.C3ǜ�G�Xa�&���1q��ƈ}�Sk�4V0G(�{P�g�s����I�'`qo:k����p���k���-�4$���1X�Ȱ� �R�D��ɢ�Q9������6��x����}�e���-15-њF�T��$0�0;a��hm��*�[��p^з�����?�˽F6(���.�5[�n�)k�V&�A��	���&���.$�6��8�Г��c��Cc�z��|�5fm:Q�'q֌`!����5zK���2�z�W�ի���ɍb\��n�y���a����:� X簐�`o�Ö`&�B�y1>z�v@�x�΋Iu8.F�n���d��tC@�YLu[wP�GƱ�ć:����T�gW��tMN��Ջ�(G����k�z�|�3��K���`�-���
��XH!Nh6����O�Q�ŝr2)������V;-^FRh@����QSl(��X�"A6C�p�"��n���'	C�̧utԕ�>L]׷`�qj��X��5b�C\�E�3��X������|Y4�����m��N�/?YO�[rs�Q���	"0)�Pz$[����0�v�QY��� ����`�x��z^P�RB�CAk\��8�)�X)F�nW/��z�\��6S�8y�$�f/�:w�Y��d�1i	��g�� ,9%6��Q*Eh�,p<�O'������7�j�W�k��o=YO�ZY�al
k	�JA��\��,Y��z�)��P1/����&.�a3�z�;]F/^~�Y��֚���g�֌f�X��s.iNݙUu8����������O���栅�	�BK��K��v����tأGc������ z��bo��:���X�JڃN+D`jC�0����a^s���2iz4W Ój\�|Yr������~�k���P�ehX������p��/d����
��� ���ڟ��6X��6��b��ͼh�8A16gR�F9կ��c%���q<p�~',�������f�7����f]�w2t�v�f��P'J��+�3�Ʋ�� .~(^�ֻ�j�Z�3*�Q}�-H{[|svee���p     