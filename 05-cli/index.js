const Commander = require('commander');
const Database = require('./database')
const Heroi = require('./heroi')

async function main(params){
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do heroi")
    .option ('-p, --poder [value]', "Poder do heroi")
    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar um heroi")
    .option('-r, --remover', "Remover um heroi")
    .parse(process.argv)

    // O commander estava devolvendo muita coisa, fizemos esse "molde" com a classe
    // E agora heroi só tem os atributos nome, poder e id
    const heroi = new Heroi(Commander)

    try{
        if(Commander.cadastrar){
            console.log(heroi)
            const resultado = await Database.cadastrar(heroi)
            if (!resultado){
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucesso')
        }

        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

    } catch (error){
    console.error('deu ruim', error)
}


}

main()