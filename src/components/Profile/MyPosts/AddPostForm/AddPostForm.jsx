import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControls/FormsControls';

const maxLength100 = maxLengthCreator(100)

const AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='newPostText' component={Textarea} validate={[required, maxLength100]}
                   placeholder='Post message'/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

export default reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

