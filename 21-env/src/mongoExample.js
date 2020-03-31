const Mongoose = require ('mongoose')
Mongoose.connect('mongodb://mariana:senha@localhost:27017/heroes', {useNewUrlParser: true}, function (error){
    if(!error) return;

    console.log('Falha na conexão: ', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando') )
setTimeout(() => {
    const state = Mongoose.connection.readyState
    console.log('state', state)
    // 0: Disconectado
    // 1: Conectado
    // 2: Conectando
}, 1000)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    inseredAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroes', heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
console.log('result cadastrar', resultCadastrar)

const listItens = await model.find()
console.log('itens', listItens)

}

main()