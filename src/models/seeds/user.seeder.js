const db = require('../index')
const User = db.user

exports.userSeed = () => {
    User.create({
        name: 'Muhammad Rizky',
        email: 'muhammadrizky35902@gmail.com',
        phone: '089094020670',
        password: '$772473rkSMSNSkmdfjmmlrefgklfow90'
    })
}