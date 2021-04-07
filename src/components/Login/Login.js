import './Login.css';
import {FiLogIn} from "react-icons/fi";
import userService from "../../services/userService";
import { Link } from 'react-router-dom'
import {useEffect} from "react";

const Login = ({setUser, history, setNotification,...props}) => {

    useEffect(() => {
        return () => setNotification({});
    },[]);

    const onSubmitLoginHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        userService.login(username,password)
            .then(res => {
                if(res.message) {
                    const notification = {
                        message: res.message,
                        type: 'error'
                    };
                    setNotification(notification);
                }else {
                    setNotification({});
                    setUser(res)
                    history.push('/')
                }
            })
            .catch(console.error)
    }

    return (
        <section className="login">
            <FiLogIn className="login-icon" />
            <article className="login-form">
                <form onSubmit={onSubmitLoginHandler}>
                    <label htmlFor="username">
                        <input type="text" name="username" id="username" placeholder="Потребителско име" required={true}/>
                    </label>
                    <label htmlFor="password">
                        <input type="password" placeholder="Парола" name="password" id="password" required={true}/>
                    </label>
                    <button className="login-form-btn">Влез</button>
                    <Link to="/register" className="login-form-to-register">Регистрация</Link>
                </form>
            </article>
        </section>
    )
}
export default Login;
