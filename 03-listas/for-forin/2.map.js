const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice=0; indice < this.length-1; indice++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
}

async function main(){
    try{
        const pessoas = await service.obterPessoas('a');
        //const names = [];

        //-------------------FOREACH--------------
        // pessoas.results.forEach(function (item){
        //     names.push(item.name);
        // })

        // //------------------MAP-------------------
        // const names = pessoas.results.map(function (item){
        //     return item.name;
        // })

        // --------------MAP EM UMA LINHA
        // const names = pessoas.results.map(item => item.name)

        const names = pessoas.results.meuMap(function(pessoa, indice){
            return pessoa.name;
        })

        console.log('names', names);
    } catch (error) {
        console.log('Erro: ', error);
    }
}
main()