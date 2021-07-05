PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
	`title` TEXT NOT NULL,
	`institue` TEXT NOT NULL,
	`gpa/%` REAL NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `work experience`;
CREATE TABLE `work experience` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `achievements`;
CREATE TABLE `achievements` (
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

DROP TABLE IF EXISTS `co-curricular activities`;
CREATE TABLE `co-curricular activities` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `training/workshops`;
CREATE TABLE `training/workshops` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `extra-curricular activities`;
CREATE TABLE `extra-curricular activities` (
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

DROP TABLE IF EXISTS `personal details`;
CREATE TABLE `personal details` (
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL
);

DROP TABLE IF EXISTS `skills/expertise`;
CREATE TABLE `skills/expertise` (
	`domain` TEXT NOT NULL,
	`title` TEXT NOT NULL,
	`level` INTEGER NOT NULL
);

COMMIT;
