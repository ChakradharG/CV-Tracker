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

	DB.getCol = async function(table) {
		return await this.db.all(`PRAGMA table_info(${table})`);
	};

	DB.add = async function(entity) {
		try {
			await this.db.run(`INSERT INTO ${entity.tableID}(${entity.columnNames}) VALUES(${entity.values})`);
		} catch (error) {
			console.log(error);
		}
	};

	DB.update = async function(entity) {
		try {
			if (entity.type === 'table') {
				await this.db.run('UPDATE _abb SET fform = ? WHERE sform = ?', entity.newValue, entity.tableID);
			} else if (entity.type === 'column') {
				await this.db.run(`ALTER TABLE ${entity.tableID} RENAME COLUMN ${entity.oldValue} TO ${entity.newValue}`);	// No placeholder for table/column names

				if (entity.updateCol) {
					await this.db.run('UPDATE _col SET column = ? WHERE sform = ?', entity.collapsibleColumn, entity.tableID);
				}
			} else if (entity.type === 'row') {
				if (entity.column === entity.collapsibleColumn) {
					await this.db.run(`UPDATE ${entity.tableID} SET ${entity.column} = ? WHERE ${entity.column} = ?`, entity.newValue, entity.oldValue);
				} else {
					await this.db.run(`UPDATE ${entity.tableID} SET ${entity.column} = ? WHERE id = ?`, entity.newValue, entity.id);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	DB.remove = async function(entity) {
		try {
			await this.db.run(`DELETE FROM ${entity.tableID} WHERE id = ?`, entity.id);
		} catch (error) {
			console.log(error);
		}
	};

	return DB;
};
