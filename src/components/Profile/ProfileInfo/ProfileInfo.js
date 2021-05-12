import './ProfileInfo.css';
import {useState, useEffect} from 'react';
import userService from "../../../services/userService";
import {useContext} from 'react'
import UserContext from "../../../context/UserContext";
import NotificationContext from "../../../context/NotificationContext";
const ProfileInfo = ({history}) => {
    const [user, setUser] = useContext(UserContext);
    const [notification,setNotification] = useContext(NotificationContext);
    useEffect(() => {
        return () => setNotification({});
    },[])

    const [editMode, setEditMode] = useState(false);

    const editModeToggle = () => {
        setEditMode(prev => !prev)
    };

    const checkForMinLength = (obj, count, e) => {
        const [key,value] = Object.entries(obj)[0];
        if (value.length < count) {
            const notification = {
                message: `Твърде малко символа за "${key}". Трябва да бъдат минимум ${count} символа.`,
                type: 'error'
            }
            e.target[key].value = user[key];
            setNotification(notification);
            return Promise.reject('not enough symbols')
        }
        return Promise.resolve()
    };

    const editUserInfoHandler = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const newData = {};
        let invalidInputData = false;
        if (username !== user.username) {
           await checkForMinLength({username}, 3, e)
                .then(() => {
                    newData.username = username
                })
                .catch(() => invalidInputData = true);
            if (invalidInputData) return
        }
        if (phone !== user.phone) {
           await checkForMinLength({phone}, 5, e)
                .then(() => newData.phone = phone)
                .catch(() => invalidInputData = true);
            if (invalidInputData) return
        }
        if (email !== user.email) {
           await checkForMinLength({email}, 6, e)
                .then(() => newData.email = email)
                .catch(() => invalidInputData = true);
            if (invalidInputData) return;
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)){
                setNotification({
                    message: 'Невалиден емайл адрес',
                    type: 'error'
                });
                e.target.email.value = user.email;
                editModeToggle();
                return;
            }
        }
        if (Object.keys(newData).length === 0) {
            return editModeToggle();
        }
        userService.editUserData(newData)
            .then(res => {
                if (res.message) {
                    const mongoError = res.message.split('dup key: ');
                    if(mongoError.length > 0) {
                        const curMessage = JSON.parse(JSON.stringify(mongoError[1].split(' ')));
                        const duplicatedProp = (Object.values(curMessage)[1]).split(':')[0].trim();
                        e.target[duplicatedProp].value = user[duplicatedProp];
                        setNotification({
                            message: `Името вече е заето - ${duplicatedProp}`,
                            type: 'error'
                        });
                         editModeToggle();
                         return;
                    }
                    const notification = {
                        message: res.message,
                        type: 'error'
                    };
                    setNotification(notification);
                    return editModeToggle();
                }

                    const notification = {
                        message: 'Промените са запаметени.',
                        type: 'success'
                    };
                    setNotification(notification);
                    setUser(res);
                    editModeToggle();

            })
            .catch(history.push('/profile'));
    };
    return (
        <article className="profile-info">
            <form className="profile-info-form" onSubmit={editUserInfoHandler}>
                <label htmlFor="username">Потребителско име</label>
                <input type="text"
                       defaultValue={user?.username}
                       name="username"
                       disabled={!editMode}
                       className={editMode ? 'editing' : ''}
                />
                <label htmlFor="email">Е-майл</label>
                <input type="email"
                       defaultValue={user?.email}
                       name="email"
                       disabled={!editMode}
                       className={editMode ? 'editing' : ''}
                />
                <label htmlFor="phone">Телефон</label>
                <input type="phone"
                       defaultValue={user?.phone}
                       name="phone"
                       disabled={!editMode}
                       className={editMode ? 'editing' : ''}
                />
                <article className="profile-info-form-btn-wrapper">
                    <button className={!editMode ? "profile-form-btn edit" : "profile-form-btn back"}
                            type="button"
                            onClick={editModeToggle}
                    >{editMode ? "Назад" : "Редактирай"}
                    </button>
                    {
                        editMode
                            ? <button
                                type="submit"
                                className="profile-form-btn"
                            >Потвърди
                            </button>
                            : null
                    }
                </article>
            </form>

        </article>
    )
}

export default ProfileInfo;
