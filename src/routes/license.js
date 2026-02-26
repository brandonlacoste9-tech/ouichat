const express = require('express');
const router = express.Router();
const { verifyRBQ, verifyREQ } = require('../services/licenseVerification');

/**
 * GET /api/license/rbq/:licenseNumber
 * Vérifie une licence RBQ (Régie du bâtiment du Québec)
 */
router.get('/rbq/:licenseNumber', async (req, res, next) => {
  try {
    const { licenseNumber } = req.params;
    
    if (!licenseNumber) {
      return res.status(400).json({
        error: 'Numéro de licence requis',
        message: 'Le numéro de licence RBQ est obligatoire'
      });
    }

    const result = await verifyRBQ(licenseNumber);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/license/req/:licenseNumber
 * Vérifie une licence REQ (Régie de l'électricité et du gaz)
 */
router.get('/req/:licenseNumber', async (req, res, next) => {
  try {
    const { licenseNumber } = req.params;
    
    if (!licenseNumber) {
      return res.status(400).json({
        error: 'Numéro de licence requis',
        message: 'Le numéro de licence REQ est obligatoire'
      });
    }

    const result = await verifyREQ(licenseNumber);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/license/verify
 * Vérifie plusieurs licences en une seule requête
 */
router.post('/verify', async (req, res, next) => {
  try {
    const { licenses } = req.body;
    
    if (!licenses || !Array.isArray(licenses)) {
      return res.status(400).json({
        error: 'Format invalide',
        message: 'Un tableau de licences est requis'
      });
    }

    const results = await Promise.all(
      licenses.map(async (license) => {
        try {
          if (license.type === 'RBQ') {
            return await verifyRBQ(license.number);
          } else if (license.type === 'REQ') {
            return await verifyREQ(license.number);
          } else {
            return {
              licenseNumber: license.number,
              type: license.type,
              valid: false,
              error: 'Type de licence non supporté'
            };
          }
        } catch (error) {
          return {
            licenseNumber: license.number,
            type: license.type,
            valid: false,
            error: error.message
          };
        }
      })
    );

    res.json({ results });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
