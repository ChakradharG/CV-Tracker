PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS `abbreviations`;
CREATE TABLE `abbreviations` (
	`sform` TEXT NOT NULL,
	`fform` TEXT NOT NULL
);

DROP TABLE IF EXISTS `achievements`;
CREATE TABLE `achievements` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `cocurricular`;
CREATE TABLE `co-curricular` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
	`title` TEXT NOT NULL,
	`institue` TEXT NOT NULL,
	`gpa/%` REAL NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `experience`;
CREATE TABLE `experience` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `extracurricular`;
CREATE TABLE `extra-curricular` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `internships`;
CREATE TABLE `internships` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `miscellaneous`;
CREATE TABLE `miscellaneous` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT
);

DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL
);

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
	`domain` TEXT NOT NULL,
	`title` TEXT NOT NULL,
	`level` INTEGER NOT NULL
);

DROP TABLE IF EXISTS `training`;
CREATE TABLE `training` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

COMMIT;
