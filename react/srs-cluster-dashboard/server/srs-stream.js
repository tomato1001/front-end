var db = require('./db');

const QUERY_STREAM_SQL = "SELECT name, srs_server_id, node_ip, client_id, app_name, created_date from stream order by created_date desc limit {start},{size}";
const COUNT_STREAM_SQL = "SELECT count(0) c from stream";

class SrsStream {
    
    paginate(offset, pageSize, cb) {
        db.pagenateQuery(
            COUNT_STREAM_SQL,
            QUERY_STREAM_SQL,
            offset,
            pageSize,
            cb
        );
    }
}

module.exports = new SrsStream();