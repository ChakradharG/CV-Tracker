PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `education` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`institue` TEXT NOT NULL,
	`gpa/%` REAL NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `work experience` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `achievements` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `internships` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `co-curricular activities` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `projects` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `training/workshops` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `extra-curricular activities` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT NOT NULL
);
CREATE TABLE `miscellaneous` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`duration` TEXT
);
CREATE TABLE `personal details` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL
	);
CREATE TABLE `skills/expertise` (
	`id` INTEGER PRIMARY KEY NOT NULL,
	`domain` TEXT NOT NULL,
	`title` TEXT NOT NULL,
	`level` INTEGER NOT NULL
);
COMMIT;
