const express = require('express');
const sequelize = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/auth', userRoutes);
app.use('/note', noteRoutes);

// Test database connection
sequelize.authenticate().then(() => {
  console.log('Connected to MySQL database');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
