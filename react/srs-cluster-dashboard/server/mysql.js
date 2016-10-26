var mysql = require('mysql');

// Simple
// var connection = mysql.createConnection({
//   host     : '172.17.230.194',
//   user     : 'root',
//   password : 'root',
//   database : 'ovsp_srs_cluster'
// });
// 
// connection.connect();
// 
// connection.query('SELECT id, ip, vhost, app_name from srs_origin_server', function(err, rows, fields) {
//   if (err) throw err;
//   for (var i = 0; i < rows.length; i++) {
//     console.log(rows[i]);
//   }
// });
// 
// connection.end();

var pool = mysql.createPool({
    connectionLimit: 10,
    host     : '172.17.230.194',
    user     : 'root',
    password : 'root',
    database : 'ovsp_srs_cluster'  
});

var getSrsOriginServers = function (cb) {
  pool.getConnection(function (err, conn) {
    conn.query('SELECT id, ip, vhost, app_name from srs_origin_server', function(err, rows, fields) {
      conn.release();
      cb(rows);
    });
  });
}

getSrsOriginServers(function (result) {
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].vhost);
  }
});

process.on('exit', function (code) {
  console.log(code);
});

// process.on ('SIGINT', function () {
//   pool.end();
// });

