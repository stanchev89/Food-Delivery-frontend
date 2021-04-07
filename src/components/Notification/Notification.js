import './Notification.css';
import {MdClose, MdDone, MdError} from 'react-icons/md'

const Notification = ({notification, setNotification}) => {

    const closeNotification = () => {
        setNotification({})
    }

    if(notification?.type !== 'error') {
        setTimeout(() => {
            setNotification({})
        },2500)
    }

    return (
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
