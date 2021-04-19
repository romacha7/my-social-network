import React from 'react';
import s from './User.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={s.mainUsers}>
            <div className={s.users}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                         className={s.userPhoto}/>
                </NavLink>
            </div>
            <div className={s.buttons}>
                {user.followed ?
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>
                        Unfollow
                    </button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>
                        Follow
                    </button>
                }

            </div>
            </div>

            <div className={s.inform}>


                <div>{user.name}</div>
                <div>{user.status}</div>

                <div>{'u.location.country'}</div>
                <div>{'u.location.city'}</div>

            </div>
        </div>
    )
}

export default User;