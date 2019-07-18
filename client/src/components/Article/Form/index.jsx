import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            author: '',
        }

        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'align': [] }],
            ['link', 'image'],                                        // image and link
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }]
        ];
        var quill = new Quill('#editor', {
            debug: 'info',
            placeholder: 'Compose an epic...',
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.articleToEdit) {
            this.setState({
                title: nextProps.articleToEdit.title,
                body: nextProps.articleToEdit.body,
                author: nextProps.articleToEdit.author,
            });
        }
    }
    handleSubmit(){
        const { onSubmit, articleToEdit, onEdit } = this.props;
        const { title, body, author } = this.state;

        if(!articleToEdit) {
            return axios.post('http://localhost:8000/api/articles', {
                title,
                body,
                author,
            })
                .then((res) => onSubmit(res.data))
                .then(() => this.setState({ title: '', body: '', author: '' }));
        } else {
            return axios.patch(`http://localhost:8000/api/articles/${articleToEdit._id}`, {
                title,
                body,
                author,
            })
                .then((res) => onEdit(res.data))
                .then(() => this.setState({ title: '', body: '', author: '' }));
        }
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    render() {
        const { articleToEdit } = this.props;
        const { title, body, author } = this.state;
    
        return (
            <div className="wrapper">

                <input
                onChange={(ev) => this.handleChangeField('title', ev)}
                value={title}
                className="form-control my-3 title_article"
                placeholder="Title"
                />

                <div id="editor"></div>

                {/* <textarea
                onChange={(ev) => this.handleChangeField('body', ev)}
                className="form-control my-3 body_article editableContent"
                placeholder="Article Body"
                value={body}>
                </textarea> */}

                <input
                onChange={(ev) => this.handleChangeField('author', ev)}
                value={author}
                className="form-control my-3 author_article"
                placeholder="Author"
                />

                <button onClick={this.handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
	setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});
  
const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit,
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Form);