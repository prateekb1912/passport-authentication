const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

// Register handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) errors.push({ message: 'Please fill the required fields' })
    if (password !== password2) errors.push({ message: 'Passwords do not match' })

    if (errors.length) {
        res.render('register', { errors, name, email, password, password2 })
    } else res.json({ message: 'User registered successfully' })

})

module.exports = router;