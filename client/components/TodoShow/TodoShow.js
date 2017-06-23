import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchTodo, deleteTodo} from '../../actions';

class TodoShow extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props
            .fetchTodo(this.props.match.params.id);
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

    render() {
        const {todo} = this.props;

        if (!todo) {
            return (
                <div className='container text-center'>
                    <h3>Loading...</h3>
                </div>
            );
        }

        return (
            <div style={{padding: 10}}>
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
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {todo: state.todos.todo};
};

export default connect(mapStateToProps, {fetchTodo, deleteTodo})(TodoShow);