import './AddNewAddressForm.css';
import environments from "../../../environments";
import userService from "../../../services/userService";
import {useContext} from 'react'
import UserContext from "../../../context/UserContext";

const mapRegions = environments.regions;
const mapBgRegions = environments.mapBgRegions;

function AddNewAddressForm({toggleNewAddressForm}) {
    const [user, setUser] = useContext(UserContext);

    const addUserNewAddress = (e) => {
        e.preventDefault();
        const region = e.target.region?.value;
        const location = e.target.location?.value;
        const exist = user?.address?.find(adr => adr.location === location);
        if(region && location && ! exist) {
            const delivery = mapRegions[region];
            const newAddress = {region, location, delivery}
            userService.editUserData({addAddress: newAddress})
                .then(user => setUser(user))
                .then(() => toggleNewAddressForm())
                .catch(console.error)
        }
    };


    return (
        <article className="add-new-address">
            <p>Добавяне на нов адрес</p>
            <form className="add-new-address-form" onSubmit={addUserNewAddress}>
                <label htmlFor="region">Регион</label>
                <select name="region" id="region">
                    {
                        Object.keys(mapRegions).map(key => (
                            <option value={key} key={key}>{mapBgRegions[key]}</option>
                        ))
                    }
                </select>
                <label htmlFor="add-new-address">Адрес</label>
                <input type="text" name="location" id="add-new-address"/>
                <article className="add-new-address-form-ctrl">
                    <button type="button" className="close-new-address-btn"
                            onClick={toggleNewAddressForm}>Затвори
                    </button>
                    <input type="submit" className="confirm-new-address-btn" value="Добави"/>
                </article>
            </form>
        </article>
    )
}

export default AddNewAddressForm;
