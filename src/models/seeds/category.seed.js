const db = require('../index')
const Category = db.category

exports.categorySeed = () => {
    Category.bulkCreate([
        {name: 'Automotive'},
        {name: 'Computer'},
        {name: 'Building'},
    ])
}