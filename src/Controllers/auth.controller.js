const config = require('../config/auth')
const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then((user) => {
            res.status(201).json({
                message: 'User was registered successfully!...',
                ...user.dataValues
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        
    })
    
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).json({message: 'User not Found'});
        }
        let passworIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passworIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'Invalid Password'
            })
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        })
              res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token
            })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
        })
    })
}