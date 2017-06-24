import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {createTodo} from '../../actions'; 

class TodosNew extends PureComponent {
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
        this.props.createTodo(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className='todos-new'>
                <h3>New Todo</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name='content' label='Todo Content' component={this.renderField}/>
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

function validate(values) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Please enter content to submit or press cancel';
    }

    return errors;
}

export default reduxForm({
    validate, 
    form: 'TodosNewForm'
})(connect(null, { createTodo })(TodosNew));