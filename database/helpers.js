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
			abb: await this.db.all('SELECT * FROM abbreviations'),
			ach: await this.db.all('SELECT * FROM achievements'),
			coc: await this.db.all('SELECT * FROM cocurricular'),
			edu: await this.db.all('SELECT * FROM education'),
			exp: await this.db.all('SELECT * FROM experience'),
			ext: await this.db.all('SELECT * FROM extracurricular'),
			int: await this.db.all('SELECT * FROM internships'),
			mis: await this.db.all('SELECT * FROM miscellaneous'),
			per: await this.db.all('SELECT * FROM personal'),
			pro: await this.db.all('SELECT * FROM projects'),
			ski: await this.db.all('SELECT * FROM skills'),
			tra: await this.db.all('SELECT * FROM training'),
		};
	};

	return DB;
};
