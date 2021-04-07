import './ProfileAddress.css';
import {useState} from 'react';
import ProfileAddressItem from "./ProfileAddressItem/ProfileAddressItem";
import AddNewAddressForm from '../AddNewAddressForm/AddNewAddressForm';


const ProfileAddress = ({user, setUser, setNotification, onDeleteAddressHandler, onUpdateExistAddressHandler}) => {
    const [addAddressMode, setAddAddressMode] = useState(false);

    const toggleNewAddressForm = () => {
        setAddAddressMode(prev => !prev);
    };

    return (
        <section className="profile-address">
            {
                user?.address.map((adr, index) => (
                    <ProfileAddressItem
                        key={adr?.location + adr?.region}
                        address={adr}
                        index={index}
                        onDeleteAddressHandler={onDeleteAddressHandler}
                        onUpdateExistAddressHandler={onUpdateExistAddressHandler}
                        setNotification={setNotification}
                    />
                ))
            }

            {
                user?.address.length === 0
                    ? <p>Нямате добавени адреси...</p>
                    : null
            }

            {
                addAddressMode
                    ? <AddNewAddressForm user={user} setUser={setUser} toggleNewAddressForm={toggleNewAddressForm}/>
                    : <button className="add-new-address-btn"
                              onClick={toggleNewAddressForm}
                    >
                        Добави нов адрес
                    </button>
            }


        </section>
    )
}

export default ProfileAddress;
