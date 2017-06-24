import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchTodos} from '../../actions';
import _ from 'lodash';

class Todos extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props
            .fetchTodos();
    }

    renderTodos() {
        return _.map(this.props.todos, (todo, ind) => {
            if (todo.content) {
                return (
                    <Link to={`/todos/${todo.id}`} key={ind}>
                        <li className='list-group-item'>
                            {todo.content}
                        </li>
                    </Link>
                );
            }
        });
    }

    render() {
        if (!this.props.todos || !_.size(this.props.todos)) {
            return (
                <div className='todos'>
                    <div className='text-right'>
                        <Link to='/todos/new' className='btn btn-primary'>
                            Create Todo
                        </Link>
                    </div>
                    <div className='text-center text-primary'>
                        <h3>No Todos</h3>
                    </div>
                </div>
            );
        }

        return (
            <div className='todos'>
                <div className='text-right'>
                    <Link to='/todos/new' className='btn btn-primary'>
                        Create Todo
                    </Link>
                </div>
                <h3>Todos</h3>
                <ul className='list-group'>{this.renderTodos()}</ul>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {todos: state.todos.todos};
};

export default connect(mapStateToProps, {fetchTodos})(Todos);