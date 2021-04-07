import environments from "../environments";
import {fetchWithCredentials} from "../helpers";

const userService = {

    login: ( username, password ) => {
        const fullPath ='user/login';
        return fetchWithCredentials(fullPath,'POST',{username,password})
            .then(res => res.json())
            .catch(err => console.error(err))

    },
    register: (newUser) => {
        const fullPath ='user/register';
        return fetchWithCredentials(fullPath,'POST',newUser)
            .then(res => res.json())
            .catch(err => console.error(err))

    },
    editUserData: (data) => {
        const fullPath ='user/profile';
        return fetchWithCredentials(fullPath,'PUT',data)
            .then(res => res.json())
            .catch(console.error)
    },
    getUserInfo: () => {
        const fullPath ='user/profile';
        return fetchWithCredentials(fullPath,'GET')
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    logout: () => {
        const fullPath ='user/logout';
        return fetchWithCredentials(fullPath,'POST')
            .then(res => res.json())
            .catch(console.error)
    }
};

export default userService;
