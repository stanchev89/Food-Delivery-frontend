import "./Menu.css";
import DishItem from "./DishItem/DishItem";
import Cart from "../Cart/Cart";
import foodService from "../../services/foodService";
import Login from "../Login/Login";

function Menu(props) {
    const {menu, user, setUser, match, history,setNotification} = props;
    const addToCart = (dish) => {
        foodService.addToCart(user, dish)
            .then(user => {
                setUser(user);
            })
            .catch(console.error)
    }

    return (
        <section className="menu">
            <article className="food-list">
                <article className="salads">
                    <h2 className="food-list-title">Салати</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "salad").map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="soups">
                    <h2 className="food-list-title">Супи</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "soup").map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="main-dishes">
                    <h2 className="food-list-title">Основни ястия</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "main").map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="deserts">
                    <h2 className="food-list-title">Десерти</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "desert").map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="drinks">
                    <h2 className="food-list-title">Напитки</h2>
                    <ul>
                        {menu?.filter((d) => d.category === "drink").map((d) => (
                            <li key={d._id}>
                                <DishItem dish={d} addToCart={addToCart} isLogged={!!user}/>
                            </li>
                        ))}
                    </ul>
                </article>
            </article>
            {
                user
                    ? <Cart user={user} setUser={setUser} match={match}/>
                    : <Login setUser={setUser} history={history} setNotification={setNotification}/>
            }
        </section>
    );
}

export default Menu;
