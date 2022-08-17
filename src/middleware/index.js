const { isUserExist } = require('./register')
const {verifyToken} = require('./autjwt')

module.exports = {
    isUserExist,
    verifyToken
}