import './ProfileAddress.css';
import {useState} from 'react';
import ProfileAddressItem from "./ProfileAddressItem/ProfileAddressItem";
import AddNewAddressForm from '../AddNewAddressForm/AddNewAddressForm';
import {useContext} from 'react'
import UserContext from "../../../context/UserContext";


const ProfileAddress = ({onDeleteAddressHandler, onUpdateExistAddressHandler}) => {
    const [addAddressMode, setAddAddressMode] = useState(false);
    const [user] = useContext(UserContext);

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
                    ? <AddNewAddressForm toggleNewAddressForm={toggleNewAddressForm}/>
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
