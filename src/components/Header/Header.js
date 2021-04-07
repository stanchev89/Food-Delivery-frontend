import "./Header.css";
import {NavLink, Link} from "react-router-dom";
import {FaUser, FaShoppingCart} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

function Header(props) {
    const {user} = props;
    return (
        <article className="container-header">
            <article className="container-left">
                <Link to="/">
                    <img src="foodDelivery-icon.png" alt="site-logo" className="logo"/>
                </Link>
            </article>

            <article className="container-middle">
                <nav className="nav-bar">
                    <ul>
                        <li>
                            <NavLink to="/"
                                     exact
                                     activeClassName="is-active">
                                Обедно меню
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"
                                     exact
                                     activeClassName="is-active">
                                За нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/conditions"
                                     exact
                                     activeClassName="is-active"
                            >
                                Условия
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts"
                                     exact
                                     activeClassName="is-active">
                                Мнения
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacts"
                                     exact
                                     activeClassName="is-active">
                                Контакти
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </article>

            <article className="container-right">
                <article className="user-bar">
                    {
                        user?.username
                            ? (
                                <ul>
                                    <li>
                                        <NavLink to="/profile" className="user-bar-username-wrapper">
                                            <p className="user-bar-username">{user?.username}</p>
                                            <FaUser/>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Link to="/cart">
                                            <FaShoppingCart/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">
                                            <FiLogOut/>
                                        </Link>
                                    </li>
                                </ul>
                            )
                            : (
                                <ul>
                                    <li>
                                        <NavLink to="/login" exact
                                                 activeClassName="is-active">
                                            Вход
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register"
                                                 exact
                                                 activeClassName="is-active"
                                        >Регистрация
                                        </NavLink>
                                    </li>
                                </ul>
                            )
                    }

                </article>
            </article>
        </article>
    );
}

export default Header;
