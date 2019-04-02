require("dotenv-safe").load();
var jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:3001/meteor";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log(err);
  }

  db = client.db("meteor");

  app.listen(4321, () => {
    console.log("escutando em localhost:4321");
  });

  app.get("/", (req, res) => {
    res.send("Hello E-commerce!");
  });

  //Para criar um usuário
  app.post("/api/Usuarios", (req, res) => {
    console.log(req.body);

    db.collection("Usuarios").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  });

  //Para visualizar todos os usuários
  app.get("/api/Usuarios", (req, res) => {
    db.collection("Usuarios")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }

        res.send(results);
      });
  });

  //Para logar um usuário
  app.post('/api/Usuarios/login', (req, res, next) => {
    console.log(req.body)
    db.collection('Usuarios').findOne({ username: req.body.username }, (err, result) => {

        if (err) {
            res.send(err)
        }
        console.log(result)
        if (result) {
            if (req.body.password == result.password) {              
                let id = new ObjectId(result._id);
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 600 // expires in 10min
                });
                res.status(200).send({ auth: true, token: token });
            }else{
                res.status(500).send('Senha inválido!');
            }           
        }
        else {
            res.status(500).send('Login inválido!');
        }
    })
})

//Para fazer logout
app.get('/api/Usuarios/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });


  function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

  //Para criar um produto
  app.post("/produto", verifyJWT, (req,res) => {
    console.log(req.body)

    db.collection("produto").insertOne(req.body, (err, result) => {
        if(err){
            res.send(err)
        }

        res.send(req.body)
    })
})

  //Para visualizar os produtos
  app.get("/produto", (req, res) => {
    db.collection("produto")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  });

//Para buscar os produtos por Id
app.get("/produto/:id", (req, res) => {
        
    let id = new ObjecttId(req.params.id);

    db.collection("produto").findOne({_id:id}, (err, result) => {

        if(err){
            res.send(err)
        }

        res.send(result)
    })
})

//Para alterar um produto
app.put("/produto/:id", (req, res) => {
        
    let id = new ObjecttId(req.params.id);

    db.collection("produto").updateOne({_id:id }, { 
        $set: {
            nome:req.body.nome
        }
    }, (err, result) => {

        if(err){
            res.send(err)
        }

        res.send(result)
    })

})

});
