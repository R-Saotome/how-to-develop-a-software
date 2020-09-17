-- !Ups
CREATE TABLE sheet (
 sheet_id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255),
 detail VARCHAR(255),
 order_number INT,
 type INT NOT NULL
);


CREATE TABLE text_field (
 field_id INT NOT NULL PRIMARY KEY,
 sheet_id INT NOT NULL,
 value VARCHAR(255),
 name VARCHAR(255),
 is_required BOOLEAN,
 order_number INT,

 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE progress (
 progress_id INT NOT NULL PRIMARY KEY,
 order_number INT,
 name VARCHAR(255)
);
INSERT INTO progress values (1, 1, 'アポイント');
INSERT INTO progress values (2, 2, '事前準備');
INSERT INTO progress values (3, 3, 'プレゼンテーション');
INSERT INTO progress values (4, 4, 'クロージング');
INSERT INTO progress values (5, 5, '受注');
INSERT INTO progress values (6, 6, '失注');

CREATE TABLE user_account (
 id INT NOT NULL PRIMARY KEY,
 password VARCHAR(255)
);
INSERT INTO user_account values (1, 'password');


CREATE TABLE checkbox_field (
 field_id INT NOT NULL PRIMARY KEY,
 sheet_id INT NOT NULL,
 name VARCHAR(255),
 is_required BOOLEAN,
 order_number INT,

 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE checkbox_value (
 value_id INT NOT NULL PRIMARY KEY,
 field_id INT NOT NULL,
 name VARCHAR(255),
 is_default BOOLEAN,
 value VARCHAR(255),
 order_number INT,

 FOREIGN KEY (field_id) REFERENCES checkbox_field (field_id)
);


CREATE TABLE number_field (
 field_id INT NOT NULL PRIMARY KEY,
 sheet_id INT NOT NULL,
 value DOUBLE PRECISION,
 name VARCHAR(255),
 is_required BOOLEAN,
 order_number INT,

 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE select_field (
 field_id INT NOT NULL PRIMARY KEY,
 sheet_id INT NOT NULL,
 value INT,
 name VARCHAR(255),
 is_required BOOLEAN,
 order_number INT,

 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE select_value (
 value_id INT NOT NULL PRIMARY KEY,
 field_id INT NOT NULL,
 name VARCHAR(255),
 is_default BOOLEAN,
 value VARCHAR(255),
 order_number INT,

 FOREIGN KEY (field_id) REFERENCES select_field (field_id)
);


CREATE TABLE user (
 account_id INT NOT NULL PRIMARY KEY,
 first_name VARCHAR(255),
 last_name VARCHAR(255),
 department VARCHAR(255),
 position VARCHAR(255),
 tel VARCHAR(255),

 FOREIGN KEY (account_id) REFERENCES user_account (id)
);
INSERT INTO user values (1, '山田', '太郎', '営業部', '主任', '00-0000-0000');


CREATE TABLE checked_value (
 field_id INT NOT NULL,
 value_id INT NOT NULL,

 PRIMARY KEY (field_id,value_id),

 FOREIGN KEY (field_id) REFERENCES checkbox_field (field_id),
 FOREIGN KEY (value_id) REFERENCES checkbox_value (value_id)
);


CREATE TABLE company (
 company_id INT NOT NULL PRIMARY KEY,
 name VARCHAR(255),
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



CREATE TABLE company_sheet (
 company_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (company_id,sheet_id),

 FOREIGN KEY (company_id) REFERENCES company (company_id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE person (
 person_id INT NOT NULL PRIMARY KEY,
 company_id INT,
 firstName VARCHAR(255),
 lastName VARCHAR(255),
 department VARCHAR(255),
 position VARCHAR(255),
 tel VARCHAR(255),
 email VARCHAR(255),
 correspondence_id INT,

 FOREIGN KEY (correspondence_id) REFERENCES user (account_id),
 FOREIGN KEY (company_id) REFERENCES company (company_id)
);
INSERT INTO person values (1, 1, '山本', '志信', '技術開発部', '部長', '00-0000-0000',
'info@example.com', 1);

CREATE TABLE person_sheet (
 person_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (person_id,sheet_id),

 FOREIGN KEY (person_id) REFERENCES person (person_id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE opportunity (
 opportunity_id INT NOT NULL PRIMARY KEY,
 company_id INT,
 person_id INT,
 name VARCHAR(255),
 amount INT,
 progress_id INT,
 correspondence_id INT,

 FOREIGN KEY (correspondence_id) REFERENCES user (account_id),
 FOREIGN KEY (company_id) REFERENCES company (company_id),
 FOREIGN KEY (person_id) REFERENCES person (person_id),
 FOREIGN KEY (progress_id) REFERENCES progress (progress_id)
);
INSERT INTO opportunity values (1, 1, 1, 'Startup Project', 100000000, 1, 1);


CREATE TABLE schedule (
 schedule_id INT NOT NULL PRIMARY KEY,
 isAllDay BOOLEAN,
 start_date DATETIME,
 end_date DATETIME,
 title VARCHAR(255),
 note VARCHAR(255),
 person_id INT,
 company_id INT,
 opportunity_id INT,

 FOREIGN KEY (person_id) REFERENCES person (person_id),
 FOREIGN KEY (company_id) REFERENCES company (company_id),
 FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id)
);
INSERT INTO schedule values (1, TRUE, '2020-09-29 00:00:00', '2020-09-30 00:00:00', '休日', 'test', 1, 1, 1);


CREATE TABLE schedule_menber (
 account_id INT NOT NULL,
 schedule_id INT NOT NULL,

 PRIMARY KEY (account_id,schedule_id),

 FOREIGN KEY (account_id) REFERENCES user (account_id),
 FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id)
);


CREATE TABLE opportunity_sheet (
 opportunity_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (opportunity_id,sheet_id),

 FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE schedule_sheet (
 schedule_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (schedule_id,sheet_id),

 FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);


CREATE TABLE report (
 report_id INT NOT NULL PRIMARY KEY,
 report_date DATETIME,
 note VARCHAR(255),
 person_id INT,
 company_id INT,
 opportunity_id INT,
 create_user_id INT,
 FOREIGN KEY (create_user_id) REFERENCES user (account_id),
 FOREIGN KEY (person_id) REFERENCES person (person_id),
 FOREIGN KEY (company_id) REFERENCES company (company_id),
 FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id)
);
INSERT INTO report values (1, '2020-09-29 00:00:00', 'test', 1, 1, 1, 1);


CREATE TABLE report_sheet (
 report_id INT NOT NULL,
 sheet_id INT NOT NULL,

 PRIMARY KEY (report_id,sheet_id),

 FOREIGN KEY (report_id) REFERENCES report (report_id),
 FOREIGN KEY (sheet_id) REFERENCES sheet (sheet_id)
);

-- !Downs
DROP TABLE sheet CASCADE CONSTRAINTS;
DROP TABLE text_field CASCADE CONSTRAINTS;
DROP TABLE progress CASCADE CONSTRAINTS;
DROP TABLE user_account CASCADE CONSTRAINTS;
DROP TABLE checkbox_field CASCADE CONSTRAINTS;
DROP TABLE checkbox_value CASCADE CONSTRAINTS;
DROP TABLE number_field CASCADE CONSTRAINTS;
DROP TABLE select_field CASCADE CONSTRAINTS;
DROP TABLE select_value CASCADE CONSTRAINTS;
DROP TABLE user CASCADE CONSTRAINTS;
DROP TABLE checked_value CASCADE CONSTRAINTS;
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
