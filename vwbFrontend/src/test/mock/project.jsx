

const project0 = {
    id:     100, 
    name:   'project_example',
    users:[
        {
            id:     200, 
            name:   'user_example',
        }
    ],
}
const user0 = {
    id:     200, 
    name:   'user_example',
    projects:[
        {
            id:     100, 
            name:   'project_example'
        }
    ]
};
const project1 = {
    id:     101,
    name:   'project_1', 
    users:[
        {
            id:     201, 
            name:   'user1',
        }, 
        {
            id:     202, 
            name:   'user2',
        }, 
        {
            id:     203, 
            name:   'user3',
        }
    ],
};
const project2 = {
    id:     102,
    name:   'project_2', 
    users:[
        {
            id:     201, 
            name:   'user1',
        }, 
        {
            id:     202, 
            name:   'user2',
        }, 
        {
            id:     203, 
            name:   'user3',
        }
    ],
};
const project7 = {
    id:     107,
    name:   'project_end', 
    users:[
        {
            id:     201, 
            name:   'user1',
        }, 
        {
            id:     202, 
            name:   'user2',
        }, 
        {
            id:     209, 
            name:   'asd',
        }
    ],
};
const user1 = {
    id:     201, 
    name:   'user_p',
    projects:[
        {
            id:     101, 
            name:   'project_1'
        },
        {
            id:     102, 
            name:   'project_2'
        },
        {
            id:     103, 
            name:   'project_3'
        },
        {
            id:     107, 
            name:   'project_7'
        },
    ]
}
export const projects = {
    project0, 
    project1, 
    project2, 
    project7   
};
export const users = {
    user0,
    user1,
}