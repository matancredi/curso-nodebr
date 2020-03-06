// Como o herois.json é .json não seria necessário utilizar o readFile
// const dadosJson = require('./herois.json)
// Mas o objetivo é simular leitura de arquivos, por isso vamos usar

const { readFile, writeFile } = require('fs');

const { promisify } = require('util')

// Para poder trabalhar com o readFile como promise
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class DataBase {

    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        const heroiComId = {
            id,
            ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado;
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => 
            id? (item.id === id) : true
        )
       return dadosFiltrados; 
    }

    async remover(id){
        if (!id) {
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1){
            throw new Error('O heroi passado não existe')
        }
        //Remove 1 item a partir da primeira ocorrência do id dado
        dados.splice(indice, 1);

        // E escreve o conteúdo sem esse item de novo
        return await this.escreverArquivo(dados)

        return false;
    }

    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivo(id)
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1){
            throw new Error("Heroi não econtrado")
        }
        const atual = dados[indice]
        
        // Fazer merge do objeto atual com as modificações
        const objetoAtualizar = {
            ...atual,
            ... modificacoes
        }

        // Remove o objeto atual
        dados.splice(indice, 1);

        // Escreve o novo objeto
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }
}

// Como é classe, tem que exportar a instância
module.exports = new DataBase();