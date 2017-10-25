import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTodos } from '../../actions';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import ListIcon from 'material-ui/svg-icons/action/list';
import RaisedButton from 'material-ui/RaisedButton';

class Todos extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTodos();
    }

    renderTodos() {
        return _.map(this.props.todos, (todo, ind) => {
            if (todo.content) {
                return (
                    <Link to={ `/todos/${todo.id}` } key={ ind }>
                        <ListItem primaryText={ todo.content } leftIcon={ <ListIcon style={{ fill: 'rgb(255,255,255)' }} /> } />
                    </Link>
                );
            }
        });
    }
    
    renderEmptyListItem() {
        return (
            <ListItem primaryText='No Todos Yet' leftIcon={ <ListIcon style={{ fill: 'rgb(255,255,255)' }} /> } />
        );
    }

    render() {
        const paperStyle = {
            height: '70%',
            width: '98%',
            maxHeight: '80vh',
            margin: 20,
            display: 'inline-block',
        };

        return (
            <div className='todos-container container'>
                <Paper style={ paperStyle } zDepth={ 5 }>
                    <List>
                        <Subheader style={{ display: 'inline-block', color: 'rgb(255,255,255)', fontSize: 25, width: '40%', marginBottom: 10 }}>
                            Todos
                        </Subheader>

                        <Link to='/todos/new' className='pull-right inline-block'>
                            <RaisedButton icon={ <NoteAdd /> } label='Create Todo' backgroundColor='rgb(164, 198, 57)' labelColor='rgb(255, 255, 255)' style={{ margin: 12 }} />
                        </Link>

                        { !this.props.todos || !_.size(this.props.todos) ? this.renderEmptyListItem() : this.renderTodos() }
                    </List>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos.todos
    };
}

export default connect(mapStateToProps, { fetchTodos })(Todos);