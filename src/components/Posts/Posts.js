import './Posts.css';
import {useEffect, useState, useContext} from 'react';
import postService from "../../services/postService";
import PostItem from "./PostItem/PostItem";
import {BsChatDots} from 'react-icons/bs'
import UserContext from "../../context/UserContext";
import NotificationContext from "../../context/NotificationContext";

export const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [notification,setNotification] = useContext(NotificationContext);
    const [user] = useContext(UserContext);
    useEffect(() => {
        postService.getPosts()
            .then(posts => {
                setAllPosts(posts);
            }).catch(console.error)
    }, []);

    const likeHandler = (post, type) => {
        const likeAction = (up, down) => {
            up.push(user._id);
            const index = down.findIndex(d => d === user._id);
            if (down.includes(user?._id)) {
                down.splice(index, 1);
            }
        };

        if (type === 'like') {
            likeAction(post.likes, post.dislikes)
        } else {
            likeAction(post.dislikes, post.likes)
        }
        postService.editPost(post)
            .then(res => {
                setAllPosts(res);
            })
            .catch(console.error);
    };

    const addNewPostHandler = (e) => {
        e.preventDefault();
        const newPost = {
            title: e.target.title.value,
            description: e.target.description.value,
            author: user._id
        };
        postService.createPost(newPost)
            .then(res => {
                const notification = {
                    message: res.message,
                    type: 'error'
                };
                if (res.message) {
                    setNotification(notification);
                } else {
                    notification.message = 'Вашето мнение беше добавено!';
                    notification.type = 'success';
                    setNotification(notification);
                    setAllPosts(res);
                    e.target.title.value = '';
                    e.target.description.value = '';
                }
            })
            .catch(console.error)
    };


    return (
        <section className="posts">
            <article className="post-list">
                {
                    allPosts?.length === 0
                        ? <p>Няма предишни мнения...</p>
                        : <>
                        <BsChatDots className="post-list-logo"/>
                            {
                                allPosts?.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
                                    .map(post => (
                                        <PostItem key={post?.description + post?.title + post?.author.username}
                                                  item={post}
                                                  likeHandler={likeHandler}
                                                  setAllPosts={setAllPosts}
                                        />
                                    ))
                            }
                            {
                                !user
                                    ?
                                    <p className="post-list-title-info">* Само регистрирани потребители могат да оценяват мнения.</p>
                                    : null
                            }
                        </>

                }
            </article>
            {
                user
                    ? <article className="post-create">
                        <h4>Сподели мнение</h4>
                        <form onSubmit={addNewPostHandler} className="new-post-form">
                            <input type="text" required placeholder='Заглавие' name='title'/>
                            <textarea
                                name="description"
                                required
                                placeholder="Вашето мнение..."
                                cols="30"
                                rows="10">
                            </textarea>
                            <button className='post-create-btn'>Публикувай</button>
                        </form>
                    </article>
                    : null
            }

        </section>
    )
};

export default Posts;
