import connection from "../../APIs/connection_db.js";
import jwt from 'jsonwebtoken';

const addUserQuery = 'INSERT INTO stickytasks.userinformation (username, password, token) VALUES (?, ?, ?)';

const createUser = (req, res) => {
    const { username, password } = req.query;
    console.log(username, password);

    try {
        jwt.sign({ username, password }, 'wawdasd', async (err, token) => {
            if (err) {
                console.error('Error signing JWT:', err);
                return res.json({
                    status: 0,
                    message: 'Failed to sign JWT',
                });
            }

            await connection.query(addUserQuery, [username, password, token], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.json({
                        status: 0,
                        message: 'Failed to create user',
                    });
                }

                res.json({
                    status: 1,
                    message: 'User created successfully',
                    username,
                    token,
                    id: result.insertId
                });
            });
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.json({
            status: 0,
            message: 'An error occurred',
        });
    }
};

export default createUser;
