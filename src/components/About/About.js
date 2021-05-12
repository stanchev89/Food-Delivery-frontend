import './About.css';
import {IoMdRestaurant} from 'react-icons/io';

export default function () {
    return(
        <section className="about">
            <IoMdRestaurant className="about-logo"/>
            <article className="about-content">
                <q className="about-content-text">За нас качеството на храната е основен приоритет. Нашата политика е да предлагаме на клиентите си това, което самите ние слагаме на нашата маса. Вече с натрупан богат опит в готвенето и кулинарията, създадохме нашия онлайн магазин. Ние вярваме, че забързаното ежедневие не трябва да бъде причина за компромис с избора на храна. Всеки работен ден Ви предлагаме разнообразно обедно меню и очакваме Вашия избор!</q>
                <article className="about-footer">
                    <p className="about-footer-content">"Фууд Деливъри" ЕООД
                        ЕИК:1234412342
                        със седалище:
                        гр.Смолян,бул."България" 5
                        МОЛ.:Стефан Станчев</p>

                    <img src="logo.png" alt="company logo"/>
                </article>
            </article>

        </section>
    )
}
