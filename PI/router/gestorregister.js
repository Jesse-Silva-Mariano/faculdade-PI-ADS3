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

async function inserirDadosGestor(gestor) {
  const sqlInserir = `INSERT INTO tb_gestor (ges_nome,ges_email,ges_senha)
  VALUES('${gestor.nome}','${gestor.email}',${gestor.senha});`;
  await client.query(sqlInserir);
}

  router.post("/cadastroGestor", async function (req, res) {
  let emailForm = req.body.email;
  let nomeForm = req.body.nome;
  let senhaForm = req.body.senha;
  let senhaConfirmarForm = req.body.senhaConfirmar;

  const gestor = {
    email: emailForm,
    nome: nomeForm,
    senha: senhaForm,
    senhaConfirmar: senhaConfirmarForm,
  };
  await inserirDadosGestor(gestor);

  res.redirect('/');
  })

module.exports =  router;