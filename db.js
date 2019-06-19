const Sequelize = require('Sequelize');
const db = new Sequelize('postgres://postgres:password@localhost:5432/acme_user_management');

const User = db.define('user', {
    name: Sequelize.STRING,
});

User.belongsTo(User, {as: 'manager'});

module.exports = {
    db,
    User,
}
