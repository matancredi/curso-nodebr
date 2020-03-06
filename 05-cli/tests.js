const {
    deepEqual,
    ok
} = require('assert');

const database = require('./database')

const DEFAULT_ITEM_CADASTRADO = {
    nome: 'Mulher Maravilha',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um heroi usando arquivos', async() => {
        const resultadoEsperado = DEFAULT_ITEM_CADASTRADO
        const [resultado] = await database.listar(resultadoEsperado.id)

        deepEqual(resultado, resultadoEsperado)
    })


    it('deve cadastrar um heroi usando arquivos', async () => {
        const resultadoEsperado = DEFAULT_ITEM_CADASTRADO
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRADO.id)

        deepEqual(atual, resultadoEsperado)

    })

    it('deve remover um heroi por id', async() => {
        const resultadoEsperado = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id);
        deepEqual(resultado, resultadoEsperado)
    })

    it.only('deve atualizar um heroi pelo id', async() => {

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const resultadoEsperado = {
            ...DEFAULT_ITEM_ATUALIZAR,
            ...novoDado
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, resultadoEsperado)
    })
})