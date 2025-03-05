insert into tb_continente(con_nome) values ('America');
insert into tb_continente(con_nome) values ('Europa');
insert into tb_continente(con_nome) values ('Ásia');
insert into tb_continente(con_nome) values ('Africa');
insert into tb_continente(con_nome) values ('Oceania');

SELECT * from tb_continente;

INSERT into tb_pais(pais_con_id,pais_nome) values (2,'Alemanha');
INSERT into tb_pais(pais_con_id,pais_nome) values (1,'Estados Unidos');
INSERT into tb_pais(pais_con_id,pais_nome) values (3,'Japão');
INSERT into tb_pais(pais_con_id,pais_nome) values (2,'França');
INSERT into tb_pais(pais_con_id,pais_nome) values (2,'Italia');

SELECT * from tb_pais;

INSERT into tb_marca(mar_pais_id,mar_nome) values (1,'Opel');
INSERT into tb_marca(mar_pais_id,mar_nome) values (1,'Volkswagen');
INSERT into tb_marca(mar_pais_id,mar_nome) values (2,'Chevrole');
INSERT into tb_marca(mar_pais_id,mar_nome) values (4,'Citroen');
INSERT into tb_marca(mar_pais_id,mar_nome) values (5,'Fiat');
INSERT into tb_marca(mar_pais_id,mar_nome) values (3,'Honda');