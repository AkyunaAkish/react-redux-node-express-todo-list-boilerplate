import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

// use asynComponent for components that will be rendered
// as a Route component's component={} attribute
// in order for webpack to use code splitting and create better browser load times
const TodosNew = asyncComponent({
    resolve: () => import('./components/TodosNew/TodosNew.js')
});

const TodoShow = asyncComponent({
    resolve: () => import('./components/TodoShow/TodoShow.js')
});

const Todos = asyncComponent({
    resolve: () => import('./components/Todos/Todos.js')
});

class Router extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/todos/new' component={ TodosNew } />
                        <Route path='/todos/:id' component={ TodoShow } />
                        <Route exact path='/' component={ Todos } />
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;