import './Cart.css';
import {FiShoppingCart} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import CartItem from "./CartItem/CartItem";
import foodService from "../../services/foodService";
import {Link} from 'react-router-dom'

function Cart(props) {
    const {user, setUser, match} = props;
    const onChangeItemQuantity = (item, action) => {
        action === 'add' ? item.quantity++ : item.quantity--;
        foodService.addToCart(user, item, action)
            .then(user => setUser(user))
            .catch(console.error);
    }

    const clearCart = () => {
        foodService.clearCart()
            .then(user => setUser(user))
            .catch(console.error);
    }

    const onRemoveItemHandler = (dish) => {
        foodService.removeItemFromCart(user, dish)
            .then(user => setUser(user))
            .catch(console.error);
    }
    return (
        <section className="cart">
            <article className="cart-icon-wrapper">
                <FiShoppingCart className="cart-icon"/>
                <BsTrash className="cart-trash-icon" onClick={clearCart}/>
            </article>
            {
                user?.cart?.products?.length > 0
                    ?
                    <article className="cart-dishes">
                        <ul>
                            {
                                user?.cart?.products.map(item => (
                                    <li key={item?.name}>
                                        <CartItem item={item}
                                                  onChangeItemQuantity={onChangeItemQuantity}
                                                  onRemoveItem={onRemoveItemHandler}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                        <article className="cart-summary">
                            <p className="cart-summary-text">Общо</p>
                            <article className="cart-summary-ctrl">
                                <p className="cart-total-price">
                                    {Number(user?.cart?.totalPrice).toFixed(2)} лв.
                                </p>

                                {
                                    !match.path.includes('order')
                                        ? <Link to="order" >
                                            <button className="cart-summary-btn">Поръчай</button>
                                        </Link>
                                        : null
                                }
                            </article>

                        </article>

                    </article>
                    : <p>Няма добавени продукти...</p>
            }

        </section>
    )
}

export default Cart;


// <a *ngIf="(user$ | async).cart.products.length > 0" routerLink="/cart" class="cart-badge">{{(user$ | async).cart.products.length}}</a>
// <i class="fas fa-shopping-cart fa-2x"></i>
// <ng-container *ngTemplateOutlet=" orderDetails ? details : cartProducts"></ng-container>
// <p class="empty-cart" *ngIf="(user$ | async).cart.products.length === 0 && !orderCompleted">Няма добавени продукти...</p>
// <div class="alert alert-success" role="alert" *ngIf="orderCompleted">
// <p>Вашата поръчка е приета.</p>
// <p>Благодарим ви!</p>
// <i class="fas fa-check-circle fa-5x"></i>
// </div>
