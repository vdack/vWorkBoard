-- 该数据由ChatGPT生成, 用于展示功能
-- 其中file 和 notification 表为空, 需要进行一定的操作才能显示功能. 
-- 如果得到空数据库, 请使用 vwbdb_empty_script.sql

-- 请使用管理员权限, 将该数据库添加至mysql数据库中. 
-- `sudo mysql < vwbdb_script.sql`

CREATE USER 'vdack' IDENTIFIED BY 'password';
CREATE DATABASE vwbdb;
GRANT ALL PRIVILEGES ON vwbdb.* TO 'vdack';
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


-- 插入用户数据
INSERT INTO user (name, password) VALUES 
('Alice', 'password1'), 
('Bob', 'password2'),
('Charlie', 'password3'),
('David', 'password4'),
('Eve', 'password5'),
('Frank', 'password6'),
('Grace', 'password7'),
('Hannah', 'password8');

-- 插入项目数据
INSERT INTO project (name) VALUES 
('Project A'), 
('Project B'), 
('Project C'), 
('Project D'), 
('Project E'), 
('Project F'), 
('Project G'), 
('Project H'), 
('Project I'), 
('Project J'), 
('Project K'), 
('Project L'), 
('Project M'), 
('Project N'), 
('Project O'), 
('Project P'), 
('Project Q'), 
('Project R'), 
('Project S'), 
('Project T');

-- 插入用户-项目关系数据
INSERT INTO pjct_usr (uid, pid) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), 
(2, 2), (2, 5), (2, 6), 
(3, 3), (3, 7), (3, 8), (3, 9), 
(4, 4), (4, 10), 
(5, 1), (5, 11), (5, 12), 
(6, 2), (6, 13), (6, 14), (6, 15), 
(7, 3), (7, 16), 
(8, 4), (8, 17), (8, 18), (8, 19);

-- 插入子项目数据
INSERT INTO subProject (name, pid) VALUES 
('SubProject A1', 1), ('SubProject A2', 1), 
('SubProject B1', 2), ('SubProject B2', 2), ('SubProject B3', 2), 
('SubProject C1', 3), 
('SubProject D1', 4), ('SubProject D2', 4), ('SubProject D3', 4), 
('SubProject E1', 5),
('SubProject F1', 6),
('SubProject G1', 7),
('SubProject H1', 8), 
('SubProject I1', 9), 
('SubProject J1', 10),
('SubProject K1', 11), ('SubProject K2', 11), 
('SubProject L1', 12), ('SubProject L2', 12), 
('SubProject M1', 13), 
('SubProject N1', 14), 
('SubProject O1', 15),
('SubProject P1', 16), ('SubProject P2', 16),
('SubProject Q1', 17), 
('SubProject R1', 18),
('SubProject S1', 19);

-- 插入任务数据
INSERT INTO subTask (header, content, spid) VALUES 
('Task A1.1', 'Content for task A1.1', 1), ('Task A1.2', 'Content for task A1.2', 1),
('Task A2.1', 'Content for task A2.1', 2), 
('Task B1.1', 'Content for task B1.1', 3),
('Task B2.1', 'Content for task B2.1', 4), ('Task B2.2', 'Content for task B2.2', 4),
('Task B3.1', 'Content for task B3.1', 5),
('Task C1.1', 'Content for task C1.1', 6),
('Task D1.1', 'Content for task D1.1', 7), ('Task D2.1', 'Content for task D2.1', 8), 
('Task D3.1', 'Content for task D3.1', 9),
('Task E1.1', 'Content for task E1.1', 10),
('Task F1.1', 'Content for task F1.1', 11),
('Task G1.1', 'Content for task G1.1', 12),
('Task H1.1', 'Content for task H1.1', 13),
('Task I1.1', 'Content for task I1.1', 14),
('Task J1.1', 'Content for task J1.1', 15),
('Task K1.1', 'Content for task K1.1', 16), ('Task K2.1', 'Content for task K2.1', 17),
('Task L1.1', 'Content for task L1.1', 18), ('Task L2.1', 'Content for task L2.1', 19),
('Task M1.1', 'Content for task M1.1', 20),
('Task N1.1', 'Content for task N1.1', 21),
('Task O1.1', 'Content for task O1.1', 22),
('Task P1.1', 'Content for task P1.1', 23), ('Task P2.1', 'Content for task P2.1', 24),
('Task Q1.1', 'Content for task Q1.1', 25),
('Task R1.1', 'Content for task R1.1', 26),
('Task S1.1', 'Content for task S1.1', 27);

-- 插入评论数据
INSERT INTO tComment (content, tid, uid) VALUES 
('Comment 1 on Task A1.1', 1, 1), 
('Comment 2 on Task A1.1', 1, 2), 
('Comment 3 on Task A1.1', 1, 3),
('Comment 1 on Task A2.1', 3, 4), 
('Comment 2 on Task A2.1', 3, 5), 
('Comment 1 on Task B1.1', 4, 6),
('Comment 1 on Task B2.1', 5, 7),
('Comment 2 on Task B2.1', 5, 8),
('Comment 1 on Task B3.1', 6, 1),
('Comment 1 on Task C1.1', 7, 2),
('Comment 1 on Task D1.1', 8, 3), 
('Comment 2 on Task D1.1', 8, 4),
('Comment 1 on Task D2.1', 9, 5), 
('Comment 1 on Task E1.1', 10, 6), 
('Comment 1 on Task F1.1', 11, 7),
('Comment 2 on Task F1.1', 11, 8), 
('Comment 1 on Task G1.1', 12, 1), 
('Comment 2 on Task G1.1', 12, 2), 
('Comment 1 on Task H1.1', 13, 3), 
('Comment 1 on Task I1.1', 14, 4),
('Comment 1 on Task J1.1', 15, 5),
('Comment 1 on Task K1.1', 16, 6),
('Comment 2 on Task K2.1', 17, 7),
('Comment 1 on Task L1.1', 18, 8),
('Comment 1 on Task M1.1', 19, 1),
('Comment 2 on Task M1.1', 19, 2),
('Comment 1 on Task N1.1', 20, 3),
('Comment 2 on Task N1.1', 20, 4),
('Comment 1 on Task O1.1', 21, 5),
('Comment 1 on Task P1.1', 22, 6), 
('Comment 2 on Task P2.1', 23, 7), 
('Comment 1 on Task Q1.1', 24, 8),
('Comment 1 on Task R1.1', 25, 1),
('Comment 2 on Task S1.1', 26, 2);
