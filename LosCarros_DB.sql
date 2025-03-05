/* Lógico_1: */

CREATE TABLE tb_cliente (
    clie_id serial PRIMARY KEY NOT NULL,
    clie_nome varchar(50) NOT NULL,
    clie_email varchar(50 ) NOT NULL,
    clie_senha varchar(50) NOT NULL
);

CREATE TABLE tb_continente (
    con_id serial PRIMARY KEY NOT NULL,
    con_nome varchar(50) NOT NULL
);

CREATE TABLE tb_pais (
	pais_id serial PRIMARY KEY NOT NULL,
    pais_nome varchar(50) NOT NULL,
    pais_con_id integer NOT NULL,
	FOREIGN KEY (pais_con_id) REFERENCES tb_continente (con_id)
);

CREATE TABLE tb_marca (
    mar_id serial PRIMARY KEY NOT NULL,
    mar_nome varchar(50) NOT NULL,
    mar_pais_id integer NOT NULL,
	FOREIGN KEY (mar_pais_id) REFERENCES tb_pais (pais_id)
);

CREATE TABLE tb_carro (
    car_id serial PRIMARY KEY NOT NULL,
    car_nome varchar(50) NOT NULL,
    car_ano varchar(50) NOT NULL,
    car_disponivel boolean NOT NULL,
    car_mar_id integer NOT NULL,
	FOREIGN KEY (car_mar_id) REFERENCES tb_marca (mar_id)
);

CREATE TABLE tb_compra (
    com_id serial PRIMARY KEY NOT NULL,
    com_clie_id integer NOT NULL,
    com_car_id integer NOT NULL,
    com_aprovado boolean NOT NULL,
	FOREIGN KEY (com_clie_id) REFERENCES tb_cliente (clie_id),
	FOREIGN KEY (com_car_id) REFERENCES tb_carro (car_id)
);

