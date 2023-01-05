const bcrypt = require('bcrypt')
const router = require('express').Router();

// Sign Up Controller
router.post('/sigup', async (req, res) {
    const {username, name, contact, password} = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = {
        username,
        name,
        contact,
        passwordHash
    }
})

// Login Controller

// Logout Controller

module.exports = router;
