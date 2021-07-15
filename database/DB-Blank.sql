PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS `abbreviations`;
CREATE TABLE `abbreviations` (
	`sform` TEXT NOT NULL,
	`fform` TEXT NOT NULL
);

DROP TABLE IF EXISTS `achievements`;
CREATE TABLE `achievements` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `cocurricular`;
CREATE TABLE `cocurricular` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`institute` TEXT NOT NULL,
	`gpa/%` REAL NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `experience`;
CREATE TABLE `experience` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`organization` TEXT NOT NULL,
	`position` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `extracurricular`;
CREATE TABLE `extracurricular` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `internships`;
CREATE TABLE `internships` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`organization` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `miscellaneous`;
CREATE TABLE `miscellaneous` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT
);

DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL
);

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`domain` TEXT NOT NULL,
	`skill` TEXT NOT NULL,
	`level` INTEGER NOT NULL
);

DROP TABLE IF EXISTS `training`;
CREATE TABLE `training` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);

COMMIT;
