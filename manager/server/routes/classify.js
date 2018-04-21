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
  destination(req, file, callback) {
    callback(null, './server/public/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});
let upload = multer({
  storage: Storage
});

//获取分类列表
router.get('/list', async (req, res) => {

  let search = req.query.search;
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  //排序，判断排序是否存在
  let orderbyVal = ``;
  if(req.query.sortField && req.query.sort){
    let sortField = req.query.sortField;
    let sort = req.query.sort === 'ascending' ? 'asc' : 'desc';
    orderbyVal = `order by ${sortField} ${sort}`;
  }

  //计算总数
  let total = 0;
  const f1 = await connection.query(`select count(*) total from classifys where name like '%${search}%'`, (err, result) => {
    if (err) {
      console.log(`计算分类总数失败：${err.message}`);
      return;
    }
    total = result[0].total;
  });

  //查询分页
  let sql = `select * from classifys where name like '%${search}%' ${orderbyVal} limit ${(page - 1) * limit},${limit}`;
  //console.log(sql);
  const f2 = await connection.query(sql, (err, result) => {
    if (err) {
      console.log(`获取分类列表失败：${err.message}`);
      return;
    }

    //console.log(result);

    res.json({
      error_code: 0,
      data: {
        total,
        results: result
      }
    });
  });
});

//修改开启功能
router.post('/update_isOpen', (req, res) => {
  let params = req.body;

  let sql = `update classifys set is_open = ${params.is_open} where id = ${params.id}`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(`修改分类id为：${params.id}的开启功能失败：${err}`);
      return;
    }

    res.json({
      error_code: 0,
      data: '开启成功！'
    });

  });
});

//添加分类
router.post('/create', upload.single('file'), (req, res) => {
  //console.log(file);

  let url = `/server/public/images/${req.file.filename}`;
  let sql = `insert into classifys (name,icon,is_open,create_time,update_time) values ('${req.body.name}','${url}',${req.body.is_open},now(),now())`;

  connection.query(sql, (err, result) => {
    if (err) {
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
router.get('/getInfo', (req, res) => {
  let id = req.query.id;

  let sql = `select * from classifys where id = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) {
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
router.post('/update', upload.single('file'), (req, res) => {
  console.log(req.body);

  //判断是否有文件更新
  let sql;
  if (req.file) { //有文件更新
    let url = `/server/public/images/${req.file.filename}`;
    sql = `update classifys set name = '${req.body.name}',icon = '${url}',is_open = ${req.body.is_open},update_time = now() where id = ${req.body.id}`;
  } else { //没有文件更新，icon不用更新
    sql = `update classifys set name = '${req.body.name}',is_open = ${req.body.is_open},update_time = now() where id = ${req.body.id}`;
  }


  connection.query(sql, (err, result) => {
    if (err) {
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
router.post('/delete', (req, res) => {

  let sql = `delete from classifys where id = ${req.body.id}`;

  connection.query(sql, (err, result) => {
    if (err) {
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
