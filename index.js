const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')

connection
    .authenticate()
    .then(() => {
        console.log('Conexão realizada com sucesso!')
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs') // para a aplicação aceitar arquivos ejs
app.use(express.static('public'))  // para a aplicação aceitar arquivos estáticos
app.use(bodyParser.urlencoded({ extended: false })) // para o express poder decodificar os dados do form que vêm na requisição

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(perguntas => {  //raw: true retorna apenas os dados sem outros detalhes dispensáveis
        res.render('index', {
            perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    let { titulo, descricao } = req.body
    Pergunta.create({
        titulo,
        descricao
    })
    .then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    let { id } = req.params

    Pergunta.findOne({ where: { id } }).then(pergunta => {
        if (pergunta) {
            res.render('pergunta', {
                pergunta
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    let { corpo, perguntaId } = req.body

    Resposta.create({
        corpo,
        perguntaId
    })
    .then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080')
})
