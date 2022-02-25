const TelefonesDAO = require('../DAO/TelefonesDAO')
const Telefones = require('../model/Telefones')
const TelefonesAlt = require('../model/TelefonesAlt')



const telefones = (app, bd) =>{
    const novoTelefonesDAO = new TelefonesDAO(bd)


    app.get('/telefones', async (req, res)=> {
        try {
            const resposta = await novoTelefonesDAO.pegaTodosTelefones()
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }
    })

    app.get('/telefones/:id', async (req, res)=> { 
        const id = req.params.id
        try {
            const resposta = await novoTelefonesDAO.pegaTelefonePorId(id)
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }
    })




    app.post('/telefones', async (req, res)=> {
        // Usar o try-catch para pegar o erro, caso a validacao
        // do model de erro, ou outro erro apareça
        try {
            const body = req.body
            //Importante validar os campos com o model
            const novoTelefones = new Telefones(...Object.values(body))
    
            //Logica de inserção da entidade no bd
            const resposta = await novoTelefonesDAO.insereTelefone(novoTelefones)
            res.status(201).json(resposta)
        } catch (error) {
            // Resposta em caso de erro
            res.json({
                "mensagem" : error.message,
                "erro" : true 
            })
        }
    })

    app.delete('/telefones/:id', async (req, res)=> {
        const id = parseInt(req.params.id)
        try {
            const resposta = await novoTelefonesDAO.deletaTelefone(id)
            res.json(resposta)
        } catch (error) {
            res.status(404).json({
                "mensagem" : error.message,
                "erro" : true
            })
        }
    })

    app.put('/telefones/:id', async (req, res)=>{
        const id = req.params.id
        const body = req.body

        // Logica de atualizaçao da entidade no bd
        try {
            const respostaGet = await novoTelefonesDAO.pegaTelefonePorId(id)
            const telefoneAntigo = respostaGet.requisicao[0]
            
            if ( !body.funcao){
                const telefoneAtualizado = new TelefonesAlt (
                    body.nome || telefoneAntigo.NOME,
                    body.numero || telefoneAntigo.NUMERO,
                    body.email || telefoneAntigo.EMAIL,
                    body.imagem || telefoneAntigo.IMAGEM


                )
                const resposta = await novoTelefonesDAO.atualizaTelefone(id, telefoneAtualizado)
                res.json(resposta)               
            }
            else if(telefoneAntigo){
                const telefoneAtualizado = new Telefones (
                    body.nome || telefoneAntigo.NOME,
                    body.numero || telefoneAntigo.NUMERO,
                    body.email || telefoneAntigo.EMAIL,
                    body.imagem || telefoneAntigo.IMAGEM


                )
                const resposta = await novoTelefonesDAO.atualizaTelefone(id, telefoneAtualizado)
                res.json(resposta)               
            }
            else {
                res.json({
                    "mensagem": `Telefone com id "${id}" não existe`,
                    "error" : true
                })
            }
        } catch (error) {
            res.json({
                "mensagem" : error.message,
                "error" : true
            })
        }
    })

}

module.exports = telefones