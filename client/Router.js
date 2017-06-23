import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import TodosNew from './components/TodosNew/TodosNew';
import TodoShow from './components/TodoShow/TodoShow';
import Todos from './components/Todos/Todos';

class Router extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/todos/new' component={TodosNew}/>
                        <Route path='/todos/:id' component={TodoShow}/>
                        <Route exact path='/' component={Todos}/>
                        <Redirect from='*' to='/'/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

export default Router;