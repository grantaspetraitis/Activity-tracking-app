const pool = require('../db').getPool();

exports.getCategories = async (req, res) => {
    pool.query('SELECT activity_category FROM all_activities', (err, result) => {
        if(err) throw err;
        res.status(200).send(result);
        console.log(result)
    })
}