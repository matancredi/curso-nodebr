const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const SENHA = '123'
const HASH = '$2b$04$YSPOx3iXFCuszQOqoR93Lu8vqpeKFQiElsgyMXl1zFCZejlT/dRW2'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA)
    console.log('result', result)
    assert.ok(result.length > 10)
    })

    it('deve comprar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})