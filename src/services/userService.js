import environments from "../environments";
import {fetchWithCredentials} from "../helpers";
const path = environments.apiURL;

const userService = {

    login: ( username, password ) => {
        const fullPath = path + 'user/login';
        return fetchWithCredentials(fullPath,'POST',{username,password})
            .then(res => res.json())
            .catch(err => console.error(err))

    },
    register: (newUser) => {
        const fullPath =path + 'user/register';
        return fetchWithCredentials(fullPath,'POST',newUser)
            .then(res => res.json())
            .catch(err => console.error(err))

    },
    editUserData: (data) => {
        const fullPath = path +'user/profile';
        return fetchWithCredentials(fullPath,'PUT',data)
            .then(res => res.json())
            .catch(console.error)
    },
    getUserInfo: () => {
        const fullPath = path + 'user/profile';
        return fetchWithCredentials(fullPath,'GET')
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    logout: () => {
        const fullPath = path + 'user/logout';
        return fetchWithCredentials(fullPath,'POST')
            .then(res => res.json())
            .catch(console.error)
    }
};

export default userService;
