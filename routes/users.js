const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => res.json({'message': 'Success login'}))    
router.get('/register', (req, res) => res.json({'message': 'Success register'}))    

module.exports = router;