import './Contacts.css';
import {BiPhone} from 'react-icons/bi';
import {GoLocation,GoMail} from 'react-icons/go'
function Contacts() {
    return (
        <section className="contacts">
            <article className="contacts-content">
                <article className="contacts-phone">
                    <BiPhone className="contacts-icon"/>
                    <h2>+359 878 123 123</h2>
                </article>
                <article className="contacts-email">
                    <GoMail className="contacts-icon"/>
                    <h2>delivery@fooddelivery.com</h2>
                </article>
                <article className="contacts-address">
                    <GoLocation className="contacts-icon"/>
                    <h2>гр.Смолян,бул."България" 5</h2>
                </article>
            </article>
        </section>
    )
}
export default Contacts
