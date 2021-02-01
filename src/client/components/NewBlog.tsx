import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import apiService from '../../utils/apiService';
import $ from 'jquery';

const NewBlog: React.FC<RouteComponentProps> = ({ history }) => {

    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const blogUrl = 'http://localhost:3000/api/blogs';
    const authorUrl = 'http://localhost:3000/api/authors';
    const tagUrl = 'http://localhost:3000/api/tags';

    useEffect(() => { 
        (async () => {
            let authors = await apiService(authorUrl); //gets and sets author options
            let authorDisplay = authors.map(author => {
                return (
                    <option key={author.id} value={author.name}>{author.name}</option>
                )
            })
            setAuthors(authorDisplay);

            let tags = await apiService(tagUrl); //gets and sets tag options
            let tagDisplay = tags.map(tag => {
                return (
                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                )
            });
            setTags(tagDisplay);
        })();
    }, []);

    const handleSubmit = async () => { //submits new blog
        let title = $('#title').val();
        let content = $('#content').val();
        let author = $('#author').val();
        let tags = $('#tags').val();
        let res = await apiService(blogUrl, 'POST', {
            title,
            content,
            author,
            tags
        });
        history.push(`/blogs/${res.insertId}`); //takes you to the newly created blog
    }

    return (
        <div className="col container shadow border">
            <h5 className="form-label mt-4">Which Author?</h5>
            <select name="author" id="author" className="mb-3">
                <option value="" id="default">-- Please select the current author --</option>
                {authors}
            </select>
            <h5 className="form-label mt-4">Title</h5>
            <input type="text" name="title" id="title" className="form-control"/>
            <h5 className="form-label mt-4">Content</h5>
            <input type="text" name="content" id="content" className="form-control"/>
            <h5 className="form-label mt-4">Tags</h5>
            <select name="tags" id="tags" className="mb-3">
                <option value="" id="defaultTag">-- Please select a tag --</option>
                {tags}
            </select>
            <div className="row">
                <button onClick={handleSubmit} className="btn btn-secondary m-3">Submit New Blog</button>
                <button onClick={() => history.goBack()} className="btn btn-warning ml-auto my-3 mr-3">Go back</button>
            </div>
        </div>
    )

}

export default NewBlog;