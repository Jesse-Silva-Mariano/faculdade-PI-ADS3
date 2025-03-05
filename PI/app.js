const { Client } = require("pg");
const express = require("express");
const fs = require("fs");
const { dirname } = require("path");

//Acesso ao BD
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "09072000",
  database: "LosCarros_DB",
});
client.connect();

//WebServer - Express
const app = express();
app.use(express.urlencoded());

//Inciar a Web App na porta 3000
app.listen(3000);

app.use('/img', express.static(__dirname + '/img'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.get("/", function (req, res) {
  fs.readFile("index.html", "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/Cadastro", function (req, res) {
  fs.readFile("Cadastro.html", "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/Login", function (req, res) {
  fs.readFile("Login.html", "utf8", (err, data) => {
    res.send(data);
  });
});

async function inserirDadosUsuario(usuario) {
  const sqlInserir = `INSERT INTO tb_cliente (clie_nome,clie_email,clie_senha)
  VALUES('${usuario.nome}','${usuario.email}',${usuario.senha});`;
  await client.query(sqlInserir);
}


app.post("/Cadastro", async function (req, res) {
  let emailForm = req.body.email;
  let nomeForm = req.body.nome;
  let senhaForm = req.body.senha;
  let senhaConfirmarForm = req.body.senhaConfirmar;

  const usuario = {
    email: emailForm,
    nome: nomeForm,
    senha: senhaForm,
    senhaConfirmar: senhaConfirmarForm,
  };

  console.log(usuario);

    //Armazenar o objeto pessoa no BD
  await inserirDadosUsuario(usuario);

  res.redirect('/');
});

