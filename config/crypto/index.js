const { SM2 , SM3 } = require('gm-crypto')
const privateKey = '1184E08BF2ABF34B5279A87D1FF69F3E142104402A3DA73341BCE1BA2A654680'
const publicKey = '0491BA789144CBBB75A74B6664B814D1548E55F92BB2FD4472E87599F20EF2D4BD9C9A8AA9C9991A1A40BCF920BB61E8E7856B6053DBA3341223E70C52F5260D56'
var cryptoObj = {
    encryptFunc(word) {
        let encryptedData = SM2.encrypt(word, publicKey, {
            inputEncoding: 'utf8',
            outputEncoding: 'base64'
        })
        return encryptedData
    },
    decryptFunc(word) {
        let decryptedData = SM2.decrypt(word, privateKey, {
            inputEncoding: 'base64',
            outputEncoding: 'utf8'
        })
        return decryptedData
    },
    encryptSign(word) {
        let encryptedData = SM3.digest(word,'utf8','base64')
        return encryptedData
    }
}
module.exports = {
    cryptoObj
}