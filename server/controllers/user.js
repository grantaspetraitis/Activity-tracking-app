const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');


exports.getHome = async (req, res) => {
    pool.query('SELECT')
}

exports.viewProfile = async (req, res) => {
    let token, decoded;

    try {
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: 'You must be logged in to view your profile' });
    }
    const ID = decoded.user.user_id;

    pool.query('SELECT users.username, activities.activity_title, activities.activity_duration, activities.activity_result, activities.mood, points.point_amount FROM activities JOIN users ON users.user_id = activities.user_id JOIN points ON points.user_id = users.user_id AND users.user_id = ?', [ID], (err, result) => {
        if(err) throw err;
        res.status(200).send(result);
    })
}

exports.addNewActivity = async (req, res) => {
    const { title, category } = req.body;
    let token, decoded;

    try {
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: 'You must be logged in to view your profile' });
    }
    const role = decoded.user.role;
    const ID = decoded.user.user_id;

    if(role === 'subscriber'){
        pool.query('INSERT INTO user_created_activities SET activity_title = ?, category_id = ?, user_id = ?', [title, category, ID], (err, result) => {
            if(err) throw err;
            res.status(200).send(result)
        })
    } else {
        res.status(401).send({ error: 'Not authorized' })
    }
}