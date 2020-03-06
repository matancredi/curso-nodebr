class Heroi {
    constructor ({ nome, poder, id }) {
        this.nome = nome;
        this.poder = poder;
        this.id = id
    }
}

// Nesse caso não é preciso instanciar porque quem for usar vai passar as informações
// No outro exercício já devolvíamos um objeto default (new Heroi())
module.exports = Heroi