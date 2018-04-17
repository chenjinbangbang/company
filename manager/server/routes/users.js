var express = require('express');
var router = express.Router();

//mysql
const connection = require('../modules/mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//管理员登录
router.post('/login',(req,res) => {

  let username = req.body.username;
  let password = req.body.password;

  let sql = `select * from admins where username = '${username}' and password = '${password}'`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`登录失败：${err.message}`);
      return;
    }

    console.log(result[0].username);

    res.json({
      error_code: 0,
      data: {
        username: result[0].username
      }
    });


  });

});

module.exports = router;
