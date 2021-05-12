import userService from "../../services/userService";
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from "../../context/UserContext";

export default () => {
    const [_, setUser] = useContext(UserContext);
    const history = useHistory();
    userService.logout()
        .then(() => {
            setUser(undefined);
            history.push('/')
        })
        .catch(console.error);

    return (
        null
    )
}
