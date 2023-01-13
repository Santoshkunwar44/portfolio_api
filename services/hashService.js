const Crypto = require("crypto")

class HashService {
    generateHash(data) {
        return Crypto.createHmac("sha256", '123').update(data.toString()).digest("hex")
    }
}


module.exports = new HashService()