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
    callback(null, './static/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});
let upload = multer({
  storage: Storage
});

//小程序接口
//获取分类列表
router.get('/classifyList', async (req, res) => {

  //计算总数
  const totalFn = () => {
    return new Promise((resolve,reject) => {
      let sql = `select count(*) total from classifys`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`计算分类总数失败：${err.message}`);
          return reject(err);
        }
        resolve(result[0].total);
      });
    });
  };
  const total = await totalFn();

  //查询分页
  const selectFn = () => {
    return new Promise((resolve,reject) => {
      let sql = `select * from classifys where is_open = 1`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`获取分类列表失败：${err.message}`);
          return reject(err);
        }
        //console.log(result);
        let json = {
          error_code: 0,
          data: {
            total,
            results: result
          }
        };
        resolve(json);
      });
    });
  };
  const result = await selectFn();

  res.json(result);

});

//获取分类列表
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
  const totalFn = () => {
    return new Promise((resolve,reject) => {
      let sql = `select count(*) total from classifys where name like '%${search}%'`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`计算分类总数失败：${err.message}`);
          return reject(err);
        }
        resolve(result[0].total);
      });
    });
  };
  const total = await totalFn();

  //查询分页
  const selectFn = () => {
    return new Promise((resolve,reject) => {
      let sql = `select * from classifys where name like '%${search}%' ${orderbyVal} limit ${(page - 1) * limit},${limit}`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`获取分类列表失败：${err.message}`);
          return reject(err);
        }
        //console.log(result);
        let json = {
          error_code: 0,
          data: {
            total,
            results: result
          }
        };
        resolve(json);
      });
    });
  };
  const result = await selectFn();

  res.json(result);

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

  let url = `/static/images/${req.file.filename}`;
  let sql = `insert into classifys (name,icon,bg_color,is_open,create_time,update_time) values ('${req.body.name}','${url}','${req.body.bg_color}',${req.body.is_open},now(),now())`;

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
    let url = `/static/images/${req.file.filename}`;
    sql = `update classifys set name = '${req.body.name}',icon = '${url}',bg_color = '${req.body.bg_color}',is_open = ${req.body.is_open},update_time = now() where id = ${req.body.id}`;
  } else { //没有文件更新，icon不用更新
    sql = `update classifys set name = '${req.body.name}',bg_color = '${req.body.bg_color}',is_open = ${req.body.is_open},update_time = now() where id = ${req.body.id}`;
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
router.post('/delete', async (req, res) => {

  let id = req.body.id;

  //查询某个分类下的文章信息是否存在，长度为0则不存在，可删除
  const selectFn = () => {
    return new Promise((resolve, reject) => {
      connection.query(`select a.id,a.uid,b.name,a.title from articles a left join classifys b on a.uid = b.id where b.id = ${id}`, (err, result) => {
        if (err) {
          console.log(`查询分类id为${id}下的文章信息失败：${err.message}`);
          return reject(err);
        }
        console.log(result);
        resolve(result.length);
      });
    });
  };
  const classify_length = await selectFn();

  //删除分类
  const deleteFn = (classify_length) => {
    return new Promise((resolve, reject) => {
      console.log(classify_length);

      if (classify_length === 0) {
        let sql = `delete from classifys where id = ${id}`;
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(`删除分类失败：${err.message}`);
            return reject(err);
          }
          //console.log(result);
          let json = {
            error_code: 0,
            data: '删除分类成功！'
          }
          resolve(json);
        });
      } else {
        console.log('该分类下存在文章，无法删除，请删除该分类下的文章再操作！');
        let json = {
          error_code: 1,
          data: '该分类下存在文章，无法删除，请删除该分类下的文章再操作！'
        };
        resolve(json);
      }

    });
  }
  const result = await deleteFn(classify_length);

  res.json(result);

});

module.exports = router;
