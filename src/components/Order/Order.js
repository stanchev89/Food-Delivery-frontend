import './Order.css';
import Cart from "../Cart/Cart";
import OrderAddress from "./OrderAddress/OrderAddress";
import OrderPayment from "./OrderPayment/OrderPayment";
import {useState,useEffect, useContext} from 'react'
import OrderDescription from "./OrderDescription/OrderDescription";
import environments from "../../environments";
import userService from "../../services/userService";
import UserContext from "../../context/UserContext";
import NotificationContext from "../../context/NotificationContext";

function Order({match,history}) {
    const [user, setUser] = useContext(UserContext);
    const [notification,setNotification] = useContext(NotificationContext);
    const [order,setOrder] = useState({cart:user?.cart});
    const [delivery, setDelivery] = useState(0.5);

    useEffect(() => {
        if(Number(user?.cart?.totalPrice) >= 10) {
            setDelivery(0.5);
        } else {
            const deliveryPerRegion = Number(environments.regions[order?.address?.region]);
            if(!isNaN(deliveryPerRegion)) {
                setDelivery(deliveryPerRegion);
            }
        }
    },[user.cart.totalPrice, order]);


    const onSubmitOrderHandler = () => {

        const newOrder = {
            cart:order?.cart?.products,
            address: {region:order?.address?.region, location: order?.address?.location},
            delivery: delivery,
            totalPrice:order?.cart?.totalPrice + delivery,
            description:order.description || '',
            payment: order?.payment,
            date: new Date().toLocaleString()
        };
        const validOrder = (!!newOrder.cart) && (!!newOrder.address.location) && (!!newOrder.address.region) && (!!newOrder.delivery) && (!!newOrder.totalPrice) && (!!newOrder.payment);
        if(validOrder) {
            userService.addNewOrder(newOrder)
                .then(res => {
                    const updatedUser = user;
                    updatedUser.cart = {};
                    setUser(updatedUser);
                    const notification = {
                        message:'Благодарим ви за поръчката!',
                        type: 'success'
                    };
                    setNotification(notification);
                    history.push('/')
                }).catch(console.error);

        }else {
            const notification = {
                message: 'Моля, въведете адрес и начин на плащане!',
                type: 'error'
            };
            setNotification(notification)
        }

    };
    useEffect(() => {
        setOrder(prevState => ({...prevState, cart:user?.cart}))
    },[user?.cart?.products]);

    return (
        <section className="finish-order">
            <h1 className="finish-order-title">Завършване на поръчка</h1>
            <article className="finish-order-details">
                {
                    user?.cart?.products?.length > 0
                        ? <>
                            <Cart match={match}/>
                            <OrderAddress setOrder={setOrder} setUser={setUser} />
                            <OrderPayment setOrder={setOrder}/>
                            <OrderDescription setOrder={setOrder}/>
                        </>
                        : <p>Нямате добавени продукти в количката...</p>

                }
            </article>
            {
                user?.cart?.products?.length > 0
                ? <>
                        <article className="finish-order-summary">
                            {
                                delivery !== undefined
                                    ? <>
                                        <p>Доставка: <strong>{delivery.toFixed(2) || 0.5}</strong> лв.</p>
                                        <p className="finish-order-summary-total-process">
                                            Крайна сума: <strong>{(Number(order?.cart?.totalPrice) + Number(delivery)).toFixed(2)} лв.</strong>
                                        </p>
                                    </>
                                    :null
                            }
                        </article>

                        <button className="finish-order-submit-btn" onClick={onSubmitOrderHandler}>
                            Потвърди поръчката
                        </button>
                    </>
                    : null
            }

        </section>

    )
}

export default Order;

// {
//     cart: [
//         {
//             name: types.String,
//             price: types.Number,
//             options: [
//                 {
//                     key: types.String,
//                     values: [ types.String ]
//                 }
//             ],
//             selected_options: [ types.String ],
//             quantity: {
//                 type: types.Number
//             }
//         }
//     ],
//         address: {
//     region:types.String,
//         location:types.String,
//         delivery:types.Number
// },
//     note: types.String,
//         totalPrice: types.Number
// }
