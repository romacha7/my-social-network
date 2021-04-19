import React from 'react';
import {addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {compose} from 'redux';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
export default compose(
    connect(mapStateToProps, {addPostActionCreator} ))(MyPosts);