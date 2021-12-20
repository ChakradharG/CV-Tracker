const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');


(async () => {
	const db = await open({
		filename: path.join(__dirname, 'DB.db'),
		driver: sqlite3.Database
	});

	await db.run("PRAGMA foreign_keys=OFF");
	await db.run("BEGIN TRANSACTION");
	await db.run("DROP TABLE IF EXISTS `_abb`");
	await db.run("CREATE TABLE `_abb` (`sform` TEXT NOT NULL, `fform` TEXT NOT NULL)");
	await db.run("INSERT INTO `_abb` VALUES('ach', 'Achievements')");
	await db.run("INSERT INTO `_abb` VALUES('coc', 'Co-Curricular Activities')");
	await db.run("INSERT INTO `_abb` VALUES('edu', 'Educational Qualifications')");
	await db.run("INSERT INTO `_abb` VALUES('exp', 'Work Experience')");
	await db.run("INSERT INTO `_abb` VALUES('ext', 'Extra-Curricular Activities')");
	await db.run("INSERT INTO `_abb` VALUES('int', 'Internships')");
	await db.run("INSERT INTO `_abb` VALUES('mis', 'Miscellaneous')");
	await db.run("INSERT INTO `_abb` VALUES('per', 'Personal Details')");
	await db.run("INSERT INTO `_abb` VALUES('pro', 'Projects')");
	await db.run("INSERT INTO `_abb` VALUES('ski', 'Skills/Expertise')");
	await db.run("INSERT INTO `_abb` VALUES('tra', 'Training/Workshops')");
	await db.run("DROP TABLE IF EXISTS `_col`");
	await db.run("CREATE TABLE `_col` (`sform` TEXT NOT NULL, `column` TEXT)");
	await db.run("INSERT INTO `_col` VALUES('ach', 'Title')");
	await db.run("INSERT INTO `_col` VALUES('coc', 'Title')");
	await db.run("INSERT INTO `_col` VALUES('edu', 'Institute')");
	await db.run("INSERT INTO `_col` VALUES('exp', 'Organization')");
	await db.run("INSERT INTO `_col` VALUES('ext', 'Title')");
	await db.run("INSERT INTO `_col` VALUES('int', 'Organization')");
	await db.run("INSERT INTO `_col` VALUES('mis', 'Title')");
	await db.run("INSERT INTO `_col` VALUES('per', 'Title')");
	await db.run("INSERT INTO `_col` VALUES('pro', NULL)");
	await db.run("INSERT INTO `_col` VALUES('ski', 'Domain')");
	await db.run("INSERT INTO `_col` VALUES('tra', NULL)");
	await db.run("DROP TABLE IF EXISTS `ach`");
	await db.run("CREATE TABLE `ach` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `coc`");
	await db.run("CREATE TABLE `coc` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `edu`");
	await db.run("CREATE TABLE `edu` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Institute` TEXT NOT NULL, `GPA/%` REAL NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `exp`");
	await db.run("CREATE TABLE `exp` (`id` INTEGER PRIMARY KEY NOT NULL, `Organization` TEXT NOT NULL, `Position` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `ext`");
	await db.run("CREATE TABLE `ext` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `int`");
	await db.run("CREATE TABLE `int` (`id` INTEGER PRIMARY KEY NOT NULL, `Organization` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `mis`");
	await db.run("CREATE TABLE `mis` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT)");
	await db.run("DROP TABLE IF EXISTS `per`");
	await db.run("CREATE TABLE `per` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `pro`");
	await db.run("CREATE TABLE `pro` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("DROP TABLE IF EXISTS `ski`");
	await db.run("CREATE TABLE `ski` (`id` INTEGER PRIMARY KEY NOT NULL, `Domain` TEXT NOT NULL, `Skill` TEXT NOT NULL, `Level` INTEGER NOT NULL, `Duration` TEXT)");
	await db.run("DROP TABLE IF EXISTS `tra`");
	await db.run("CREATE TABLE `tra` (`id` INTEGER PRIMARY KEY NOT NULL, `Title` TEXT NOT NULL, `Description` TEXT NOT NULL, `Duration` TEXT NOT NULL)");
	await db.run("COMMIT");

	db.close();
})();
