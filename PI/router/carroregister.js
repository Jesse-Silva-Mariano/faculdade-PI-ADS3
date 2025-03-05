const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "09072000",
  database: "LosCarros_DB",
});
client.connect();

function identificadorDeMarcas(marcaDoCarro){
  switch(marcaDoCarro){
    case 'Citroen':
      return 1;

    case 'Opel':
      return 2;
      
    case 'Volkswagen':
      return 3;

    case 'Chevrole':
        return 4;

    case 'Fiat':
      return 5;

    case 'Honda':
      return 6;

    default:
      throw 'Error'
  }
}


async function inserirCarro(carro) {
  var marca_id = identificadorDeMarcas(carro.car_marca);
  const sqlInserir = `INSERT INTO tb_carro (car_nome,car_placa,car_mar_id,car_ano,car_chassi) VALUES('${carro.car_nome}','${carro.car_placa}',${marca_id},'${carro.car_ano}','${carro.car_chassi}')`;
  await client.query(sqlInserir);
}


router.post("/cadastroVeiculo", async function (req, res) {
  let nomeForm = req.body.nome;
  let placaForm = req.body.placa;
  let marcaForm = req.body.marca;
  let anoForm = req.body.ano;
  let chassiForm = req.body.chassi;

  const carro = {
    car_nome: nomeForm,
    car_placa: placaForm,
    car_marca: marcaForm,
    car_ano: anoForm,
    car_chassi: chassiForm,
  };
  
  await inserirCarro(carro);
  res.redirect('/');
});

module.exports =  router;