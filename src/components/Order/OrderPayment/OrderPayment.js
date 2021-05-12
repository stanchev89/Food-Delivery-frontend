import './OrderPayment.css';
const OrderPayment = ({setOrder}) => {
    const selectedPaymentHandler = (e) => {
        const paymentMethod = e.target.value;
        setOrder(prevState => ({...prevState, payment: paymentMethod}))
    }
    return (
        <article className="order-payment">
            <h3>Начин на плащане</h3>
            <form className="payment-select">
                <label htmlFor="cash">В брой</label>
                <input type="radio" id="cash" name="payment" value="cash" onChange={selectedPaymentHandler} />
                <label htmlFor="cash">С карта</label>
                <input type="radio" id="card" name="payment" value="card" onChange={selectedPaymentHandler} />
            </form>
        </article>
    )
}
export default OrderPayment;
