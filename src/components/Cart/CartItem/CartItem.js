import './CartItem.css';
import {IoIosArrowDown, IoIosArrowUp, IoIosBackspace} from 'react-icons/io';
import {useEffect, useState} from 'react'

function CartItem({item, onChangeItemQuantity, onRemoveItem}) {
    const [selectedOptions, setSelectedOptions] = useState('');

    useEffect(() => {
        const output = [];
        for (const key in item.selected_options) {
            output.push(`${key}: ${item.selected_options[key]}`);
        }
        setSelectedOptions(prev => output.join(', '))

    }, []);
    return (
        <>
            {
                item ? (<article className="cart-item">
                        <h5 className="cart-item-title">
                            {item.name}
                        </h5>
                        {
                            selectedOptions.length > 0
                                ? <p className="selected-options">
                                    ({selectedOptions})
                                </p>
                                : null
                        }

                        <article className="cart-item-quantity">
                            <article className="cart-item-quantity-icons">
                                <IoIosArrowUp className="item-quantity-up"
                                              onClick={onChangeItemQuantity.bind(null, item, "add")}/>
                                <IoIosArrowDown className="item-quantity-down"
                                                onClick={onChangeItemQuantity.bind(null, item, "subtract")}/>
                            </article>
                            <p><strong>{item.quantity}</strong> * <i>{Number(item.price).toFixed(2)}</i> лв. =</p>
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
