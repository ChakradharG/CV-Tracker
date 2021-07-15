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
	`table` TEXT NOT NULL,
	`column` TEXT
);
INSERT INTO `_col` VALUES('ach', 'title');
INSERT INTO `_col` VALUES('coc', 'title');
INSERT INTO `_col` VALUES('edu', NULL);
INSERT INTO `_col` VALUES('exp', 'organization');
INSERT INTO `_col` VALUES('ext', 'title');
INSERT INTO `_col` VALUES('int', 'organization');
INSERT INTO `_col` VALUES('mis', 'title');
INSERT INTO `_col` VALUES('per', 'title');
INSERT INTO `_col` VALUES('pro', NULL);
INSERT INTO `_col` VALUES('ski', 'domain');
INSERT INTO `_col` VALUES('tra', NULL);

DROP TABLE IF EXISTS `ach`;
CREATE TABLE `ach` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `coc`;
CREATE TABLE `coc` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `edu`;
CREATE TABLE `edu` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`institute` TEXT NOT NULL,
	`gpa/%` REAL NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `exp`;
CREATE TABLE `exp` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`organization` TEXT NOT NULL,
	`position` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `ext`;
CREATE TABLE `ext` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `int`;
CREATE TABLE `int` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`organization` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `mis`;
CREATE TABLE `mis` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT
);

DROP TABLE IF EXISTS `per`;
CREATE TABLE `per` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL
);

DROP TABLE IF EXISTS `pro`;
CREATE TABLE `pro` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `ski`;
CREATE TABLE `ski` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`domain` TEXT NOT NULL,
	`skill` TEXT NOT NULL,
	`level` INTEGER NOT NULL,
	`duration` TEXT
);

DROP TABLE IF EXISTS `tra`;
CREATE TABLE `tra` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

COMMIT;
