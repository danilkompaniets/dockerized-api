import Post from '../models/postModel.js';

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {posts}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: error
        })
    }
}


export const getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: error
        })
    }
}

export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: error
        })
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {post}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: error
        })
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: error
        })
    }
}