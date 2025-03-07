
const PostSchema = require('../models/post.js');

const createPost = async (req,res)=>{
    try {
        const newPost = await PostSchema.create(req.body)
        res.status(201).json({newPost})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getPosts = async (req,res)=>{
    try {
        const getPost = await PostSchema.find();
        res.status(201).json({getPost})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getDetail = async (req,res)=>{
    try {
        const {id} = req.params;
        const detailPost = await PostSchema.findById(id);
        res.status(200).json({detailPost})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getUpdate = async (req,res)=>{
    try {
        const {id} = req.params;
        const updatePost = await PostSchema.findById(id,req.body , {new : true});
        res.status(200).json({updatePost})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const deletePost = async (req,res)=>{
    try {
        const {id} = req.params;
        const deletePost = await PostSchema.findByIdAndDelete(id);
        res.status(200).json({message:"silme işlemi başarılı"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const searchPost = async (req,res)=>{
    const {search , tag} = req.query;
    try {
        const title = new RegExp(search, "i");

        const posts = await PostSchema.find({$or : [{title}] , tag : {$in : tag.split(",")}});
        res.status(200).json({posts})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {createPost,getPosts,getDetail,deletePost , getUpdate ,searchPost}
