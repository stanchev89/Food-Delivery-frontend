import './Profile.css';
import {NavLink, Route, Switch} from 'react-router-dom'
import {FaUser} from 'react-icons/fa';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileAddress from "./ProfileAddress/ProfileAddress";
import userService from "../../services/userService";
import ProfileOrders from "./ProfileOrders/ProfileOrders";


const Profile = ({user, setUser, match, setNotification}) => {
    const onDeleteAddressHandler = (adr, idx) => {
        user.address.splice(idx, 1);
        userService.editUserData({deleteAddress: adr});
        setUser(user);
    };

    const onUpdateExistAddressHandler = (oldAddress, newAddres, idx) => {
        user.address.splice(idx, 1, newAddres);
        userService.editUserData({deleteAddress: oldAddress});
        userService.editUserData({addAddress: newAddres});
        setUser(user);
    }
    return (

        <section className="profile">
            {
                user
                    ? <>
                        <section className="profile-header">
                            <nav className="profile-header-nav">
                                <NavLink
                                    to={match.url}
                                    exact
                                    activeClassName="is-active">
                                    Моите данни
                                </NavLink>
                                <NavLink
                                    to={match.url + '/address'}
                                    exact
                                    activeClassName="is-active">
                                    Моите адреси
                                </NavLink>
                                <NavLink
                                    to={match.url + '/orders'}
                                    exact
                                    activeClassName="is-active">
                                    Моите поръчки
                                </NavLink>
                            </nav>
                        </section>

                        <section className="profile-content">
                            <article className="profile-icon-wrapper">
                                <FaUser className="profile-icon"/>
                            </article>
                            <Switch>
                                <Route path="/profile" exact render={(props) => (
                                    <ProfileInfo {...props}
                                                 user={user}
                                                 setUser={setUser}
                                                 setNotification={setNotification}
                                    />
                                )}/>
                                <Route path="/profile/address" exact render={(props) => (
                                    <ProfileAddress {...props}
                                                    user={user}
                                                    setUser={setUser}
                                                    setNotification={setNotification}
                                                    onDeleteAddressHandler={onDeleteAddressHandler}
                                                    onUpdateExistAddressHandler={onUpdateExistAddressHandler}
                                    />
                                )}/>
                                <Route path="/profile/orders" exact render={(props) => (
                                    <ProfileOrders {...props} user={user}/>
                                )}/>
                            </Switch>
                        </section>
                    </>
                    : null
            }

        </section>


    )
}
;

export default Profile;
