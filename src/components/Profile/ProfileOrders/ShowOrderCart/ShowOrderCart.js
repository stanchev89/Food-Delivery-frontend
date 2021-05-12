import './ShowOrderCart.css';
import {FiShoppingCart} from 'react-icons/fi';
import {IoMdClose} from 'react-icons/io';
import {useEffect, useRef} from 'react';

function ShowOrderCart({order, closeHandler}) {
    const myRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = (event) => {
        if(!myRef.current.contains(event.target)) {
            closeHandler('close');
        }
    };
    const showOptions = (item) => {
        const options = [];
        if (item.selected_options) {
            for (const opt in item.selected_options) {
                options.push(`${opt}: ${item.selected_options[opt]}`);
            }
        }
        return options
    };
    const getCartProductsPrice = (products) => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += product.price * product.quantity
        });
        return totalPrice.toFixed(2) + ' лв.'
    };
    return (
        <>
            <article className="show-order-cart" ref={myRef}>
                <article className="show-order-cart-icons">
                    <FiShoppingCart className="profile-order-cart-icon"/>
                    <IoMdClose className="close-order-cart"
                               onClick={closeHandler.bind(null, 'close')}
                    />
                </article>
                <p className="order-number">Поръчка &#x2116;: {order._id}</p>
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
                        order?.cart?.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <p>{item.name}</p>
                                    <p className="dish-selected-options">{showOptions(item).length > 0 ? showOptions(item).join(', ') : ''}</p>
                                </td>
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
                        <td className="tr-summary-content-item name">{getCartProductsPrice(order.cart)}</td>
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
        </>
    )
}

export default ShowOrderCart;
