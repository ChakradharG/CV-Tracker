# CV-Tracker
This application lets you create and manage a pool of all of your achievements. You can use this pool when building a resume and pick the achievements that are relevant to the position you are applying for.

<br>

## Getting Started
* Clone this repository `git clone https://github.com/ChakradharG/CV-Tracker.git`
* `cd CV-Tracker`
* `npm install` to install dependencies
* Edit `package.json` and set the icon's extension depending upon your OS (`.ico` for Windows, `.png` for Linux and `.icns` for MacOS)
* `npm run make`
* The executable application will be created in the `CV-Tracker/out/cv-tracker-{architecture}/` directory

<br>

## How to Use
* Run the application, go to the Add tab and start adding events
* You can view and edit the events in the Home tab (right click on an event row to edit it)
* If a column is set as a collapsible column (accessed by right clicking on a column name), all rows in that table having the same value in the collapsible column will be bunched together (a table can have atmost 1 collapsible column)
* Columns with names `Level` and `Duration` are special in that they display the value differently than how it is stored
* `Level` column expects a value between 0 and 5 inclusive, and displays it as: `●●●○○` (if the value is 3)
* Date should be in YYYY-MM-DD:YYYY-MM-DD format where the first date is the start date and the second date is the end date (optional)
* Example of single date: `2021-12-20`. Example of start and end date: `2020-01-08:2021-12-20`
* You can visualize a timeline of the events in the Timeline tab (if an event doesn't have a duration, it won't appear on the timeline)
* To get a backup of your database, go to `CV-Tracker/out/cv-tracker-{architecture}/resources/app/database/` directory and execute either `sqlite3 DB.db .dump > DB-dump.sql` or the following commands
```
sqlite3 DB.db
.once DB-dump.sql
.dump
```
* To restore your database from a backup file, copy the `DB-dump.sql` file into `CV-Tracker/out/cv-tracker-{architecture}/resources/app/database/` directory and execute either `sqlite3 DB.db < DB-dump.sql` or the following commands
```
sqlite3 DB.db
.read DB-dump.sql
```