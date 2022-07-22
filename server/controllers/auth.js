const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../send-mail');
const crypto = require('crypto')

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const registerDate = new Date();
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const verifyToken = crypto.randomBytes(128).toString("hex");
    const verifyUrl = `http://localhost:3000/verify/${verifyToken}`

    pool.query('SELECT email FROM users WHERE email = ? OR username = ?', [email, username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) return res.status(400).send({ error: 'User already exists' });

        pool.query('INSERT INTO users SET name = ?, email = ?, username = ?, password = ?, register_date = ?, verifyToken = ?', [name, email, username, hashedPass, registerDate, verifyToken], (err, result) => {
            if (err) throw err;
            res.status(200).send({ success: true })
        })
        sendEmail({
            from: '"ActivityApp" <grantas157@gmail.com>',
            to: name + ' ' + `<${email}>`,
            subject: 'Verify your email address',
            text: `Click this link to verify your email address: ${verifyUrl}`,
            template: 'verifyTemplate',
            context: {
                username: username,
                verifyUrl: verifyUrl
            }
        })
    })
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (err) throw err;

            const hashedPass = user.password;
            const isPasswordCorrect = await bcrypt.compare(password, hashedPass);
            if (!isPasswordCorrect) return res.status(400).send({ error: 'Incorrect credentials' });

            const token = jwt.sign({ user }, process.env.JWT_SECRET);
            console.log(token)
            res.status(200).send({ token: token, username: user.username, id: user.user_id, role: user.role });
        } else {
            res.status(400).send({ error: 'User does not exist' })
        }
    })
}

exports.verifyUserEmail = async (req, res) => {
    const verifyToken = req.params.token;
    pool.query('SELECT user_id FROM users WHERE verifyToken = ?', [verifyToken], (err, result) => {
        if(err) throw err;
        
        const user_id = result[0].user_id;
        pool.query('UPDATE users SET isActive = ? WHERE user_id = ?', [true, user_id], (err, result2) => {
            if(err) throw err;
            res.status(200).send({ success: true })
        })
    })
}