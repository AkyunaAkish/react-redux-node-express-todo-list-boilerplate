import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { fetchTodo, editTodo, deleteTodo } from '../../actions';

import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/content/delete-sweep';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import SaveIcon from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import _ from 'lodash';

class TodoShow extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (Number(this.props.match.params.id)) {
            this.props.fetchTodo(this.props.match.params.id, (res) => {
                    if (!_.size(res.data)) {
                        this.props.history.push('/');
                    }
            });
        } else {
            this.props.history.push('/');
        }
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
                           underlineStyle={fieldStyle.underlineStyle}
                           errorText={ touched ? error : null }
                           errorStyle={ fieldStyle.errorStyle }
                           { ...field.input } />
            </div>
        );
    }

    deleteTodo() {
        this.props.deleteTodo(this.props.match.params.id, () => {
                this.props.history.push('/');
        });
    }

    onSubmit(values) {
        this.props.editTodo(this.props.match.params.id, values, () => {
                this.props.history.push('/');
        });
    }

    render() {
        const { todo, handleSubmit } = this.props;
        
        const paperStyle = {
            height: '70%',
            width: '98%',
            padding: 20,
            maxHeight: '80vh',
            margin: 20,
            display: 'inline-block',
        };

        if (!todo) {
            return (
                <div className='container text-center'>
                    <h3>Loading...</h3>
                </div>
            );
        }

        return (
            <div className='todo-show-container'>
                <div className='container'>
                    <Paper style={ paperStyle } zDepth={ 5 }>
                        <Link to='/'>
                            <RaisedButton icon={ <ExitIcon /> }
                                          label='Back'
                                          backgroundColor='rgb(50, 122, 183)'
                                          labelColor='rgb(255, 255, 255)'
                                          style={{ margin: 12 }} />
                        </Link>

                        <RaisedButton onClick={ this.deleteTodo.bind(this) } 
                                      icon={ <DeleteIcon /> } 
                                      label='Delete' 
                                      backgroundColor='rgb(217, 83, 79)' 
                                      labelColor='rgb(255, 255, 255)' 
                                      style={{ margin: 12 }} />

                        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                            <Field name='content' label='Edit Todo' component={ this.renderField } />
                            <RaisedButton icon={ <SaveIcon /> }
                                          type='submit'
                                          label='Save'
                                          backgroundColor='rgb(164, 198, 57)'
                                          labelColor='rgb(255, 255, 255)'
                                          style={{ margin: 12 }} />
                        </form>
                    </Paper>    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        todo: state.todos.todo,
        initialValues: {
            content: state.todos.todo.content
        }
    };
}

function validate(values, ownProps) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Please enter a todo to save changes';
    }

    if (values.content && values.content === ownProps.todo.content) {
        errors.content = 'Please enter a new todo if you wish to make changes';
    }

    return errors;
}

const InitializeFromStateForm = reduxForm({ validate, form: 'TodosEditForm', enableReinitialize: true })(TodoShow);

export default connect(mapStateToProps, { fetchTodo, editTodo, deleteTodo })(InitializeFromStateForm);