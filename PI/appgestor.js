const { Client } = require("pg");
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const { connect } = require("http2");
const { Session } = require("inspector");
const { Router } = require("express");
const gestorregister = require("./router/gestorregister.js");
const carroregister = require("./router/carroregister.js");
const listcar = require("./router/listcar.js");

var login;

//Acesso ao BD
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "09072000",
  database: "LosCarros_DB",
});
client.connect();

async function buscarGestor() {
  const sqlBusca = "SELECT ges_nome,ges_email,ges_senha FROM tb_gestor";
  const resultado = await client.query(sqlBusca);
  return resultado.rows;
}

//WebServer - Express
const app = express();
app.use(express.urlencoded());
app.use(session({ secret: "4565516117" }));

//Método GET /
//Ler  a página e enviá-la ao cliente

app.get("/", function (req, res) {
  if ((req.session.login)) {
    fs.readFile("Indexadmin.html", "utf8", (err, data) => {
      res.send(data);
    });
  } else {
    fs.readFile("LoginGestor.html", "utf8", (err, data) => {
      res.send(data);
    });
  }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


//Método POST
//Receber os dados do FORM (template) e processá-los
app.post("/", async function (req, res) {
  let emailForm = req.body.emailGestor;
  let senhaForm = req.body.senhaGestor;

  const gestor = {
    emailGestor: emailForm,
    senhaGestor: senhaForm,
  };
  const gestorCadastrado = await buscarGestor();

  for (let i in gestorCadastrado) {
    if (
      gestor.emailGestor === gestorCadastrado[i].ges_email &&
      gestor.senhaGestor === gestorCadastrado[i].ges_senha
    ) {
      login = gestorCadastrado[i].ges_nome;
      req.session.login = login;
    }
  }
  
  res.redirect('/')
});



//Routers
app.use('/gestorregister',gestorregister);
app.use('/carroregister',carroregister);
app.use('/listcar', listcar);

//Inciar a Web App na porta 4000
app.listen(4000);
app.use("/img", express.static(__dirname + "/img"));
app.use("/style", express.static(__dirname + "/style"));
app.use("/scripts", express.static(__dirname + "/scripts"));
