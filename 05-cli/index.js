const Commander = require('commander');
const Database = require('./database')
const Heroi = require('./heroi')

async function main(params){
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do heroi")
    .option ('-p, --poder [value]', "Poder do heroi")
    .option ('-i, --id [value]', "Id do heroi")

    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar um heroi")
    .option('-r, --remover', "Remover um heroi pelo id")
    .option('-r, --atualizar [value]', "Atualizar um heroi pelo id")
    .parse(process.argv)

    // O commander estava devolvendo muita coisa, fizemos esse "molde" com a classe
    // E agora heroi só tem os atributos nome, poder e id
    const heroi = new Heroi(Commander)

    try{
        if(Commander.cadastrar){
            delete heroi.id;
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
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id);
            if (!resultado){
                console.error('Não foi póssível remover o heroi')
            }
            console.log('Heroi removido com sucesso');
            return;
        }
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar);
            delete heroi.id;
            // Remover todas as chaves que estiverem undefined/null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
            if (!resultado){
                console.error('Não foi possível atualizar o heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso')
        }


    } catch (error){
    console.error('Erro:', error)
}


}

main()