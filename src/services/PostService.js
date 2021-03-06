import { http } from './HttpService'

export function getAllPosts() {
    return http().get('/post');
}

export function getPostById(id) {
    return http().get(`/post/${id}`);
}

export function createPost(post) {
    return http().post('/post', post);
}

export function deletePost(id) {
    return http().delete(`/post/${id}`);
}

export function updateTask(post) {
    return http().put('/post', post);
}