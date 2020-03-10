class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }


}

// Interface para que se siga este "contrato"
class ICrud {
    create(item){
        throw new NotImplementedException()
    }

    read(query){
        throw new NotImplementedException()
    }

    update(id, item){
        throw new NotImplementedException()
    }

    delete(id){
        throw new NotImplementedException()
    }
}

module.exports = ICrud