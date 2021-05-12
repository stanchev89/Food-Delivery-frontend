import "./Footer.css";
import {Link} from 'react-router-dom';
import * as routes from '../../routes';

function Footer(props) {
	return (
		<section className="footer">
            <nav className='footer-nav-bar'>

                <ul>
                    <li>
                        <Link to={routes.rootPath}>Меню</Link>
                    </li>

                    <li>
                        <Link to={routes.about}>За нас</Link>
                    </li>
                    <li>
                        <Link to={routes.conditions}>Условия</Link>
                    </li>
                    <li>
                        <Link to={routes.posts}>Мнения</Link>
                    </li>
                    <li>
                        <Link to={routes.contacts}>Контакти</Link>
                    </li>
                </ul>

            </nav>

            <article className="footer-icons">
                <img style={{height: 40}} src="https://shoplineimg.com/assets/footer/card_visa.png" alt="visa logo"/>
                <img style={{height: 40}}  src="https://shoplineimg.com/assets/footer/card_master.png" alt="mastercard logo"/>
                <img style={{height: 40}}  src="https://shoplineimg.com/assets/footer/card_paypal.png" alt="paypal logo"/>
            </article>

            <article className="company-logo">
                <img src="/logo.png" alt=""/>
                <h5>Smolyanobyad &copy; 2021</h5>
            </article>

		</section>
	);
}

export default Footer;
