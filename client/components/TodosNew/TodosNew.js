import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createTodo } from '../../actions';

import Paper from 'material-ui/Paper';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import SaveIcon from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class TodosNew extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderField(field) {
        const { meta: { touched, error } } = field;

        const fieldStyle = {
            errorStyle: {
                color: 'rgb(217, 83, 79)',
            },
            underlineStyle: {
                borderColor: 'rgb(119, 136, 153)',
            },
            floatingLabelStyle: {
                color: 'rgb(119, 136, 153)',
            },
            floatingLabelFocusStyle: {
                color: 'rgb(119, 136, 153)',
            }
        };

        return (
            <div style={{ paddingLeft: 12 }}>
                <TextField style={{ width: '100%' }}
                           hintText={ field.label }
                           floatingLabelText={ field.label }
                           errorText={ touched ? error : null }
                           errorStyle={ fieldStyle.errorStyle }
                           { ...field.input } />
            </div>
        );
    }

    onSubmit(values) {
        this.props.createTodo(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        
        const paperStyle = {
            height: '70%',
            width: '98%',
            padding: 20,
            maxHeight: '80vh',
            margin: 20,
            display: 'inline-block',
        };

        return (
            <div className='todos-new-container container'>
                <Paper style={ paperStyle } zDepth={ 5 }>
                    <Link to='/'>
                        <RaisedButton icon={ <ExitIcon /> }
                                      label='Back'
                                      backgroundColor='rgb(50, 122, 183)'
                                      labelColor='rgb(255, 255, 255)'
                                      style={{ margin: 12 }} />
                    </Link>

                    <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                        <Field name='content' label='New Todo' component={ this.renderField } />

                        <RaisedButton icon={ <SaveIcon /> }
                                      type='submit'
                                      label='Save'
                                      backgroundColor='rgb(164, 198, 57)'
                                      labelColor='rgb(255, 255, 255)'
                                      style={{ margin: 12 }} />
                    </form>
                </Paper> 
            </div>
        );
    }
};

function validate(values) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Please enter a todo';
    }

    return errors;
}

export default reduxForm({
    validate, 
    form: 'TodosNewForm'
})(connect(null, { createTodo })(TodosNew));