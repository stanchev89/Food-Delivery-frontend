import environments from "../environments";
import {fetchWithCredentials} from "../helpers";
const path = environments.apiURL + 'posts/';

const postService = {
    getPosts: () => {
        return fetchWithCredentials(path,'GET')
            .then(res => res.json())
            .catch(console.error)
    },
    createPost: (post) => {
        const fullPath = path + 'create_post';
        return fetchWithCredentials(fullPath,'POST', post)
            .then(res => res.json())
            .catch(console.error)
    },
    editPost: (post) => {
        const fullPath = path + 'edit_post';
        return fetchWithCredentials(fullPath,'POST',post)
            .then(res => res.json())
            .catch(console.error);
    },
    deletePost: (post) => {
        const fullPath = path + 'delete_post';
        return fetchWithCredentials(fullPath,'POST',post)
            .then(res => res.json())
            .catch(console.error)
    }
}

export default postService
