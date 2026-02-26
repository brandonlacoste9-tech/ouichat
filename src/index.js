const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const licenseRoutes = require('./routes/license');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue à OuiChat - Quebec SaaS Platform',
    company: process.env.COMPANY_NAME || 'Northern-Ventures',
    description: 'Version québécoise de WeChat avec vérification de licences RBQ/REQ',
    version: '1.0.0'
  });
});

app.use('/api/license', licenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue',
    message: err.message
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🍁 OuiChat API démarré sur le port ${PORT}`);
    console.log(`🏢 ${process.env.COMPANY_NAME || 'Northern-Ventures'}`);
  });
}

module.exports = app;
