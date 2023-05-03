CREATE SEQUENCE mused_seq;

CREATE TABLE md_mused (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('md_mused_seq'),
  content text,
  origin varchar(50) NOT NULL DEFAULT '',
  status numeric DEFAULT 0,
  sticky numeric DEFAULT NULL,
  time numeric DEFAULT NULL,
  PRIMARY KEY (id)
);


CREATE SEQUENCE md_user_seq;

CREATE TABLE md_user (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('md_user_seq'),
  display_name varchar(255) NOT NULL DEFAULT '',
  email varchar(255) NOT NULL DEFAULT '',
  password varchar(255) NOT NULL DEFAULT '',
  type varchar(50) NOT NULL DEFAULT '',
  url varchar(255) DEFAULT NULL,
  token varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
