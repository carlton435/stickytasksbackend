import connection from "../../APIs/connection_db.js";

const addArticle = (req, res) => {
    const { title, body, username } = req.query
    const addarticleSql = `INSERT INTO tasks set ?`
    connection.query(addarticleSql, { username, title, body }, (err, result) => {
        if (err) {
            res.json({
                status: 0,
                message: 'insert false' + err
            })
        }
        res.json({
            status: 1,
            message: 'insert success',
            data: result
        })
    })
}

export default addArticle