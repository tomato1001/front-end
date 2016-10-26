var db = require('./db');
var Pager = db.Pager;

const QUERY_STREAM_SQL = "SELECT name, srs_server_id, node_ip, client_id, created_date from stream limit {start},{size}";
const COUNT_STREAM_SQL = "SELECT count(0) c from stream";

class SrsStream {
    
    paginate(pageNumber, pageSize, cb) {
        var pager = new Pager(pageNumber, pageSize);
        db.pagenateQuery(
            COUNT_STREAM_SQL,
            QUERY_STREAM_SQL,
            pager.offset,
            pager.pageSize,
            cb
        );
    }
}

module.exports = new SrsStream();