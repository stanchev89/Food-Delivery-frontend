import './ProfileOrders.css';
import {IoMdSearch} from 'react-icons/io';
import {useState} from 'react'
import ShowOrderCart from './ShowOrderCart/ShowOrderCart';

function ProfileOrders({user}){

    const[showCart,setShowCart] = useState(false);
    const[currentOrder,setCurrentOrder] = useState(undefined);

    const toggleShowCart = (order) => {
        if(!order) {
             setShowCart(prev => !prev);
             setCurrentOrder(prev => undefined);
             return;
        }
        setShowCart(prev => !prev);
        setCurrentOrder(prev => order);
    };


    return (
        <article className="profile-orders">
            {
                user?.orders.length === 0
                    ? <p>Все още нямате направени поръчки...</p>
                    :  <table className="order-table">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Адрес</th>
                            <th>Плащане</th>
                            <th>Крайна цена</th>
                            <th>Продукти</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            user?.orders.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)).map(order => (
                                <tr key={order._id}>
                                    <td>{order.date}</td>
                                    <td>{order.address.location}</td>
                                    <td>{order.payment}</td>
                                    <td>{Number(order.totalPrice).toFixed(2)} лв.</td>
                                    <td><IoMdSearch
                                        className="magnifier"
                                        onClick={toggleShowCart.bind(null,order)}
                                        disabled={showCart}
                                    />
                                    </td>
                                </tr>
                            ))

                        }
                        </tbody>
                    </table>
            }
            {
                showCart
                    ? <ShowOrderCart order={currentOrder} closeHandler={toggleShowCart}/>
                    : null
            }
        </article>
    )
}
export default ProfileOrders;
