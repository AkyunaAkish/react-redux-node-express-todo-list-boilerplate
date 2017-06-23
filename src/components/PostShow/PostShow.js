import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../../actions';

class PostShow extends PureComponent {
    constructor(props) {
        super(props);
    }

  componentDidMount() {
        this
            .props
            .fetchPost(this.props.match.params.id);
    }

    deletePost() {
            this
                .props
                .deletePost(this.props.match.params.id, () => {
                    this.props.history.push('/');
                });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return (
                <div className='spinner'>
                    <div className='double-bounce1'></div>
                    <div className='double-bounce2'></div>
                </div>
            );
        }

        return (
            <div style={{padding: 10}}>
                 <div className='text-right'>
                    <Link to='/' className='btn btn-primary'>
                        Back To Posts
                    </Link>
                    <button className='btn btn-danger pull-left' onClick={this.deletePost.bind(this)}>
                      Delete Post
                    </button>
                </div>

                <h4>Title:</h4>
                <p>{this.props.post.title}</p>
                <h4>Categories:</h4>
                <p>{this.props.post.categories}</p>
                <h4>Content:</h4>
                <p>{this.props.post.content}</p>
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    // ownProps gives access to props given to the component
    // such as ownProps.match.params.id
    return {post: state.posts.post};
};

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);