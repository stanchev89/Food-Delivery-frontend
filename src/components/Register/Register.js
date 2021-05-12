import './Register.css';
import {FiUserPlus} from 'react-icons/fi'
import userService from "../../services/userService";
import {useContext, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import NotificationContext from "../../context/NotificationContext";

const Register = () => {
    const [notification,setNotification] = useContext(NotificationContext);
    const history = useHistory();
    useEffect(() => {
        return () => setNotification({});
    },[]);

    const onSubmitRegisterHandler = (e) => {
        e.preventDefault();
        const newUser = {
            username: e.target.username.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            password: e.target.password.value,
            repeatPassword: e.target.repeatPassword.value
        }
        userService.register(newUser)
            .then(res => {
                if(res.message !== 'Successful registration') {
                    const notification = {
                        message: res.message,
                        type: 'error'
                    }
                    setNotification(notification);
                }else {
                    const notification = {
                        message: 'Успешна регистрация!',
                        type: 'success'
                    }
                    setNotification(notification);
                    history.push('/login')
                }
            })
            .catch(console.error)
    }



    return (
        <section className="register">
            <FiUserPlus className="register-icon" />
            <article className="register-form">
                <form onSubmit={onSubmitRegisterHandler}>
                    <label htmlFor="username">
                        <input type="text"  name="username" id="username" placeholder="Потребителско име" required={true}/>
                    </label>
                    <label htmlFor="phone">
                        <input type="text" placeholder="Телефон" name="phone" id="phone" required={true}/>
                    </label>
                    <label htmlFor="email">
                        <input type="email" placeholder="Електронна поща" name="email" id="email" required={true}/>
                    </label>
                    <label htmlFor="password">
                        <input type="password" placeholder="Парола" name="password" id="password" required={true}/>
                    </label>
                    <label htmlFor="repeatPassword">
                        <input type="password" placeholder="Повторете паролата" name="repeatPassword" id="repeatPassword" required={true}/>
                    </label>
                    <button className="register-form-btn">Регистрирай ме</button>
                </form>
            </article>
        </section>
    );
}

export default Register;
