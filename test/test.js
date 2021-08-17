const expect = require('chai').expect;


describe('DB', () => {
	describe('#getAll()', () => {
		it('should return object with arrays of rows from all tables in database', async () => {
			const DB = await require('../database/helpers')();
			const res = await DB.getAll();
			expect(res).to.be.a('object');
		});
	});
});
