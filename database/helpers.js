const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');


module.exports = async function () {
	const DB = {};

	DB.db = await open({
		filename: path.join(__dirname, 'DB.db'),
		driver: sqlite3.Database
	});

	DB.getAll = async function() {
		return {
			_abb: await this.db.all('SELECT * FROM _abb'),
			_col: await this.db.all('SELECT * FROM _col'),
			ach: await this.db.all('SELECT * FROM ach'),
			coc: await this.db.all('SELECT * FROM coc'),
			edu: await this.db.all('SELECT * FROM edu'),
			exp: await this.db.all('SELECT * FROM exp'),
			ext: await this.db.all('SELECT * FROM ext'),
			int: await this.db.all('SELECT * FROM int'),
			mis: await this.db.all('SELECT * FROM mis'),
			per: await this.db.all('SELECT * FROM per'),
			pro: await this.db.all('SELECT * FROM pro'),
			ski: await this.db.all('SELECT * FROM ski'),
			tra: await this.db.all('SELECT * FROM tra'),
		};
	};

	return DB;
};
