/*
0) Obter um usuário
1) Obter número de telefone de um usuário a partir de seu id
2) Obter o endereço do usuário pelo id
*/

//Módulo interno do node.js
// Objetivo é converter de callback para promise
// Vai ser possível acessar as funções .then e .catch após a conversão
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // Quando der erro: reject
    // Quando sucesso: resolve
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function () {
            // return reject(new Error('Promessa rejeitada'))
            return resolve({
                id: 1,
                nome: 'Branca de Neve',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        return resolve({
            telefone:'999236502',
            ddd:'11'
        })
    }, 2000)
}

// Na conversão de callback para promises, é importante manter o padrão.
// POr exemplo, se substituíssemos o null por outro valor, ele entenderia que a promise deu erro.
function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Casa dos 7 anões',
            numero: '80'
        })
    }, 1000)
}

main();
async function main(){
    try{
        console.time('medida-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);

        // Mas telefone não depende de endereço e vice-versa:
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone}
        Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise');
    }
    catch(error){
        console.error("Erro: ", error);
    }
}
