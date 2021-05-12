import './ProfileAddressItem.css';
import {useContext, useState} from 'react';
import {FiCheck, FiEdit2, FiTrash} from 'react-icons/fi'
import {IoMdClose} from 'react-icons/io';
import environments from "../../../../environments";
import NotificationContext from "../../../../context/NotificationContext";

const mapBgRegions = environments.mapBgRegions;

const ProfileAddressItem = ({address, index,onDeleteAddressHandler,onUpdateExistAddressHandler}) => {
    const [notification,setNotification] = useContext(NotificationContext);
    const [editMode, setEditMode] = useState(false);
    const [location,setLocation] = useState(address.location);

    const onChangeLocationHandler = (e) => {
        setLocation(prev => e.target.value);
    };

    const editExistAddressHandler = () => {
        if(location === address.location) {
            return toggleEditMode();
        }
        if(location.length < 10) {
            setNotification({
                message: 'Твърде кратък адрес! Необходими са минимум 10 символа.',
                type: 'error'
            });
            toggleEditMode(false);
            return
        }
        const newAddress = {
            region: address.region,
            location: location,
            delivery: address.delivery
        };
        onUpdateExistAddressHandler(address,newAddress,index);
    };

    const toggleEditMode = (changes) => {
        if (!changes) {
            setLocation(address.location);
        }
        setEditMode(prev => !prev);
    };

    const deleteCurrentAddress = () => {
        return onDeleteAddressHandler(address, Number(index));
    };

    return (
        <article className="profile-address-item">
            <article className="profile-address-item-wrapper region">
                <label htmlFor="add-address-region">Регион</label>
                <input type="text"
                       name="region"
                       defaultValue={mapBgRegions[address.region]}
                       disabled={true}
                />
            </article>

            <article className="profile-address-item-wrapper location">
                <label htmlFor="add-address-location">Точен адрес</label>
                <input type="text"
                       name="location"
                       value={location}
                       disabled={!editMode}
                       onChange={onChangeLocationHandler}
                       className={editMode ? 'editing-location' : ''}
                />
            </article>
            <article className="profile-address-item-wrapper buttons">
                {

                    editMode
                        ? <>
                            <FiCheck className="confirm" onClick={editExistAddressHandler}/>
                            <IoMdClose onClick={toggleEditMode.bind(null,false)}/>
                        </>

                        : <>
                            <FiEdit2 onClick={toggleEditMode}/>
                            <FiTrash onClick={deleteCurrentAddress}/>
                        </>


                }
            </article>
        </article>
    )
}

export default ProfileAddressItem;
