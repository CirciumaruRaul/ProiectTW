// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
const src = require("debug");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/login", (req, res) => {
    const credentials = req.body;
    const users = readJSONFile();
    let flag = false;
    let ceva = false;
    users.forEach(element => {
        if(credentials.email === "raul@gmail.com" && credentials.password === "RaulRaul"){
            flag = true;
            ceva = true;
        }
        if(credentials.email === element.email && credentials.password === element.password){
            flag = true;
            const username = element.username;
        }
    });
    if (flag === true && ceva === true) {
        res.status(201).send("succes");
    }
    else if(flag) {
        res.status(200).send("succes");
    }
    else{
        res.status(404).send("error");
    }
});

app.post("/postari", (req, res) => {
    const postare = req.body;
    const postari = JSON.parse(fs.readFileSync("postari.json"))["postari"];
    let flag = false;
    for (let i = 0; i < postari.length; i++) {
        if (postari[i].titlu === postare.titlu) {
            flag = true;
            break;
        }
    }
    if (flag) {
        res.status(400).send("Post already exists!");
    } else {
        postari.push(postare);
        scrie(postari);
        res.status(200).send("Post added!");
    }
});

app.post('/register', (req, res) => {
    const newUser = req.body;
    const users = readJSONFile();
    newUser.id = uuid.v4.apply();
    let flag = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === newUser.email) {
            flag = true;
            break;
        }
    }
    if (flag) {
        res.status(400).send("User already exists!");
    } else {
        users.push(newUser);
        write(users);
        res.status(200).send("User added!");
    }
});



// Read All
app.get("/register", (req, res) => {
    const users = readJSONFile();
    // Completati cu codul vostru aici
    if (users != undefined && users.length != 0) {
        res.status(200).send(users);
    }
    else {
        res.status(204).send('nu e gasit');
    }
});

app.get("/postari", (req, res) => {
    const postari = JSON.parse(fs.readFileSync("postari.json"))["postari"];
    // Completati cu codul vostru aici
    if (postari != undefined && postari.length != 0) {
        res.status(200).send(postari);
    }
    else {
        res.status(204).send('nu e gasit');
    }
});

app.get("/login", (req, res) => {
    const users = readJSONFile();
    // Completati cu codul vostru aici
    if (users != undefined && users.length != 0) {
        res.status(200).send(users);
    }
    else {
        res.status(204).send('nu e gasit');
    }
});

//Update
app.put("/register", (req, res) => {
    const users = readJSONFile();
    // Fill in your code here
    const username = req.body.username;
    const update = req.body;
    let userToUpdate = null;
    console.log(username);
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
          users[i] = update;
          userToUpdate = users[i];
          break;
      }
    }
    console.log(userToUpdate);
    write(users);
    if (userToUpdate === null) {
      res.status(204).send('No user found!')
    } else {
      res.status(200).send(userToUpdate);
    }
  });

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["users"];
}
// function readJSONFilee()
// {
//     return JSON.parse(fs.readFileSync("postari.json")["postari"])
// }

function writeJSONFile(destinatii, users) {
    const content = readJSONFile(null, true);
    if (destinatii) {
        content.destinatii = destinatii
    } else if (users) {
        content.users = users;
    }
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ users: users }, null, 4),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

function scrie(postari){
    const content = readJSONFile(null, true);
    fs.writeFileSync(
        "postari.json",
        JSON.stringify({postari : postari}, null, 4),
        "utf8",
        err =>{
            if(err)
            {
                console.log(err);
            }
        }
    )
}

app.delete("/register/:id", (req, res) => {
    const users = readJSONFile();
    // Fill in your code here
    const id = req.params.id;
    let check = false;
    for(let i = 0; i < users.length; i++) {
      if(users[i].id == id && id != 3) {
          check = true;
          users.splice(i, 1);
          break;
      }
    }
    write(users);
    if (check === true) {
      res.status(200).send('User deleted!');
    } else {
      res.status(204).send('No user found!');
    }
  });

function write(content) {
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ users: content }, null, 4),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

// Pornim server-ul
app.listen("3100", () =>
    console.log("Server started at: http://localhost:3100")
);

