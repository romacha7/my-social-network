import React from 'react';
import s from './Post.module.css';

const Post = ({message, likesCount}) => {
    return (
        <div className={s.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2Bvz263wBzKVhuW8h8fYBk7guQbO2rVXqA&usqp=CAU'/>
            <span className={s.messages}>
            {message}
            </span>
            <div className={s.likes}>
                <span>like</span> {likesCount}
            </div>
        </div>
    )
}
export default Post;