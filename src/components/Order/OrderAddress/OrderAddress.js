import './OrderAddress.css';
import userService from "../../../services/userService";
import environments from "../../../environments";
import {useState, useEffect} from 'react';
import AddNewAddressForm from '../../Profile/AddNewAddressForm/AddNewAddressForm';

const mapBgRegions = environments.mapBgRegions;
const OrderAddress = ({user, order, setOrder, setUser}) => {

    const [viewNewAddress, setViewNewAddress] = useState(false);

    const toggleNewAddressForm = () => {
        setViewNewAddress(prevState => !prevState);
    };

    useEffect(() => {
        if(user?.address.length > 0) {
            setOrder(prevState => ({...prevState,address: user.address[0]}))
        }
    },[user]);

    const onSelectAddressHandler = (e) => {
        const selectedLocation = e.target.value;
        const selected = user?.address?.find(adr => adr.location === selectedLocation)
        if(selected) {
            const {region,location,delivery} = selected;
            setOrder(prevState => ({...prevState, address: {region, location, delivery}}))
        }
    }
    return (
        <article className="order-address">
            <h3>Изберете адрес</h3>
            {
                viewNewAddress
                    ? <AddNewAddressForm user={user} setUser={setUser} toggleNewAddressForm={toggleNewAddressForm}/>
                    : <article className="my-address">
                        <form className="my-address-form" onChange={onSelectAddressHandler}>
                            <p>Моите адреси:</p>
                            <select name="address" id="address">
                                {
                                    user?.address.map(adr => (
                                        <option key={adr.location} value={adr.location}>{adr.location}, {mapBgRegions[adr.region]}</option>
                                    ))
                                }
                            </select>
                        </form>
                        <button className="add-new-address-btn" onClick={toggleNewAddressForm}>Добави нов адрес</button>
                    </article>

            }

        </article>
    )
}
export default OrderAddress;
