-- Run these once in your MySQL
CREATE DATABASE IF NOT EXISTS feedbackdb;
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'apppass';
GRANT ALL PRIVILEGES ON feedbackdb.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
