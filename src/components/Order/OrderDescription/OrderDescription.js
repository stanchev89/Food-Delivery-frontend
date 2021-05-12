import './OrderDescription.css';

const OrderDescription = ({setOrder}) => {
    const onBlurOrderDescription = (e) => {
        const description = e.target.value;
        setOrder(prevState => ({...prevState, description}))
    }
    return (
        <article className="order-description">
            <h5 className="order-description-title">
                Бележка към поръчката
            </h5>
            <textarea name="description" id="order-description" cols="30" rows="10" onBlur={onBlurOrderDescription}></textarea>
        </article>
    )
}

export default OrderDescription;
