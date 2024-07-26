INSERT INTO `user` (`uid`, `name`, `password`) VALUES
(9, 'talend', '654789');
--(1, 'admin', '123456'),
--(2, 'vdack', '040123'),
--(3, 'rofter', '010203'),
--(4, 'werllop', '923809'),
--(5, 'qweasd', '993451'),
--(6, 'queria', '283301'),
--(7, 'perirw', '123456'),
-- (8, 'proker', '112233'),
--(11, 'badway', '000000');

INSERT INTO `project` (`pid`, `name`) VALUES
(1, 'Project A'),
(2, 'Project B'),
(3, 'Project C'),
(4, 'Project D'),
(5, 'Project E');

INSERT INTO `pjct_usr` (`uid`, `pid`, `date`) VALUES
(1, 1, '2024-07-25 00:00:00'),
(1, 2, '2024-07-25 00:00:00'),
(1, 3, '2024-07-25 00:00:00'),
(2, 1, '2024-07-25 00:00:00'),
(2, 3, '2024-07-25 00:00:00'),
(2, 4, '2024-07-25 00:00:00'),
(3, 2, '2024-07-25 00:00:00'),
(3, 4, '2024-07-25 00:00:00'),
(4, 3, '2024-07-25 00:00:00'),
(4, 5, '2024-07-25 00:00:00'),
(5, 5, '2024-07-25 00:00:00'),
(5, 2, '2024-07-25 00:00:00');

INSERT INTO `subProject` (`spid`, `name`, `discription`, `pid`) VALUES
(1, 'SubProject A1', 'Description A1', 1),
(2, 'SubProject A2', 'Description A2', 1),
(3, 'SubProject B1', 'Description B1', 2),
(4, 'SubProject C1', 'Description C1', 3),
(5, 'SubProject D1', 'Description D1', 4);

INSERT INTO `subTask` (`tid`, `header`, `content`, `spid`) VALUES
(1, 'Task A1-1', 'Content A1-1', 1),
(2, 'Task A1-2', 'Content A1-2', 1),
(3, 'Task A2-1', 'Content A2-1', 2),
(4, 'Task B1-1', 'Content B1-1', 3),
(5, 'Task C1-1', 'Content C1-1', 4);

INSERT INTO `tComment` (`cid`, `content`, `date`, `tid`, `uid`) VALUES
(1, 'Comment on Task A1-1', '2024-07-25 00:00:00', 1, 2),
(2, 'Comment on Task A1-2', '2024-07-25 00:00:00', 2, 3),
(3, 'Comment on Task B1-1', '2024-07-25 00:00:00', 4, 4);

