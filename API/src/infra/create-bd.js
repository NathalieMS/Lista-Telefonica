/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
// Arquivo responsável por criar a tabela e popular nosso bd
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const caminhoArq = path.resolve(__dirname,'database.db')
// Importante que o caminho abaixo seja o mesmo que o indicado no arquivo
// que exporta o bd (sqlite-db.js)
const db = new sqlite3.Database(caminhoArq);


//==== Telefones
const TELEFONES_SCHEMA = `
CREATE TABLE IF NOT EXISTS TELEFONES(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    NOME VARCHAR(64),
    NUMERO INTEGER,
    EMAIL VARCHAR (254),
    IMAGEM BLOB 
);`;


function criaTabelaTelefones() {
    db.run(TELEFONES_SCHEMA, (error)=> {
        if(error) console.log("Erro ao criar tabela Lista telefonica");
    });
}


db.serialize( ()=> {
    criaTabelaTelefones();
});

//src\infra\create-bd.js