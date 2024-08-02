-- 该数据库为仅包含表定义的空数据库
-- 如果希望使用含有展示数据的数据库, 请使用 vwbdb_empty_script.sql

-- 请使用管理员权限, 将该数据库添加至mysql数据库中. 
-- `sudo mysql < vwbdb_empty_script.sql`

CREATE USER 'vdack'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE vwbdb;
GRANT ALL PRIVILEGES ON vwbdb.* TO 'vdack'@'localhost';
FLUSH PRIVILEGES;

USE vwbdb;

CREATE TABLE user (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    pid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE subProject (
    spid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    discription VARCHAR(255) DEFAULT '',
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pid INT NOT NULL,
    CONSTRAINT FK_subProject_project FOREIGN KEY (pid) REFERENCES project(pid) ON DELETE CASCADE
);

CREATE TABLE subTask (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    header VARCHAR(255) DEFAULT 'TASK_HEADER',
    content VARCHAR(255) DEFAULT '',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished BOOLEAN DEFAULT FALSE,
    spid INT NOT NULL,
    CONSTRAINT FK_subTask_subProject FOREIGN KEY (spid) REFERENCES subProject(spid) ON DELETE CASCADE
);

CREATE TABLE tComment (
    cid INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tid INT NOT NULL,
    uid INT NOT NULL,
    CONSTRAINT FK_tComment_subTask FOREIGN KEY (tid) REFERENCES subTask(tid) ON DELETE CASCADE,
    CONSTRAINT FK_tComment_user FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE
);

CREATE TABLE file (
    fid INT AUTO_INCREMENT PRIMARY KEY,
    tid INT,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT FK_file_subTask FOREIGN KEY (tid) REFERENCES subTask(tid) ON DELETE SET NULL
);

CREATE TABLE notification (
    nid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    pid INT NOT NULL,
    have_read BOOLEAN DEFAULT FALSE,
    action VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT FK_notification_user FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE,
    CONSTRAINT FK_notification_project FOREIGN KEY (pid) REFERENCES project(pid) ON DELETE CASCADE
);

CREATE TABLE pjct_usr (
    uid INT NOT NULL,
    pid INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uid, pid),
    CONSTRAINT FK_pjct_usr_user FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE,
    CONSTRAINT FK_pjct_usr_project FOREIGN KEY (pid) REFERENCES project(pid) ON DELETE CASCADE
);

