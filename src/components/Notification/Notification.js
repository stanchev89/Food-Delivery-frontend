import './Notification.css';
import {MdClose, MdDone, MdError} from 'react-icons/md'
import {useContext} from "react";
import NotificationContext from "../../context/NotificationContext";

const Notification = () => {
    const [notification,setNotification] = useContext(NotificationContext);

    const closeNotification = () => {
        setNotification({})
    }

    if(notification?.type !== 'error') {
        setTimeout(() => {
            setNotification({})
        },2500)
    }

    return (
        // eslint-disable-next-line no-useless-concat
        <article className={'notification' + ' ' + notification?.type}>
            {
                notification?.type === 'error'
                    ? <>
                        <MdError className='notification-icon'/>
                        <article className='notification-content'>
                            <p>{notification?.message}</p>
                        </article>
                        <MdClose
                            className='notification-close'
                            onClick={closeNotification}
                        />
                    </>

                    : <>
                        <MdDone className='notification-icon'/>
                        <article className='notification-content'>
                            <p>{notification?.message}</p>
                        </article>
                    </>

            }

        </article>
    )
}

export default Notification;
