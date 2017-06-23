import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// the field component knows how to interact with redux but not what JSX to
// render which is what the component prop is for
import {Field, reduxForm} from 'redux-form';

import {createPost} from '../../actions'; 

// {...field.input} attaches event
// handlers to input such as onChange/onBlur/etc. any prop can be added to the
// field component and the value will be accessible as field.propName in the
// render function

class PostsNew extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type='text' className='form-control' {...field.input}/>
                <div>
                    {touched
                        ? <p className='text-danger'>{error}</p>
                        : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div style={{
                padding: 10
            }}>
                <h3>New Post</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name='title' label='Title' component={this.renderField}/>
                    <Field name='categories' label='Categories' component={this.renderField}/>
                    <Field name='content' label='Post Content' component={this.renderField}/>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                      <Link to='/' className='btn btn-danger margin-left-sm'>
                        Cancel
                    </Link>
                </form>
            </div>
        );
    }
};

// values of form inputs get passed in to this function which redux-form will
// use to validate each field and will give you the ability to reflect error
// messages
function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title!';
    }

    if (!values.categories) {
        errors.categories = 'Enter at least one category!';
    }

    if (!values.content) {
        errors.content = 'Enter content!';
    }

    return errors;
}

// by providing a unique form to redux form this allows redux form to handle
// multiple forms at once most likely you'll need one component per form to be
// able to only call reduxForm once per component
export default reduxForm({
    validate, 
    form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));