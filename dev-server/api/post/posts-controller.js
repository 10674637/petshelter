import User from '../../model/user-model.js';
import post from '../../model/post-model.js';
import moment from 'moment';
import * as auth from '../../services/auth-service.js';

export function index(req, res){
    //find all post
    post.find({},(error, posts) => {
        if(error) {
            return res.status(500).json();
        }
        return res.status(200).json({posts: posts});
    }).populate('author', 'username', 'user');
}

export function create(req, res){
    //create post
    const id = auth.getUserId(req);
    
    User.findOne({_id: id}, (error, user)=>{
        if(error && user){
            return res.status(500).json();
        }
        const post = new post(req.body.post);
        post.author = user._id;
        post.dueDate = moment(post.dueDate);

        post.save(error => {
            if(error){
                return res.status(500).json();
            }
            return res.status(201).json();

        })
    });
}

export function update(req, res){
    //update post
    const id = auth.getUserId(req);

    User.findOne({_id: id}, (error, user) => {
        if(error){
            return res.status(500).json();
        }
        if(!user){
            return res.status(404).json();
        }
        const post = new post(req.body.post);
        post.author = user._id;
        post.dueDate = moment(post.dueDate);
        post.findByIdAndUpdate({_id: post._id}, post, error =>{
            if(error){
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function remove(req, res) {
    const id = auth.getUserId(req);
    console.log(id)
    post.findOne({ _id: req.params.id }, (error, post) => {
        if (error) {
            return res.status(500).json();
        }
        if (!post) {
            return res.status(404).json();
        }
        if (post.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s post' });
        }
        post.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

export function show(req, res){
    //get post by id
    post.findOne({_id: req.params.id}, (error, post) => {
        if(error){
            return res.status(500).json();
        }
        if(!post){
            return res.status(404).json();
        }
        return res.status(200).json({post: post});
    });
}
