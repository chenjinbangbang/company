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
  console.log(req.query);
  let uid = req.query.uid;

  let sql = `select id,title,price,unit_square,unit_time,images from articles where uid = ${uid}`;

  connection.query(sql,(err,result) => {
    if(err){
      console.log(`获取分类编号为：${uid}的文章列表失败：${err.message}`);
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

  let sql = 'select a.id,b.name,a.title,a.price,a.unit_square,a.unit_time,a.price_original,a.unit_square_original,a.unit_time_original,a.images,a.content,a.create_time,a.update_time from articles a left join classifys b on a.uid = b.id';

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
  let params = req.body;
  console.log(params);

  //let url = `/server/public/images/${req.file.filename}`;
  let sql = `insert into articles (title,uid,price,unit_square,unit_time,price_original,unit_square_original,unit_time_original,content,create_time,update_time) values 
  ('${params.title}',${params.uid},${params.price},${params.unit_square},'${params.unit_time}',
  ${params.price_original},${params.unit_square_original},'${params.unit_time_original}','${params.content}',now(),now())`;

  console.log(sql);

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
  //console.log(req.file);
  let params = req.body;

  //判断是否有文件更新
  let sql;
  if(req.file){ //有文件更新
    let url = `/server/public/images/${req.file.filename}`;
    sql = `update articles set name = '${req.body.name}',icon = '${url}',update_time = now() where id = ${req.body.id}`;
  }else{ //没有文件更新，icon不用更新
    sql = `update articles set title = '${params.title}',uid = '${params.uid}',price = ${params.price},unit_square = ${params.unit_square},
    unit_time = '${params.unit_time}',price_original = ${params.price_original},unit_square_original = ${params.unit_square_original},
    unit_time_original = '${params.unit_time_original}',content = '${params.content}',update_time = now() where id = ${params.id}`;
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
