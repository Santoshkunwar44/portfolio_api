const Crypto = require("crypto");
const hashService = require("./hashService");

class OtpService {




    async generateOtp() {
        const crypto = await Crypto.randomInt(10000, 99999)
        return crypto
    }


    verifyOtp(data, prevhashed) {
        let theHashed = hashService.generateHash(data)
        return theHashed === prevhashed

    }
}

module.exports = new OtpService()