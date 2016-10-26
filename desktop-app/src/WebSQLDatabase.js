export default  class WebSQLDatabase {
	constructor() {
		this._db = openDatabase('mydb', '1.0', '', 5 * 1024 * 1024);
	}

	get db() {
		return this._db;
	}
}