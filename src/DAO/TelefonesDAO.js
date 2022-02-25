const res = require("express/lib/response")
const telefones = require("../controller/telefones-controller")

class TelefonesDAO{
    constructor(bd){
        this.bd = bd
    }

    pegaTodosTelefones(){
        const SELECT_ALL = `
        SELECT * FROM TELEFONES
        `
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_ALL, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "error" : true
                    }) 
                } else{
                    resolve({
                        "telefones" : rows,
                        "count": rows.length,
                        "error" : false
                    })
                }
            })
        })  
    }

    insereTelefone(novoTelefone){
        const INSERT_TELEFONE = `
        INSERT INTO TELEFONES
            ( NOME, NUMERO, EMAIL, IMAGEM)
        VALUES
            (?,?,?,?)
        `
        return new Promise((resolve, reject)=>{
            this.bd.run(INSERT_TELEFONE, [...Object.values(novoTelefone)], (error)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : novoTelefone,
                        "erro" : false 
                    })
                }
            })
        })
    }

    
    pegaTelefonePorId(id){
        const SELECT_BY_ID = `
        SELECT * FROM TELEFONES
        WHERE ID = ?`
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_ID, id, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : rows,
                        "erro" : false 
                    })
                }
            })
        })
    }


    async deletaTelefone(id){
        try {
            const telefone = await this.pegaTelefonePorId(id)
            if(telefone.requisicao.length){
                const DELETE = `
                DELETE FROM TELEFONES
                WHERE ID = ?`

                return new Promise((resolve, reject)=>{
                    this.bd.run(DELETE, id, (error)=>{
                        if(error){
                            reject(error.message)
                        } else {
                            resolve({
                                "mensagem" : `Telefone de id ${id} deletado`,
                                "erro" : false 
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Telefone de id ${id} não existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }
        
    }

    async atualizaTelefone(id, novoTelefone){
        try {
            const UPDATE = `
            UPDATE TELEFONES
            SET NOME = ?, NUMERO = ?, EMAIL = ?, IMAGEM = ?
            WHERE ID = ?`
            return new Promise((resolve, reject)=>{
                this.bd.run(UPDATE,
                    [novoTelefone.nome, novoTelefone.numero, novoTelefone.email, novoTelefone.imagem, id], 
                    (error)=>{
                    if(error){
                        reject(error)
                    } else {
                        resolve({
                            "mensagem" : `Telefone de id ${id} atualizado`,
                            "usuario": novoTelefone,
                            "erro" : false 
                        })
                    }
                })
            })
        } catch (error) {
            throw new Error(error.message)
        }   
    }

}

module.exports = TelefonesDAO