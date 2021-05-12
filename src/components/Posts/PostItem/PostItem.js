import './PostItem.css';
import {BiDislike, BiLike} from 'react-icons/bi';
import {useEffect, useState, useContext} from 'react';
import {FiCheck, FiEdit2, FiTrash} from 'react-icons/fi'
import {IoMdClose} from 'react-icons/io';
import postService from "../../../services/postService";
import UserContext from "../../../context/UserContext";

const PostItem = ({item, likeHandler, setAllPosts}) => {
    const [user] = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const likeClickHandler = (type) => {
        if (user && item.author._id !== user._id) {
            if (type === 'like') {
                if (!item.likes.includes(user._id)) {
                    likeHandler(item, type);
                }
            }
            if (type === 'dislike') {
                if (!item.dislikes.includes(user._id)) {
                    likeHandler(item, type);
                }
            }
        }

    };

    useEffect(() => {
        if (item?.likes?.includes(user?._id)) {
            setLiked(true);
        }
        if (item?.dislikes?.includes(user?._id)) {
            setDisliked(true);
        }
    }, [user]);

    useEffect(() => {
        if (item?.likes?.includes(user?._id)) {
            setLiked(true);
            setDisliked(false);
        }
        if (item?.dislikes?.includes(user?._id)) {
            setDisliked(true);
            setLiked(false);
        }
    }, [item.likes, item.dislikes]);

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
    };

    const editPostSubmitHandler = (e) => {
        item.title = e.target.title.value;
        item.description = e.target.description.value;
       postService.editPost(item)
           .then(posts => setAllPosts(posts))
           .catch(console.error)
    };
    const deletePostHandler = () => {
        postService.deletePost(item)
            .then(posts => setAllPosts(posts))
            .then(()=> {
                const notification = {
                    message: 'Вашия коментар беше изтрит.',
                    type: 'success'
                }
            })
            .catch(console.error);
    }
    return (
        <article className="post-item">
            <article className="post-item-content">
                {
                    editMode
                        ? <>
                            <form className="edit-post-form" onSubmit={editPostSubmitHandler}>
                                <label htmlFor="post-form-input-title">Заглавие:</label>
                                <input type="text" defaultValue={item.title} id="post-form-input-title" name="title"/>
                                <label htmlFor="post-form-input-description">Вашето мнение:</label>
                                <textarea defaultValue={item.description} id="post-form-input-description" name="description"/>
                                <article className="post-item-edit-controls form">
                                    <button><FiCheck className='post-item-edit-confirm'/></button>
                                    <IoMdClose onClick={toggleEditMode}/>
                                </article>
                            </form>
                        </>
                        : <>
                            <h4 className="post-item-content-title">
                                {item.title}
                            </h4>
                            <p className="post-item-content-description">
                                {item.description}
                            </p>
                        </>
                }

                <article className="post-item-details">
                    <p>{item.author.username}</p>
                    {
                        item?.author?._id === user?._id
                            ? <article className="post-item-edit-controls">
                                {
                                    editMode
                                        // TO DO : move both svg into the form to take events
                                        ? null
                                        : <>
                                            <FiEdit2 onClick={toggleEditMode}/>
                                            <FiTrash onClick={deletePostHandler}/>
                                        </>
                                }
                            </article>
                            : null
                    }

                    <p>{item.created_at.split('T')[0]}</p>
                </article>
            </article>
            <article className="post-item-likes">
                <article className="like-wrapper">
                    <p className="like-counter like">{item.likes.length}</p>
                    <BiLike className={liked ? "like isLiked" : "like"}
                            onClick={likeClickHandler.bind(null, 'like')}
                    />
                </article>
                <article className="like-wrapper">
                    <p className="like-counter dislike">{item.dislikes.length}</p>
                    <BiDislike className={disliked ? "dislike isDisliked" : "dislike"}
                               onClick={likeClickHandler.bind(null, 'dislike')}
                    />
                </article>
            </article>
        </article>
    )
};

export default PostItem;
