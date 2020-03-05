const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, function(click){
    console.log('Algum usuário clicou', click);
})

meuEmissor.emit(nomeEvento, 'barra de rolagem');
meuEmissor.emit(nomeEvento, 'ok');

// let count = 0;
// setInterval(function () {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count++))
// }, 1000)

// Captura o que o usuário digitar:
const stdin = process.openStdin();
stdin.addListener('data', function (value){
    console.log(`Você digitou: ${value.toString().trim()}`)
});