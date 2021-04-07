import './ShowOrderCart.css';
import {FiShoppingCart} from 'react-icons/fi';
import {IoMdClose, IoMdSearch} from 'react-icons/io'

function ShowOrderCart({order,closeHandler}) {

    const getCartProductsPrice = (products) => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += product.price * product.quantity
        });
        return totalPrice.toFixed(2) + ' лв.'
    }
    return (
        <article className="show-order-cart">
                <article className="show-order-cart-icons">
                    <FiShoppingCart className="profile-order-cart-icon"/>
                    <IoMdClose className="close-order-cart"
                               onClick={closeHandler}
                    />
                </article>
            <table className="order-cart-table">
                <thead>
                <tr>
                    <th>Продукт</th>
                    <th>Количество</th>
                    <th>Единична цена</th>
                </tr>
                </thead>
                <tbody>
                {
                    order?.cart?.map((item,i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{Number(item.price).toFixed(2)} лв.</td>
                        </tr>
                    ))

                }
                <tr className="tr-summary">
                    <th>Цена продукти</th>
                    <th>Доставка</th>
                    <th>Крайна цена</th>
                </tr>
                <tr className="tr-summary-content">
                    <td className="tr-summary-content-item">{getCartProductsPrice(order.cart)}</td>
                    <td className="tr-summary-content-item">{Number(order.delivery).toFixed(2)} лв.</td>
                    <td className="tr-summary-content-item">{Number(order.totalPrice).toFixed(2)} лв.</td>
                </tr>
                </tbody>
            </table>
            {
                order.description
                    ? <article className="show-order-cart-description">
                        <p className="description-title">Бележка към поръчката:</p>
                        <q>{order.description}</q>
                    </article>
                    : null
            }

        </article>
    )
}

export default ShowOrderCart;
