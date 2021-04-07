import './PostItem.css';
import {BiDislike,BiLike} from 'react-icons/bi';
import { useState, useEffect} from 'react';

const PostItem = ({item, likeHandler, user}) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const likeClickHandler =  (type) => {
        if(user && item.author._id !== user._id){
            if(type === 'like') {
                if(!item.likes.includes(user._id)) {
                    likeHandler(item,type);
                }
            }
            if(type === 'dislike') {
                if(!item.dislikes.includes(user._id)) {
                    likeHandler(item,type);
                }
            }
        }

    };

    useEffect(() => {
        if(item?.likes?.includes(user?._id)) {
            setLiked(true);
        }
        if(item?.dislikes?.includes(user?._id)) {
            setDisliked(true);
        }
    },[user]);

    useEffect(() => {
        if(item?.likes?.includes(user?._id)) {
            setLiked(true);
            setDisliked(false);
        }
        if(item?.dislikes?.includes(user?._id)) {
            setDisliked(true);
            setLiked(false);
        }
    },[item.likes, item.dislikes]);

    return (
            <article className="post-item">
                <article className="post-item-content">
                    <h4 className="post-item-content-title">
                        {item.title}
                    </h4>
                    <p className="post-item-content-description">
                        {item.description}
                    </p>
                    <article className="post-item-details">
                        <p>{item.author.username}</p>
                        <p>{item.created_at.split('T')[0]}</p>
                    </article>
                </article>
                <article className="post-item-likes">
                    <article className="like-wrapper">
                        <p className="like-counter like">{item.likes.length}</p>
                        <BiLike className={liked ? "like isLiked" : "like"}
                                onClick={likeClickHandler.bind(null,'like')}
                        />
                    </article>
                    <article className="like-wrapper">
                        <p className="like-counter dislike">{item.dislikes.length}</p>
                        <BiDislike className={disliked ?  "dislike isDisliked" : "dislike"}
                                   onClick={likeClickHandler.bind(null,'dislike')}
                        />
                    </article>
                </article>
            </article>
        )
};

export default PostItem;
