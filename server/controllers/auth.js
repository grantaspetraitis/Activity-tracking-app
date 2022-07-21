const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const registerDate = new Date();
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    pool.query('SELECT email FROM users WHERE email = ? OR username = ?', [email, username], (err, result) => {
        if(err) throw err;
        if(result.length > 0) return res.status(400).send({ error: 'User already exists' });

        pool.query('INSERT INTO users SET name = ?, email = ?, username = ?, password = ?, register_date = ?', [name, email, username, hashedPass, registerDate], (err, result) => {
            if(err) throw err;
            res.status(200).send({ success: true })
        })
    })
}

