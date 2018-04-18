var express = require('express');
var router = express.Router();

//mysql
const connection = require('../modules/mysql');

//multer
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let Storage = multer.diskStorage({
  destination(req,file,callback){
    callback(null,'./server/public/images');
  },
  filename(req,file,callback){
    callback(null,`${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});
let upload = multer({
  storage: Storage
});

//获取分类列表
router.get('/list',(req,res) => {

  let sql = 'select * from classifys';

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取分类列表失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: {
        total: result.length,
        results: result
      }
    });
  });
});

//添加分类
router.post('/create',upload.single('file'),(req,res) => {
  //console.log(file);

  let url = `/server/public/images/${req.file.filename}`;
  let sql = `insert into classifys (name,icon,create_time,update_time) values ('${req.body.name}','${url}',now(),now())`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`添加分类失败：${err}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '添加分类成功！'
    });

  });

});

//获取某个分类信息
router.get('/getInfo',(req,res) => {
  let id = req.query.id;

  let sql = `select * from classifys where id = ${id}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取某个分类信息失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: result[0]
    });

  });
});

//更新分类
router.post('/update',upload.single('file'),(req,res) => {
  console.log(req.file);

  //判断是否有文件更新
  let sql;
  if(req.file){ //有文件更新
    let url = `/server/public/images/${req.file.filename}`;
    sql = `update classifys set name = '${req.body.name}',icon = '${url}',update_time = now() where id = ${req.body.id}`;
  }else{ //没有文件更新，icon不用更新
    sql = `update classifys set name = '${req.body.name}',update_time = now() where id = ${req.body.id}`;
  }


  connection.query(sql,(err,result) => {
    if(err){
      console.log(`更新分类失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '更新分类成功！'
    });

  });

});

//删除分类
router.post('/delete',(req,res) => {

  let sql = `delete from classifys where id = ${req.body.id}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`删除分类失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '删除分类成功！'
    });

  });

});

module.exports = router;
