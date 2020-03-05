/*
0) Obter um usuário
1) Obter número de telefone de um usuário a partir de seu id
2) Obter o endereço do usuário pelo id
*/

function obterUsuario(callback){

    // Vai retornar os dados do usuário depois de um segundo
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Branca de Neve',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            telefone:'999236502',
            ddd:'11'
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Casa dos 7 anões',
            numero: '80'
        })
    }, 1000)
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario);
}

function resolverTelefone(erro, telefone){
    console.log('telefone', telefone);
}

function resolverEndereco(erro, endereco){
    console.log('endereco', endereco);
}

//const usuario = obterUsuario(resolverUsuario);
// const telefone = obterTelefone(usuario.id);
// console.log('telefone', telefone);

obterUsuario(function resolverUsuario(error, usuario){
    if(error) {
        console.log('Erro no usuário');
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error) {
            console.log('Erro no telefone');
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error){
                console.log('Erro no endereço');
                return;
            }
            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua},${endereco.numero},
            Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})