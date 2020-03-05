const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const lista = []
    // index em this é tipo produto in produtos
    for (index in this){
        const item = this[index]
        const resultado = callback(item);
        if (!resultado) continue;
        lista.push(item)
    }
    return lista;
}

async function main(){
    try{
        const { results } = await obterPessoas('a');


        // const familiaLars = results.filter(function (item) {
        //     return item.name.toLowerCase().indexOf('lars') !== -1
        // })

        const familiaLars = results.meuFilter((item) => {
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map(pessoa => pessoa.name);
        console.log(names);

    } catch (error) {
        console.log("Erro: ", error);
    }
}

main()