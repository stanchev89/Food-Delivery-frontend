import "./App.css";
import foodService from "./services/foodService";
import userService from "./services/userService";


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Register from "./components/Register/Register"
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Order from "./components/Order/Order";
import Contacts from "./components/Contacts/Contacts";
import Posts from "./components/Posts/Posts";
import About from "./components/About/About";
import Conditions from "./components/Conditions/Conditions";
import PageNotFound from "./components/PageNotFound/PageNotFound"

import {Route, Switch} from "react-router-dom";
import {Component} from "react";
import Cart from "./components/Cart/Cart";
import Notification from "./components/Notification/Notification";
import Profile from "./components/Profile/Profile";
import UserContext from "./context/UserContext";
import ErrorBoundary from "./ErrorBoundary";
import Routeguard from "./hoc/RouteGuard";
import NotificationContext from './context/NotificationContext';
import * as routes from './routes'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            currentUser: undefined,
            notification: {
                message: '',
                type: ''
            }
        };
        this.setUser = this.setUser.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this);
        this.setNotification = this.setNotification.bind(this);
    }

     componentDidMount() {
        foodService.getDailyMenu()
            .then(dishes => {
                this.setState(state => ({...state, menu: dishes}))
            }).catch(err => console.error(err));
         userService.getUserInfo()
            .then(user => {
                if (user) {
                    this.setState((state) => ({currentUser: user.message ? undefined : user}))
                }
            }).catch(err => console.error(err));
    }

    setUser(user) {
        return this.setState((state) => (
            {
                ...state,
                currentUser: user
            }
        ))
    }

    setNotification(notification) {
        return this.setState((state) => (
            {
                ...state,
                notification
            }
        ))
    };

    getUserInfo() {
        userService.getUserInfo()
            .then(user => {
                console.log(user);
                this.setState((state) => ({...state, currentUser: user}))
            }).catch(err => console.error(err));
    }

    render() {
        return (
            <div className="App">
                <UserContext.Provider value={[this.state.currentUser, this.setUser]}>
                    <NotificationContext.Provider value={[this.state.notification, this.setNotification]}>
                        <Header/>
                        {
                            this.state.notification.message
                                ? <Notification
                                    notification={this.state.notification}
                                    setNotification={this.setNotification}
                                />
                                : null
                        }
                        <main className="app-main">
                            <ErrorBoundary>
                                <Switch>

                                    <Route path={routes.rootPath} exact render={(props) => (
                                        <Menu {...props}
                                              menu={this.state.menu}
                                        />
                                    )}/>

                                    <Route path={routes.register}
                                           render={ () =>
                                               (
                                                   <Routeguard mustBeLoggedIn={false} redirectTo={routes.login}>
                                                       <Register/>
                                                   </Routeguard>
                                               )
                                           }
                                    />

                                    <Route path={routes.login}
                                           render={ () =>
                                               (
                                                   <Routeguard mustBeLoggedIn={false} redirectTo={routes.rootPath}>
                                                       <Login/>
                                                   </Routeguard>
                                               )
                                           }
                                    />


                                    <Route path={routes.profile}
                                           render={ () =>
                                               (
                                                   <Routeguard mustBeLoggedIn={true} redirectTo={routes.login}>
                                                       <Profile/>
                                                   </Routeguard>
                                               )
                                           }
                                    />

                                    <Route path={routes.logout}
                                           render={() =>
                                               (
                                                   <Routeguard mustBeLoggedIn={true} redirectTo={routes.login}>
                                                       <Logout/>
                                                   </Routeguard>
                                               )
                                           }
                                    />

                                    <Route path={routes.cart}
                                           render={ ({match,location}) =>
                                               (
                                                   <Routeguard
                                                       mustBeLoggedIn={true}
                                                       redirectTo={routes.login}
                                                       match={match}
                                                       location={location}
                                                   >
                                                       <Cart/>
                                                   </Routeguard>
                                               )
                                           }
                                    />

                                    <Route path={routes.order}
                                           render={ ({match,location,history}) =>
                                               (
                                                   <Routeguard mustBeLoggedIn={true} match={match} history={history} location={location} redirectTo={routes.login}>
                                                       <Order/>
                                                   </Routeguard>
                                               )
                                           }
                                    />

                                    <Route path={routes.posts} exact component={Posts}/>
                                    <Route path={routes.contacts} exact component={Contacts}/>
                                    <Route path={routes.about} exact component={About}/>
                                    <Route path={routes.conditions} exact component={Conditions}/>
                                    <Route path="*" component={PageNotFound}/>
                                </Switch>
                            </ErrorBoundary>
                        </main>
                        <Footer/>
                    </NotificationContext.Provider>

                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
