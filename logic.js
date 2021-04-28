const connection = require('./config/connection');

const fetchRole = (res) => {
    connection.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err;
        res(result);
    });
};

module.exports = {
    fetchRole
};