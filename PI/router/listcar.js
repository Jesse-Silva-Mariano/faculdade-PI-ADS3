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

var login;

function identificadorDeId(idcarro){
  switch(idcarro){
    case 1:
      return 'Citroen';

    case 2:
      return 'Opel';
      
    case 3:
      return 'Volkswagen';

    case 4:
      return 'Chevrole';

    case 5:
      return 'Fiat';

    case 6:
      return 'Honda';

    default:
      throw 'Error'
  }
}

async function buscarCarro() {
  const sqlBusca = "SELECT car_id,car_nome,car_mar_id,car_placa,car_chassi,car_ano from tb_carro;";
  const resultado = await client.query(sqlBusca);
  return resultado.rows;
}
router.get("/listarCarros", async (req, res) => {
  
  const listaCarro = await buscarCarro();


let tabela = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ADMIN</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body>
<table class="table "><tr><th>Id</th><th>Nome</th><th>Marca</th><th>Placa</th><th>Chassi</th><th>Ano</th></tr>`;
  for (let i in listaCarro) {
    tabela += `<tr><td>${listaCarro[i].car_id}</td><td>${listaCarro[i].car_nome}</td><td>${identificadorDeId(listaCarro[i].car_mar_id)}</td><td>${listaCarro[i].car_placa}</td><td>${listaCarro[i].car_chassi}</td><td>${listaCarro[i].car_ano}</td></tr>`;
  }
  tabela += `</table>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  </body>
</html>`;
  res.send(tabela);
})

module.exports =  router;