import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {fetchTodo, editTodo, deleteTodo} from '../../actions';

class TodoShow extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props
            .fetchTodo(this.props.match.params.id, (res) => {
                if (!_.size(res.data)) {
                    this
                        .props
                        .history
                        .push('/');
                }
            });
    }

    renderField(field) {
        const {
            meta: {
                touched,
                error
            }
        } = field;

        const className = `form-group ${touched && error
            ? 'has-error'
            : ''}`;

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

    deleteTodo() {
        this
            .props
            .deleteTodo(this.props.match.params.id, () => {
                this
                    .props
                    .history
                    .push('/');
            });
    }

    onSubmit(values) {
        this
            .props
            .editTodo(this.props.match.params.id, values, () => {
                this
                    .props
                    .history
                    .push('/');
            });
    }

    render() {
        const {todo, handleSubmit} = this.props;

        if (!todo) {
            return (
                <div className='container text-center'>
                    <h3>Loading...</h3>
                </div>
            );
        }

        return (
            <div style={{
                padding: 10
            }}>
                <div className='text-right'>
                    <Link to='/' className='btn btn-primary'>
                        Back To Todos
                    </Link>
                    <button
                        className='btn btn-danger pull-left'
                        onClick={this
                        .deleteTodo
                        .bind(this)}>
                        Delete Todo
                    </button>
                </div>

                <div className='container text-center'>
                    <h2>Content:</h2>
                    <h4>{this.props.todo.content}</h4>
                </div>

                <div className='container'>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name='content' label='Edit Todo Content' component={this.renderField}/>
                        <button type='submit' className='btn btn-primary'>
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

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
        errors.content = 'Please enter content to save changes';
    }

    if (values.content && values.content === ownProps.todo.content) {
        errors.content = 'Please enter a different value if you wish to make changes';
    }

    return errors;
}

let InitializeFromStateForm = reduxForm({validate, form: 'TodosEditForm', enableReinitialize: true})(TodoShow);

InitializeFromStateForm = connect(mapStateToProps, {fetchTodo, editTodo, deleteTodo})(InitializeFromStateForm);

export default InitializeFromStateForm;