PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS `_abb`;	-- Abbreviations
CREATE TABLE `_abb` (
	`sform` TEXT NOT NULL,
	`fform` TEXT NOT NULL
);
INSERT INTO `_abb` VALUES('ach', 'Achievements');
INSERT INTO `_abb` VALUES('coc', 'Co-Curricular Activities');
INSERT INTO `_abb` VALUES('edu', 'Educational Qualifications');
INSERT INTO `_abb` VALUES('exp', 'Work Experience');
INSERT INTO `_abb` VALUES('ext', 'Extra-Curricular Activities');
INSERT INTO `_abb` VALUES('int', 'Internships');
INSERT INTO `_abb` VALUES('mis', 'Miscellaneous');
INSERT INTO `_abb` VALUES('per', 'Personal Details');
INSERT INTO `_abb` VALUES('pro', 'Projects');
INSERT INTO `_abb` VALUES('ski', 'Skills/Expertise');
INSERT INTO `_abb` VALUES('tra', 'Training/Workshops');

DROP TABLE IF EXISTS `_col`;	--Collapsible Columns
CREATE TABLE `_col` (
	`sform` TEXT NOT NULL,
	`column` TEXT
);
INSERT INTO `_col` VALUES('ach', 'Title');
INSERT INTO `_col` VALUES('coc', 'Title');
INSERT INTO `_col` VALUES('edu', 'Institute');
INSERT INTO `_col` VALUES('exp', 'Organization');
INSERT INTO `_col` VALUES('ext', 'Title');
INSERT INTO `_col` VALUES('int', 'Organization');
INSERT INTO `_col` VALUES('mis', 'Title');
INSERT INTO `_col` VALUES('per', 'Title');
INSERT INTO `_col` VALUES('pro', NULL);
INSERT INTO `_col` VALUES('ski', 'Domain');
INSERT INTO `_col` VALUES('tra', NULL);

DROP TABLE IF EXISTS `ach`;
CREATE TABLE `ach` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `coc`;
CREATE TABLE `coc` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `edu`;
CREATE TABLE `edu` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Institute` TEXT NOT NULL,
	`GPA/%` REAL NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `exp`;
CREATE TABLE `exp` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Organization` TEXT NOT NULL,
	`Position` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `ext`;
CREATE TABLE `ext` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `int`;
CREATE TABLE `int` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Organization` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `mis`;
CREATE TABLE `mis` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT
);

DROP TABLE IF EXISTS `per`;
CREATE TABLE `per` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL
);

DROP TABLE IF EXISTS `pro`;
CREATE TABLE `pro` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `ski`;
CREATE TABLE `ski` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Domain` TEXT NOT NULL,
	`Skill` TEXT NOT NULL,
	`Level` INTEGER NOT NULL,
	`Duration` TEXT
);

DROP TABLE IF EXISTS `tra`;
CREATE TABLE `tra` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`Title` TEXT NOT NULL,
	`Description` TEXT NOT NULL,
	`Duration` TEXT NOT NULL
);

COMMIT;
