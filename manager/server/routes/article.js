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

//小程序接口
//根据分类编号id，对应文章的分类编号uid来获取文章列表
router.get('/articleList',(req,res) => {
  let id = req.query.id;

  let sql = `select id,title,price,unit,images from articles where uid = ${id}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取分类编号为：${id}的文章列表失败：${err.message}`);
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

//获取文章列表
router.get('/list',(req,res) => {

  let sql = 'select a.id,b.name,a.title,a.price,a.unit,a.images,a.content,a.create_time,a.update_time from articles a left join classifys b on a.uid = b.id';

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取文章列表失败：${err.message}`);
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

//添加文章
router.post('/create',upload.single('file'),(req,res) => {
  //console.log(file);

  let url = `/server/public/images/${req.file.filename}`;
  let sql = `insert into articles (name,icon,create_time,update_time) values ('${req.body.name}','${url}',now(),now())`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`添加文章失败：${err}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '添加文章成功！'
    });

  });

});

//获取某个文章信息
router.get('/getInfo',(req,res) => {
  let id = req.query.id;

  let sql = `select * from articles where id = ${id}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取某个文章信息失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: result[0]
    });

  });
});

//更新文章
router.post('/update',upload.single('file'),(req,res) => {
  console.log(req.file);

  //判断是否有文件更新
  let sql;
  if(req.file){ //有文件更新
    let url = `/server/public/images/${req.file.filename}`;
    sql = `update articles set name = '${req.body.name}',icon = '${url}',update_time = now() where id = ${req.body.id}`;
  }else{ //没有文件更新，icon不用更新
    sql = `update articles set name = '${req.body.name}',update_time = now() where id = ${req.body.id}`;
  }


  connection.query(sql,(err,result) => {
    if(err){
      console.log(`更新文章失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '更新文章成功！'
    });

  });

});

//删除文章
router.post('/delete',(req,res) => {

  let sql = `delete from articles where id = ${req.body.id}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`删除文章失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: '删除文章成功！'
    });

  });

});

module.exports = router;
