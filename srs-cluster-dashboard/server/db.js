const mysql = require('mysql');
const async = require('async');
const format = require("string-template");
const _ = require('lodash');

const pool = mysql.createPool({
    connectionLimit: 10,
    host     : '172.17.230.194',
    user     : 'root',
    password : 'root',
    database : 'ovsp_srs_cluster',
    timezone : 'Asia/Shanghai'
    // debug    : true
});

function doInConnection(cb) {
    pool.getConnection(
        (err, conn) => {
            cb(err, conn);
        }
    );
}

function query(sql, callback) {
    doInConnection(
        (err, conn) => {
            async.waterfall([
                (callback) => {
                    conn.query(sql, (err, rows, fields) => {
                        callback(err, rows, fields);
                    });
                },
                (rows, fields, callback) => {
                    callback(null, rows.map(v => _.assign({}, v)));
                }
            ], (err, results) => {
                conn.release();
                callback(results, err);
            });
        }
    );
}

function pagenateQuery(countSql, querySql, offset, size, callback) {
    doInConnection(
        (err, conn) => {
            async.waterfall([
                (callback) => {
                    conn.query(countSql, (err, rows, fields) => {
                        callback(err, rows[0].c, fields);
                    });
                },
                (rowCount, fields, callback) => {
                    const start = offset >= rowCount ? 0 : offset;
                    conn.query(format(querySql, {start: start , size: size}), (err, rows, fields) => {
                        callback(null, rows.map(v => _.assign({}, v)), rowCount, offset);
                    });
                }
            ], (err, results, rowCount, offset) => {
                conn.release();
                callback(results, rowCount, offset, err);
            });
        }
    );
}

exports.pool = pool;
exports.doInConnection = doInConnection;
exports.query = query;
exports.pagenateQuery = pagenateQuery;
