import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import apiService from '../../utils/apiService';
import $ from 'jquery';
import dayjs from 'dayjs';
import { Blog } from '../../utils/models';

const AuthorPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState<Array<Blog>>([]);
    
    const author: string                                         //will have to add logic here to get the name of currently logged in author
    const blogUrl = 'http://localhost:3000/api/blogs';
    const authorUrl = 'http://localhost:3000/api/authors';               //might not need this, saving just in case
    const tagUrl = 'http://localhost:3000/api/tags';

    useEffect(() => { 
        (async () => {
            let tags = await apiService(tagUrl); //gets and sets tag options
            setTags(tags);
            let allBlogs = await apiService(blogUrl);
            let blogs: Blog[] = allBlogs.filter(blog => {
                blog.authorid = /* current author id */                         //have to add logic to make sure this is working out
            })
            setBlogs(blogs);
        })();
    }, []);

    const handleTitle = (titleText: string) => setTitle(titleText);

    const handleContent = (contentText: string) => setContent(contentText);

    const handleSubmit = async () => { //submits new blog
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
        <>
            <div className="col container shadow border">
                <h5 className="form-label mt-4">Logged in as: {author}</h5>
                <h5 className="form-label mt-4">Title</h5>
                <input onChange={(e) => handleTitle(e.currentTarget.value)} type="text" name="title" id="title" className="form-control"/>
                <h5 className="form-label mt-4">Content</h5>
                <textarea onChange={(e) => handleContent(e.currentTarget.value)} rows={6} name="content" id="content" className="form-control"/>
                <h5 className="form-label mt-4">Tags</h5>
                <select name="tags" id="tags" className="mb-3">
                    <option value="" id="defaultTag">-- Please select a tag --</option>
                    {tags.map(tag => {
                        return (
                            <option key={tag.id} value={tag.name}>{tag.name}</option>
                        );
                    })}
                </select>
                <div className="row">
                    <button onClick={handleSubmit} className="btn btn-secondary m-3">Submit New Blog</button>
                    <button onClick={() => history.goBack()} className="btn btn-warning ml-auto my-3 mr-3">Go back</button>
                </div>
            </div>
            <div className="col container">
                <h3 className="my-3">Click on a blog below to edit or delete</h3>
                    {blogs.map(blog => {
                        let created = dayjs(`${blog._created}`).format('MMM DD, YYYY');
                        return(
                            <Link to={`/blogs/${blog.id}/edit`}>
                                <div className="card">
                                    <h4 className="card-title">{blog.title}</h4>
                                    <h5 className="card-subtitle">{created}</h5>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </>
    )

}

export default AuthorPage;