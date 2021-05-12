import './OrderAddress.css';
import environments from "../../../environments";
import {useState, useEffect, useContext} from 'react';
import AddNewAddressForm from '../../Profile/AddNewAddressForm/AddNewAddressForm';
import UserContext from "../../../context/UserContext";

const mapBgRegions = environments.mapBgRegions;
const OrderAddress = ({setOrder}) => {
    const [user, setUser] = useContext(UserContext);
    const [viewNewAddress, setViewNewAddress] = useState(false);

    const toggleNewAddressForm = () => {
        setViewNewAddress(prevState => !prevState);
    };

    useEffect(() => {
        if(user?.address.length > 0) {
            setOrder(prevState => ({...prevState,address: user.address[0]}))
        }
    },[]);
    //
    // useEffect(() => {
    //     if(user?.address.length > 0) {
    //         setOrder(prevState => ({...prevState,address: user.address[0]}))
    //     }
    // },[user?.address]);

    const onSelectAddressHandler = (e) => {
        const selectedLocation = e.target.value;
        const selected = user?.address?.find(adr => adr.location === selectedLocation);
        if(selected) {
            const {region,location,delivery} = selected;
            setOrder(prevState => ({...prevState, address: {region, location, delivery}}));
        }
    };
    return (
        <article className="order-address">
            <h3>Изберете адрес</h3>
            {
                viewNewAddress
                    ? <AddNewAddressForm user={user} setUser={setUser} toggleNewAddressForm={toggleNewAddressForm}/>
                    : <article className="my-address">
                        <form className="my-address-form" >
                            <p>Моите адреси:</p>
                            <select name="address" id="address" onChange={onSelectAddressHandler}>
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
