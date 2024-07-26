export const subprojects = [
  {
    spid: 12312312,
    name: 'subproject1', 
    date: '202407261849',
    discription: 'DISCRIPTIONS FOR SUB PROJECT 1',
    subTask:[
      {
        header: 'task header1',
        date: 'taskdate1',
        content: 'task content1',
        finished: false,
        tid: 123,
        comments: [
          {cid: 888, user_name: 'user1', content: 'first comment', date: 'ddtt11'}, 
          {cid: 999, user_name: 'user2', content: 'second comment', date: 'ddtt22'}, 
        ]
      },
      {
        header: 'task header2',
        date: 'taskdate2',
        content: 'task content2',
        finished: true,
        tid:3432,
        comments: [
          {cid: 777, user_name: 'user2', content: 'first comment', date: 'ddtt33'}, 
          {cid: 666, user_name: 'user1', content: 'second comment', date: 'ddtt44'}, 
        ]
      }
    ],
  },
  {
    spid:545345,
    name: 'Subproject2', 
    date: '202407261900',
    discription: 'DISCRIPTIONS FOR SUB PROJECT 2, SOMETHING LONG LONG LONG ____.',
    subTask:[
      {
        header: 'task header3',
        date: 'taskdate3',
        content: 'task content3',
        finished: true,
        tid:909,
        comments: [
          {cid:111, user_name: 'user1', content: 'first comment', date: 'ddtt11'}, 
          {cid:222, user_name: 'user2', content: 'second comment', date: 'ddtt22'}, 
        ]
      },
      {
        header: 'task header2',
        date: 'taskdate2',
        content: 'task content2',
        finished: false,
        tid:123123,
        comments: [
          {cid:333, user_name: 'user2', content: 'first comment', date: 'ddtt33'}, 
          {cid:444, user_name: 'user1', content: 'second comment', date: 'ddtt44'}, 
        ]
      }
    ],
  }
];