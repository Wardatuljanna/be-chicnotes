const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Note.belongsTo(User, { foreignKey: 'userId' });
module.exports = Note;