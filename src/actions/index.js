import { FETCH_POSTS } from './types';

import fetchPosts from './posts/fetchPosts';
import fetchPost from './posts/fetchPost';
import createPost from './posts/createPost';
import deletePost from './posts/deletePost';

export {
    fetchPosts,
    fetchPost,
    createPost,
    deletePost
};
