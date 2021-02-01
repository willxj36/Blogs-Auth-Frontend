import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import apiService, { User } from '../../utils/apiService';
import $ from 'jquery';
import dayjs from 'dayjs';
import { Blog } from '../../utils/models';

const AuthorPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [tags, setTags] = useState([]);
    const [blogs, setBlogs] = useState<Array<Blog>>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const blogUrl = 'http://localhost:3000/api/blogs';
    const tagUrl = 'http://localhost:3000/api/tags';

    useEffect(() => { 
        (async () => {
            let tags = await apiService(tagUrl); //gets and sets tag options
            setTags(tags);

            let allBlogs: Blog[] = await apiService(blogUrl);
            let blogs: Blog[] = allBlogs.filter(blog => {
                blog.authorid = User.userid
            })
            setBlogs(blogs);
        })();
    }, []);

    const handleTitle = (titleText: string) => setTitle(titleText);

    const handleContent = (contentText: string) => setContent(contentText);

    const handleSubmit = async () => { //submits new blog
        let authorid = User.userid;
        let tags = $('#tags').val();
        let res = await apiService(blogUrl, 'POST', {
            title,
            content,
            authorid,
            tags
        });
        history.push(`/blogs/${res.insertId}`); //takes you to the newly created blog
    }

    return ( //may try to make it so that User also carries actual author name at some point, for now userid will work as a stand-in
        <>
            <div className="col container shadow border">
                <h5 className="form-label mt-4">Logged in as: {User.userid}</h5> 
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