import './CartItem.css';
import {IoIosArrowUp, IoIosArrowDown,IoIosBackspace} from 'react-icons/io';

function CartItem({item, onChangeItemQuantity, onRemoveItem}) {

    return (
        <>
            {
                item ? (<article className="cart-item">
                        <h5 className="cart-item-title">
                            {item.name}
                        </h5>
                        <article className="cart-item-quantity">
                            <article className="cart-item-quantity-icons">
                                <IoIosArrowUp className="item-quantity-up" onClick={onChangeItemQuantity.bind(null,item,"add")}/>
                                <IoIosArrowDown className="item-quantity-down" onClick={onChangeItemQuantity.bind(null,item,"subtract")}/>
                            </article>
                            <p> <strong>{item.quantity}</strong> * <i>{Number(item.price).toFixed(2)}</i> лв. =</p>
                            <p className="item-total-price">
                                {Number(item.quantity * item.price).toFixed(2)} лв.
                            </p>
                            <IoIosBackspace
                                className="cart-item-remove-icon"
                                label="Remove dish"
                                onClick={onRemoveItem.bind(null, item)}
                            />
                        </article>
                    </article>)
                    : <p>Loading...</p>
            }
        </>
    )
}

export default CartItem;