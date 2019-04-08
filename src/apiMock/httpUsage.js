/**
 * demo api请求文件Mock
 */
var Mock = require('mockjs');
//拦截url,返回模拟数据
Mock.mock('/postReq1', 'post',
    {
        "data": {
            "cur_page": '这是mock的数据'
        }
    }
);

//在这里添加mock方法，拦截其他请求
Mock.mock('/login', 'post',
    {
        status: 'success'
    }
);

Mock.mock('/loginInfo', 'get',
    {
        uid: 'xiaoming',
        age: 18
    }
);

Mock.mock('/user/12345', 'get', 
    {
        actionList: ['permissions', 'ranges']
    }
);

Mock.mock('/user/12345/permissions', 'get', 
    {
        action: 'permission'
    }
);