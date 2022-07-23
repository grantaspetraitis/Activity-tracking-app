const pool = require('../db').getPool();

exports.getCategories = async (req, res) => {
    pool.query('SELECT category_name, category_id FROM categories', (err, result) => {
        if(err) throw err;
        res.status(200).send(result);
    })
}

exports.getActivities = async (req, res) => {
    const id = req.params.category;
    pool.query('SELECT all_activities.activity_title, all_activities.activity_id, all_activities.category_id, categories.category_name FROM all_activities JOIN categories ON all_activities.category_id = categories.category_id WHERE all_activities.category_id = ?', [id], (err, result) => {
        if(err) throw err;
        res.status(200).send(result);
    })
}

exports.chooseActivityCat = async (req, res) => {
    const title = req.params.category;
    pool.query('')
}