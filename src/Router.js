import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Posts from './components/Posts/Posts';
import PostsNew from './components/PostsNew/PostsNew';
import PostShow from './components/PostShow/PostShow';

class Router extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    // putting routes in a switch makes the router only render the first route that
    // matched which is why the / route should be a catch at the bottom another way
    // would be to use the exact attribute for routes and not have the routes in a
    // switch

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/posts/new' component={PostsNew}/>
                        <Route path='/posts/:id' component={PostShow}/>
                        <Route path='/' component={Posts}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

export default Router;

// NESTED ROUTES: 
// To use nested routes, simply add a route component within the
// JSX of one of your components make the beginning of the path the same as the
// route related to the parent component and then give the route a unique route
// path ending. 
// The component will then be rendered within the parent component
// JSX where the route component is when that sub route is matched parent route
// is <Route path='/posts/new' component={PostsNew}/> then within the PostsNew
// component the following route is nested in the render JSX: 
// <Route exact path='/posts/new/duh' component={Hello}/>