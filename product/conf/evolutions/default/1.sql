-- !Ups

-- Abstract data field
CREATE TABLE data_field (
 id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 is_required BIT(1) NOT NULL,
 order_number INT NOT NULL
);

-- Abstract data value
CREATE TABLE data_value (
 id INT NOT NULL PRIMARY KEY
);

-- Number-typed field
CREATE TABLE number_data_field (
 field_id INT NOT NULL PRIMARY KEY,

 FOREIGN KEY (field_id) REFERENCES data_field (id)
);

-- Number-typed value
CREATE TABLE number_value (
 id INT NOT NULL PRIMARY KEY,
 value INT NOT NULL,

 FOREIGN KEY (id) REFERENCES data_value (id)
);

-- Progress
CREATE TABLE progress (
 id INT NOT NULL PRIMARY KEY,
 order_number INT NOT NULL,
 name VARCHAR(255) NOT NULL
);
INSERT INTO progress values (1, 1, 'アポイント');
INSERT INTO progress values (2, 2, '事前準備');
INSERT INTO progress values (3, 3, 'プレゼンテーション');
INSERT INTO progress values (4, 4, 'クロージング');
INSERT INTO progress values (5, 5, '受注');
INSERT INTO progress values (6, 6, '失注');

-- Select-typed field
CREATE TABLE select_data_field (
 field_id INT NOT NULL PRIMARY KEY,

 FOREIGN KEY (field_id) REFERENCES data_field (id)
);

-- Select-typed options
CREATE TABLE select_option (
 id INT NOT NULL,
 field_id INT NOT NULL,
 value VARCHAR(255),
 order_number INT NOT NULL,

 PRIMARY KEY (id,field_id),

 FOREIGN KEY (field_id) REFERENCES select_data_field (field_id)
);

-- Custom Sheet
-- type:1 Company
-- type:2 Person
-- type:3 Opportunity
-- type:4 Report
-- type:5 Schedule
CREATE TABLE sheet (
 id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 detail VARCHAR(255),
 order_number INT NOT NULL,
 type INT NOT NULL
);

-- Custom Sheet Data
CREATE TABLE sheet_data (
 sheet_id INT NOT NULL,
 field_id INT NOT NULL,
 value_id INT NOT NULL,

 PRIMARY KEY (sheet_id,field_id,value_id),

 FOREIGN KEY (sheet_id) REFERENCES sheet (id),
 FOREIGN KEY (field_id) REFERENCES data_field (id),
 FOREIGN KEY (value_id) REFERENCES data_value (id)
);

-- Text-typed field
CREATE TABLE text_data_field (
 field_id INT NOT NULL PRIMARY KEY,

 FOREIGN KEY (field_id) REFERENCES data_field (id)
);

-- Text-typed value
CREATE TABLE text_value (
 id INT NOT NULL PRIMARY KEY,
 value VARCHAR(255) NOT NULL,

 FOREIGN KEY (id) REFERENCES data_value (id)
);

-- User account
-- Stores any info about authentication/authorization in this table
CREATE TABLE user_account (
 id INT NOT NULL PRIMARY KEY,
 password VARCHAR(255)
);
INSERT INTO user_account values (1, 'password');
INSERT INTO user_account values (2, 'password');


-- Checbox-typed field
CREATE TABLE checkbox_data_field (
 field_id INT NOT NULL PRIMARY KEY,

 FOREIGN KEY (field_id) REFERENCES data_field (id)
);

-- Checkbox-typed value
CREATE TABLE checkbox_value (
 id INT NOT NULL PRIMARY KEY,

 FOREIGN KEY (id) REFERENCES data_value (id)
);

-- Checkbox-typed options
CREATE TABLE checkbox_option (
 id INT NOT NULL,
 field_id INT NOT NULL,
 value VARCHAR(10) NOT NULL,
 order_number INT NOT NULL,

 PRIMARY KEY (id,field_id),

 FOREIGN KEY (field_id) REFERENCES checkbox_data_field (field_id)
);

-- Selected Checkbox value
CREATE TABLE SelectedCheckbox (
 value_id INT NOT NULL,
 option_id INT NOT NULL,
 field_id INT NOT NULL,

 PRIMARY KEY (value_id,option_id,field_id),

 FOREIGN KEY (value_id) REFERENCES checkbox_value (id),
 FOREIGN KEY (option_id,field_id) REFERENCES checkbox_option (id,field_id)
);

-- Select-typed value
CREATE TABLE select_value (
 id INT NOT NULL PRIMARY KEY,
 option_id INT,
 field_id INT,

 FOREIGN KEY (id) REFERENCES data_value (id),
 FOREIGN KEY (option_id,field_id) REFERENCES select_option (id,field_id)
);

-- User
CREATE TABLE user (
 account_id INT NOT NULL PRIMARY KEY,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 department VARCHAR(255),
 position VARCHAR(255),
 tel VARCHAR(255),

 FOREIGN KEY (account_id) REFERENCES user_account (id)
);
INSERT INTO user values (1, '山田', '太郎', '営業部', '主任', '00-0000-0000');
INSERT INTO user values (2, '田中', '勇気', '営業部', '主任', '00-0000-0000');

-- Company
CREATE TABLE company (
 id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 field VARCHAR(255),
 address VARCHAR(255),
 tel VARCHAR(255),
 fax VARCHAR(255),
 email VARCHAR(255),
 url VARCHAR(255),
 correspondence_id INT,

 FOREIGN KEY (correspondence_id) REFERENCES user (account_id)
);
INSERT INTO company values (1, '株式会社シノビ', 'IT産業', '東京都渋谷区渋谷0-0-0', '00-0000-0000', '00-0000-0000',
'info@example.com', 'http://shinobi.example.com', 1);
INSERT INTO company values (2, '株式会社サムライ', 'IT産業', '東京都渋谷区渋谷8-8-8', '88-8888-8888', '88-8888-8888',
'info@example.com', 'http://samurai.example.com', null);

-- Company custom sheet
CREATE TABLE company_sheet (
 company_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (company_id,sheet_id),

 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (id)
);

-- Person
CREATE TABLE person (
 id INT NOT NULL PRIMARY KEY,
 company_id INT,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 department VARCHAR(10),
 position VARCHAR(255) NOT NULL,
 tel VARCHAR(255),
 email VARCHAR(255),
 correspondence_id INT,

 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY (correspondence_id) REFERENCES user (account_id)
);
INSERT INTO person values (1, 1, '山本', '志信', '技術開発部', '部長', '00-0000-0000',
'info@example.com', 1);
INSERT INTO person values (2, null, '佐藤', '仁', '技術開発部', '部長', '88-8888-8888',
'info@example.com', null);

-- Custom person sheet
CREATE TABLE person_sheet (
 person_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (person_id,sheet_id),

 FOREIGN KEY (person_id) REFERENCES person (id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (id)
);

-- Opportunity
CREATE TABLE opportunity (
 id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 amount INT,
 progress_id INT NOT NULL,
 company_id INT,
 person_id INT,
 correspondence_id INT,

 FOREIGN KEY (progress_id) REFERENCES progress (id),
 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY (person_id) REFERENCES person (id),
 FOREIGN KEY (correspondence_id) REFERENCES user (account_id)
);
INSERT INTO opportunity values (1, 'Startup Project',100000000, 1, 1, 1, 1);
INSERT INTO opportunity values (2, 'Startup Project',100000000, 1, null, null, null);

-- Custom opportunity sheet
CREATE TABLE opportunity_sheet (
 sheet_id INT NOT NULL,
 id INT NOT NULL,

 PRIMARY KEY (sheet_id,id),

 FOREIGN KEY (sheet_id) REFERENCES sheet (id),
 FOREIGN KEY (id) REFERENCES opportunity (id)
);

-- Schedule
CREATE TABLE schedule (
 id INT NOT NULL PRIMARY KEY,
 is_all_day BIT(1) DEFAULT 0 NOT NULL,
 start_date DATETIME NOT NULL,
 end_date DATETIME NOT NULL,
 title VARCHAR(255) NOT NULL,
 note VARCHAR(255),
 company_id INT,
 person_id INT,
 opportunity_id INT,

 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY (person_id) REFERENCES person (id),
 FOREIGN KEY (opportunity_id) REFERENCES opportunity (id)
);
INSERT INTO schedule values (1, TRUE, '2020-09-29 00:00:00', '2020-09-30 00:00:00', '休日', 'test', 1, 1, 1);
INSERT INTO schedule values (2, TRUE, '2020-09-29 00:00:00', '2020-09-30 00:00:00', '休日', 'test', null, null, null);
INSERT INTO schedule values (3, TRUE, '2020-09-29 00:00:00', '2020-09-30 00:00:00', '休日', 'test', null, null, null);

-- Assigned schedule member
CREATE TABLE schedule_member (
 schedule_id INT NOT NULL,
 account_id INT NOT NULL,

 PRIMARY KEY (schedule_id,account_id),

 FOREIGN KEY (schedule_id) REFERENCES schedule (id),
 FOREIGN KEY (account_id) REFERENCES user (account_id)
);
INSERT INTO schedule_member values (1, 1);
INSERT INTO schedule_member values (1, 2);
INSERT INTO schedule_member values (2, 1);


-- Custom schedule sheet
CREATE TABLE schedule_sheet (
 schedule_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (schedule_id,sheet_id),

 FOREIGN KEY (schedule_id) REFERENCES schedule (id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (id)
);

-- Daily report
CREATE TABLE report (
 id INT NOT NULL PRIMARY KEY,
 date DATETIME NOT NULL,
 note VARCHAR(255),
 company_id INT,
 person_id INT,
 opportunity_id INT,
 report_user_id INT NOT NULL,

 FOREIGN KEY (company_id) REFERENCES company (id),
 FOREIGN KEY (person_id) REFERENCES person (id),
 FOREIGN KEY (opportunity_id) REFERENCES opportunity (id),
 FOREIGN KEY (report_user_id) REFERENCES user (account_id)
);
INSERT INTO report values (1, '2020-09-29 00:00:00', 'test', 1, 1, 1, 1);
INSERT INTO report values (2, '2020-09-29 00:00:00', 'test', null, null, null, 1);

-- Custom report sheet
CREATE TABLE report_sheet (
 report_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (report_id,sheet_id),

 FOREIGN KEY (report_id) REFERENCES report (id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (id)
);


-- !Downs
DROP TABLE data_field CASCADE CONSTRAINTS;
DROP TABLE data_value CASCADE CONSTRAINTS;
DROP TABLE number_data_field CASCADE CONSTRAINTS;
DROP TABLE number_value CASCADE CONSTRAINTS;
DROP TABLE progress CASCADE CONSTRAINTS;
DROP TABLE select_data_field CASCADE CONSTRAINTS;
DROP TABLE select_option CASCADE CONSTRAINTS;
DROP TABLE sheet CASCADE CONSTRAINTS;
DROP TABLE sheet_data CASCADE CONSTRAINTS;
DROP TABLE text_data_field CASCADE CONSTRAINTS;
DROP TABLE text_value CASCADE CONSTRAINTS;
DROP TABLE user_account CASCADE CONSTRAINTS;
DROP TABLE checkbox_data_field CASCADE CONSTRAINTS;
DROP TABLE checkbox_value CASCADE CONSTRAINTS;
DROP TABLE checkbox_option CASCADE CONSTRAINTS;
DROP TABLE select_value CASCADE CONSTRAINTS;
DROP TABLE SelectedCheckbox CASCADE CONSTRAINTS;
DROP TABLE user CASCADE CONSTRAINTS;
DROP TABLE company CASCADE CONSTRAINTS;
DROP TABLE person_sheet CASCADE CONSTRAINTS;
DROP TABLE person CASCADE CONSTRAINTS;
DROP TABLE company_sheet CASCADE CONSTRAINTS;
DROP TABLE opportunity CASCADE CONSTRAINTS;
DROP TABLE schedule CASCADE CONSTRAINTS;
DROP TABLE schedule_menber CASCADE CONSTRAINTS;
DROP TABLE opportunity_sheet CASCADE CONSTRAINTS;
DROP TABLE schedule_sheet CASCADE CONSTRAINTS;
DROP TABLE report CASCADE CONSTRAINTS;
DROP TABLE report_sheet CASCADE CONSTRAINTS;