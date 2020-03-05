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

const usuarioPromise = obterUsuario();

// Para manipular o sucesso, usamos o .then
// Para erros, o .catch
usuarioPromise
.then(function (usuario){
    return obterTelefone(usuario.id).then(function (telefone){
        return{
            usuario: usuario,
            telefone: telefone
        }
    })
})
.then(function (usuario_telefone){
    return obterEnderecoAsync(usuario_telefone.usuario.id).then(function (endereco){
        return{
            usuario: usuario_telefone.usuario,
            telefone: usuario_telefone.telefone,
            endereco: endereco
        }
    })
})
.then(function (usuario_telefone_endereco){
console.log(`
    Nome: ${usuario_telefone_endereco.usuario.nome}
    Endereço: ${usuario_telefone_endereco.endereco.rua}, ${usuario_telefone_endereco.endereco.numero}
    Telefone: (${usuario_telefone_endereco.telefone.ddd}) ${usuario_telefone_endereco.telefone.telefone}
    `);
})
.catch(function (error){
    console.error('Erro: ', error);
})