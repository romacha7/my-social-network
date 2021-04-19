import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddNewPostForm from './AddPostForm/AddPostForm';

const MyPosts = React.memo(({addPostActionCreator, posts}) => {
    const postsElements =
        [...posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const onAddPost = (values) => {
        addPostActionCreator(values.newPostText);
    }
    return (
        <div className={s.postsBlock}>
            <h2 className={s.headerPosts}>My posts</h2>
            <AddNewPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;