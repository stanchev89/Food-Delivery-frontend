import './Conditions.css'
import {CgNotes} from 'react-icons/cg';
export default function() {
    return(
        <section className="conditions">
            <CgNotes className="conditions-icon"/>
            <h2 className="condition-item-title">Доставка</h2>
            <article className="conditions-item">
                <p>Всеки работен ден Вие можете да поръчате храна за вкъщи или работното място от нашия онлайн магазин.
                Освен чрез онлайн магазинa,
                можете да поръчате с телефонно обаждане на номер <strong>0876 123 123</strong> или чрез e-mail:
                <strong> delivery@fooddelivery.com</strong></p>
            </article>
            <h2 className="condition-item-title">Цена на доставка</h2>
            <article className="conditions-item">
                <p>Цената на доставката е <strong>0.50лв</strong>. Поръчки за кваралите Каптажа, Райково и Устово, които са на стойност под <strong>10лв</strong>., ще се таксуват с цена на доставка - <strong>1.50лв</strong>.</p>
            </article>
            <h2 className="condition-item-title">Работно време</h2>
            <article className="conditions-item">
                <p>Доставките на храна се извършват от понеделник до петък до <strong>13:00</strong> часа.
                    Приемаме поръчки до <strong>12:30ч</strong>аса!
                    Почивни дни - <strong>събота и неделя</strong>, както и <strong>официалните празници</strong>.</p>
            </article>
        </section>
    )
}
