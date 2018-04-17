var express = require('express');
var router = express.Router();

//mysql
const connection = require('../modules/mysql');

//获取分类列表
router.get('/list',(req,res) => {

  let sql = 'select * from classifys';

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取分类列表失败：${err.message}`);
      return;
    }

    console.log(result);

    res.json({
      error_code: 0,
      data: {
        total: result.length,
        results: result
      }
    });


  });

});

module.exports = router;
