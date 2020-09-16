-- !Ups
create table people (id int auto_increment primary key, name varchar(255) not null);
insert into people values (default, 'taro');
-- !Downs
drop table people;