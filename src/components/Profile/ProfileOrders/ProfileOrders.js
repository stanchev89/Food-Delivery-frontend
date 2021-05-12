import './ProfileOrders.css';
import {IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundDown, IoIosArrowRoundUp, IoMdSearch} from 'react-icons/io';
import {useContext, useEffect, useState} from 'react'
import ShowOrderCart from './ShowOrderCart/ShowOrderCart';
import UserContext from "../../../context/UserContext";
import userService from "../../../services/userService";

function ProfileOrders() {
    const [user] = useContext(UserContext);

    const [showCart, setShowCart] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(undefined);
    const [userOrders, setUserOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [showPerPage, setShowPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('created_at');
    const [sortType, setSortType] = useState(-1);


    useEffect(() => {
        const data = {
            userId: user._id,
            sort: {[sortBy]: sortType},
            skip: 0,
            limit: showPerPage
        };
        userService.getUserOrders(data)
            .then(res => {
                const [{orders, totalCount}] = res;
                const [{count}] = totalCount;
                setTotalPages(() => {
                    const pages = Math.ceil(Number(count) / showPerPage);
                    const totalPagesArr = [];
                    for (let i = 1; i <= pages; i++) {
                        totalPagesArr.push(i);
                    }
                    return totalPagesArr;
                });
                setUserOrders(() => orders);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const data = {
            userId: user._id,
            sort: {[sortBy]: sortType},
            skip: (currentPage - 1) * showPerPage,
            limit: showPerPage
        };
        userService.getUserOrders(data)
            .then(res => {
                const [{orders, totalCount}] = res;
                const [{count}] = totalCount;
                setTotalPages(() => {
                    const pages = Math.ceil(Number(count) / showPerPage);
                    const totalPagesArr = [];
                    for (let i = 1; i <= pages; i++) {
                        totalPagesArr.push(i);
                    }
                    return totalPagesArr;
                });
                setUserOrders(() => orders);
            })
            .catch(console.error);

    }, [currentPage, showPerPage,sortType,sortBy]);

    function sortHandler(selectedSortBy) {
        if (selectedSortBy === sortBy) {
            setSortType(prev => prev * -1);
        } else {
            setSortBy(prev => selectedSortBy);
            setSortType(() => -1);
        }
    }

    function parseDateTime(date) {
        // const b = s.split(/\D/);
        // return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5])
        const fullDate = new Date(Date.parse(date)).toString();
        return (fullDate.split('GMT')[0]);
        // return date.split('T').join(' ').split('.')[0];
    }

    const onChangePageHandler = (e) => {
        if (e === 'next' || e === 'back') {
            e === 'next'
                ? setCurrentPage(prev => prev + 1 <= totalPages.length ? prev + 1 : prev)
                : setCurrentPage(prev => prev - 1 >= 1 ? prev - 1 : prev);
            return;
        }
        e.preventDefault();
        const text = e.target.textContent;
        const toPage = Number(text);
        if (!text) {
            console.log(e.target.className?.baseVal)

        }
        ;
        setCurrentPage(() => Number(toPage));
    };

    const onChangeViewPerPageHandler = (e) => {
        const selected = Number(e.target.value);
        setShowPerPage(prev => {
            if (selected == prev) {
                return;
            }
            return selected;
        });
        setCurrentPage(() => 1);

    };

    const toggleShowCart = (data) => {
        if (!data) {
            setShowCart(prev => !prev);
            setCurrentOrder(prev => undefined);
            return;
        } else if (data === 'close') {
            setShowCart(() => false);
            return;
        }
        setShowCart(prev => !prev);
        setCurrentOrder(prev => data);
    };

    return (
        <article className="profile-orders">
            {
                userOrders?.length === 0
                    ? <p>Все още нямате направени поръчки...</p>
                    : <>
                        {

                            <nav className="table-pages">
                                <ul>
                                    <li onClick={onChangePageHandler.bind(null, 'back')}>
                                        <IoIosArrowBack
                                            className="back"
                                        />
                                    </li>
                                    {
                                        totalPages.map(page => (
                                            <li key={page}
                                                className={currentPage == page ? 'is-active' : ''}
                                                name={page}
                                                onClick={onChangePageHandler}
                                            >
                                                {page}
                                            </li>
                                        ))
                                    }
                                    <li onClick={onChangePageHandler.bind(null, 'next')}>
                                        <IoIosArrowForward
                                            className="next"
                                        />
                                    </li>
                                </ul>

                                <article className="show-per-page-wrapper">
                                    <label className="show-per-page-title">Покажи</label>
                                    <select name="show-per-page" id="show-per-page" onChange={onChangeViewPerPageHandler}>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </article>

                            </nav>
                        }
                        <table className="order-table">
                            <thead>
                            <tr>
                                <th className="th-sorted" onClick={() => sortHandler('created_at')}>
                                    <p className="p-sorted">Дата</p>
                                    {
                                        sortBy === 'created_at'
                                            ?
                                            <article className="sort-type">
                                                {
                                                    sortType === -1
                                                        ? <IoIosArrowRoundDown/>
                                                        : <IoIosArrowRoundUp/>
                                                }
                                            </article>

                                        : null
                                    }
                                </th>
                                <th>Адрес</th>
                                <th>Плащане</th>
                                <th className="th-sorted" onClick={() => sortHandler('totalPrice')}>
                                    <p className="p-sorted">Крайна цена</p>

                                    {
                                        sortBy === 'totalPrice'
                                            ?
                                            <article className="sort-type">
                                                {
                                                    sortType === -1
                                                        ? <IoIosArrowRoundDown/>
                                                        : <IoIosArrowRoundUp/>
                                                }
                                            </article>

                                            : null
                                    }
                                </th>
                                <th>Продукти</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userOrders?.map(order => (
                                    <tr key={order._id}>
                                        <td>{parseDateTime(order.created_at)}</td>
                                        <td>{order.address.location}</td>
                                        <td>{order.payment}</td>
                                        <td>{Number(order.totalPrice).toFixed(2)} лв.</td>
                                        <td><IoMdSearch
                                            className="magnifier"
                                            onClick={toggleShowCart.bind(null, order)}
                                            disabled={showCart}
                                        />
                                        </td>
                                    </tr>
                                ))

                            }
                            </tbody>
                        </table>

                    </>
            }
            {
                showCart
                    ?
                    <ShowOrderCart order={currentOrder}
                                   closeHandler={toggleShowCart}
                        // ref={myRef}
                                   id="show-order-cart"
                    />

                    : null
            }
        </article>
    )
};
export default ProfileOrders;
