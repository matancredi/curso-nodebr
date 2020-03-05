const service = require('./service.js');

async function main() {
    try {
        const result = await service.obterPessoas('a');
        const names = [];

        // -------------------------FOR--------------------------
        // console.time('for');

        for(let i=0; i<=result.results.length-1; i++ ){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        // console.timeEnd('for');

        // ----------------------FOR IN-------------------------
        for(let i in result.results){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }

        // ----------------------FOR OF-------------------------
        for(pessoa of result.results){
            names.push(pessoa.name);
        }


        console.log('Names: ', names)
    }
    catch(error){
        console.error('Erro interno', error);
    }
}

main();