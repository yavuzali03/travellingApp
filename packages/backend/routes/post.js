const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {createPost,getPosts,getDetail,deletePost , getUpdate,searchPost} = require('../controllers/post.js');

router.get('/getPosts',getPosts);
router.post('/createPost',auth ,createPost);
router.get('/getDetail/:id',getDetail);
router.patch('/getUpdate/:id',auth,getUpdate);
router.delete('/deletePost/:id',auth,deletePost);
router.get('/searchPost/',searchPost);

module.exports = router;
