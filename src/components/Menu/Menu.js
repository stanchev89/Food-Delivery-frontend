import "./Menu.css";
import DishItem from "./DishItem/DishItem";
import Cart from "../Cart/Cart";
import foodService from "../../services/foodService";
import Login from "../Login/Login";
import {useState} from 'react'

function Menu(props) {
    const {user,setUser,menu, match, history,setNotification} = props;
    const [meatlessMode, setMeatlessMode] = useState(false);

    const addToCart = (dish) => {
        foodService.addToCart(user, dish)
            .then(user => {
                setUser(user);
            })
            .catch(console.error)
    };
    const toggleMenuToShow = (e) => {
        setMeatlessMode(prev => !prev);
    };


    return (
        <section className="menu">
            <article className="food-list">
                <article className="toggle-meatless">
                        <label className="switch">
                            <input type="checkbox" name='showMeatless' onChange={toggleMenuToShow}/>
                            <span className="slider round"/>
                        </label>
                        <p>постни ястия</p>
                </article>
                <article className="salads">
                    <h2 className="food-list-title">Салати</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "salad" && (meatlessMode ? d.meatless : true)).map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="soups">
                    <h2 className="food-list-title">Супи</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "soup" && (meatlessMode ? d.meatless : true)).map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="main-dishes">
                    <h2 className="food-list-title">Основни ястия</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "main" && (meatlessMode ? d.meatless : true)).map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="deserts">
                    <h2 className="food-list-title">Десерти</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "desert" && (meatlessMode ? d.meatless : true)).map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="drinks">
                    <h2 className="food-list-title">Напитки</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "drink" && (meatlessMode ? d.meatless : true)).map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
            </article>
            {
                user
                    ? <Cart match={match}/>
                    : <Login user={user} setUser={setUser} history={history} setNotification={setNotification}/>
            }
        </section>
    );
}

export default Menu;
