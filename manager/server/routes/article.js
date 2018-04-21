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

//小程序接口
//根据分类编号id，对应文章的分类编号uid来获取文章列表
router.get('/articleList', async (req, res) => {
  console.log(req.query);
  let uid = req.query.uid;
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  //计算总数
  let total = 0;
  const f1 = await connection.query('select count(*) total from articles', (err, result) => {
    if (err) {
      console.log(`计算分类编号为：${uid}的文章总数失败：${err.message}`);
      return;
    }
    total = result[0].total;
  });

  let sql = `select id,title,price,phone,is_open,unit_square,unit_time,images from articles where uid = ${uid} limit ${(page - 1) * limit},${limit}`;
  const f2 = await connection.query(sql, (err, result) => {
    if (err) {
      console.log(`获取分类编号为：${uid}的文章列表失败：${err.message}`);
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

//获取文章列表
router.get('/list', async (req, res) => {

  let search = req.query.search;
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  //排序，判断排序是否存在
  let orderbyVal = ``;
  if (req.query.sortField && req.query.sort) {
    let sortField = req.query.sortField;
    let sort = req.query.sort === 'ascending' ? 'asc' : 'desc';
    orderbyVal = `order by ${sortField} ${sort}`;
  }

  //计算总数
  let total = 0;
  const f1 = await connection.query(`select count(*) total from articles where title like '%${search}%'`, (err, result) => {
    if (err) {
      console.log(`计算文章总数失败：${err.message}`);
      return;
    }
    total = result[0].total;
  });

  //查询分页
  let sql = `select a.id,b.name,a.title,a.phone,a.is_open,a.price,a.unit_square,a.unit_time,a.price_original,a.unit_square_original,a.unit_time_original,
  a.images,a.content,a.create_time,a.update_time from articles a left join classifys b on a.uid = b.id  where title like '%${search}%' ${orderbyVal} limit ${(page - 1) * limit},${limit}`;
  const f2 = await connection.query(sql, (err, result) => {
    if (err) {
      console.log(`获取文章列表失败：${err.message}`);
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

  let sql = `update articles set is_open = ${params.is_open} where id = ${params.id}`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(`修改文章id为：${params.id}的开启功能失败：${err}`);
      return;
    }

    res.json({
      error_code: 0,
      data: '开启成功！'
    });

  });
});

//添加文章
router.post('/create', upload.array('files', 5), (req, res) => {
  //console.log(req.files);
  let params = req.body;

  //处理图片
  let imgVal = [];
  req.files.forEach((item, index) => {
    if (index < req.files.length - 1) {
      imgVal.push(`/server/public/images/${item.filename},`);
    } else {
      imgVal.push(`/server/public/images/${item.filename}`);
    }
  });
  imgVal = imgVal.join(',');
  console.log(imgVal);

  //let url = `/server/public/images/${req.file.filename}`;
  let sql = `insert into articles (title,uid,phone,is_open,price,unit_square,unit_time,price_original,unit_square_original,unit_time_original,images,content,create_time,update_time) values 
  ('${params.title}',${params.uid},'${params.phone}',${params.is_open},${params.price},${params.unit_square},'${params.unit_time}',
  ${params.price_original},${params.unit_square_original},'${params.unit_time_original}','${imgVal}','${params.content}',now(),now())`;

  console.log(sql);

  connection.query(sql, (err, result) => {
    if (err) {
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
router.get('/getInfo', (req, res) => {
  let id = req.query.id;

  let sql = `select * from articles where id = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) {
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
router.post('/update', upload.array('files', 5), (req, res) => {
  //console.log(req.files);
  //console.log(req.body);

  let params = req.body;

  //处理图片
  let imgVal = [];
  //处理以存在的图片
  if (params.images) {
    //判断params.images是否为1个，1个是字符串，一个以上是数组
    if (typeof params.images === 'string') {
      imgVal.push(params.images);
    } else {
      params.images.forEach(item => {
        imgVal.push(item);
      });
    }
  }

  //处理新增或修改的图片
  req.files.forEach((item, index) => {
    imgVal.push(`/server/public/images/${item.filename}`);
  });
  //console.log(imgVal);
  imgVal = imgVal.join(',');


  //判断是否有文件更新
  let sql = `update articles set title = '${params.title}',uid = '${params.uid}',phone = '${params.phone}',is_open = ${params.is_open},price = ${params.price},unit_square = ${params.unit_square},
    unit_time = '${params.unit_time}',price_original = ${params.price_original},unit_square_original = ${params.unit_square_original},
    unit_time_original = '${params.unit_time_original}',images = '${imgVal}',content = '${params.content}',update_time = now() where id = ${params.id}`;


  connection.query(sql, (err, result) => {
    if (err) {
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
router.post('/delete', (req, res) => {

  let sql = `delete from articles where id = ${req.body.id}`;

  connection.query(sql, (err, result) => {
    if (err) {
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
