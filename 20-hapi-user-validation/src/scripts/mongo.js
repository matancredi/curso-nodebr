// docker ps 
// docker exec -it 55d0e8d08e26 mongo -u mariana -p senha --authenticationDatabase heroes

// Mostra bancos
show dbs 

// Muda database
use heroes

// Mostra tabelas
show collections

db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-10-10'
})

db.heroes.find()
db.heroes.find().pretty()

for(let i=0; i<=10000; i++){
    db.heroes.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-10-10'
    })
}

db.heroes.count()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({ nome: -1 })

// Para trazer só a coluna de poder
db.heroes.find({}, {poder: 1, _id: 0})

//Trazer quem tiver nome de Flash
db.heroes.find({nome: 'Flash'})

//create
db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-10-10'
})

//read
db.heroes.find()

//update: apaga outros dados
db.heroes.update({_id: ObjectId("5e7b91e33ed753ca0af410e1")},
{nome: 'Mulher Maravilha'})

//update: mantém outros dados
db.heroes.update({_id: ObjectId("5e7b925b3ed753ca0af410f4")},
{ $set: {nome: 'Lanterna Verde'} })

// Se colocar o nome da propriedade errado, ele cria um novo campo:
db.heroes.update({_id: ObjectId("5e7b925b3ed753ca0af410f4")},
{ $set: {name: 'Lanterna Verde'} })

db.heroes.update({ poder: 'Velocidade'},
{ $set: {poder: 'Super força'} })

//delete 
db.heroes.remove({nome: 'Mulher Maravilha'})