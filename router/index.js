const express = require('express');
const router = express.Router();
const ToDo = require('../db/todo.js');

// 首页
router
  .get('/', (req, res, next) => {
    res.status(200).redirect('/getAll');
  })
  .get('/getAll', (req, res, next) => {
    ToDo.find({})
      .then((payload) => {
        res.status(200).render('home.html', {
          data: payload.filter((item) => item.status !== 2),
          allCount: payload.filter((item) => item.status !== 2).length,
          comCount: payload.filter((item) => item.status === 1).length,
          reyCount: payload.filter((item) => item.status === 2).length,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  })
  .get('/getComplete', (req, res, next) => {
    ToDo.find({})
      .then((payload) => {
        res.status(200).render('complete.html', {
          data: payload.filter((item) => item.status === 1),
          allCount: payload.filter((item) => item.status !== 2).length,
          comCount: payload.filter((item) => item.status === 1).length,
          reyCount: payload.filter((item) => item.status === 2).length,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  })
  .get('/getRecycle', (req, res, next) => {
    ToDo.find({})
      .then((payload) => {
        res.status(200).render('recycle.html', {
          data: payload.filter((item) => item.status === 2),
          allCount: payload.filter((item) => item.status !== 2).length,
          comCount: payload.filter((item) => item.status === 1).length,
          reyCount: payload.filter((item) => item.status === 2).length,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  })
  .post('/createTodo', (req, res, next) => {
    const { todoname } = req.body;
    ToDo.create({ name: todoname })
      .then((payload) => {
        res.status(200).end();
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  })
  .patch('/updateTodo', (req, res, next) => {
    const { status, todoId } = req.body;
    ToDo.updateOne({ _id: todoId }, { status })
      .then((result) => {
        res.status(200).json({
          message: '更新成功',
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  })
  .delete('/deleteTodo', (req, res, next) => {
    const { todoId } = req.body;
    const { force } = req.query;

    if (force === 'true') {
      ToDo.findOne({ _id: todoId })
        .then((result) => {
          if (result._id) {
            ToDo.deleteOne({ _id: result._id }).then(() => {
              res.status(200).json({
                payload: {
                  message: '删除成功',
                },
              });
            });
          } else {
            res.status(500).json({
              payload: {
                message: 'id is not exist',
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            payload: error,
          });
        });
    } else {
      ToDo.updateOne({ _id: todoId }, { status: 2 })
        .then((result) => {
          res.status(200).json({
            message: '删除成功',
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            payload: error,
          });
        });
    }
  })
  .patch('/recoverTodo', (req, res, next) => {
    const { todoId } = req.body;
    ToDo.updateOne({ _id: todoId }, { status: 0 })
      .then((result) => {
        res.status(200).json({
          message: '更新成功',
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          payload: error,
        });
      });
  });

module.exports = router;
