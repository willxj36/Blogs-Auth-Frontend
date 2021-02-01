import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import apiService from '../../utils/apiService';
import $ from 'jquery';
import { Blog } from '../../utils/models';

const EditBlog: React.FC<RouteComponentProps> = ({ history }) => {

    const { id } = useParams<{id: string}>();
    const [blog, setBlog] = useState<Blog>({
        id: null,
        title: null,
        content: null,
        author: null,
        _created: null,
        _updated: null,
        tag: null
    });
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([]);
    const url = `http://localhost:3000/api/blogs/${id}`;
    const urlTags = 'http://localhost:3000/api/tags';
    const urlCurrentTag = `http://localhost:3000/api/blogtags/${id}`;

    useEffect(() => {
        (async () => {
            let blog = await apiService(url); //get and set specific blog
            setBlog(blog[0]);

            let currentTag = await apiService(urlCurrentTag); //get blog's current tag to make it default for the select dropdown
            setCurrentTag(currentTag[0][0]);
            
            let tags = await apiService(urlTags); //get all tags and set the JSX to display them
            let tagJsx = tags.map(tag => {
                if(tag.name !== currentTag[0][0].name) { //make a new select box for all tags not current
                    return (
                        <option key={tag.id} value={tag.name}>{tag.name}</option>
                    )
                }
            });
            setTags(tagJsx);
        })();
    }, [id]);

    const handleEdit = async () => {
        let newTitle = $('#title-edit').val();
        let newContent = $('#content-edit').val();
        let newTag = $('#tags-edit').val();
        await apiService(url, 'PUT', {
            "title": newTitle,
            "content": newContent,
            "tags": newTag});
        history.goBack();
    }

    const handleDelete = async () => {
        await apiService(url, 'DELETE');
        history.push('/');
    }

    const cancelEdit = () => history.goBack();

    return (
        <div className="col container shadow border">
            <h5 className="form-label mt-4">Title</h5>
            <input type="text" name="title" id="title-edit" defaultValue={blog.title} className="form-control"/>
            <h5 className="form-label mt-4">Content</h5>
            <input type="text" name="content" id="content-edit" defaultValue={blog.content} className="form-control"/>
            <h5 className="form-label mt-4">Tags</h5>
            <select name="tags" id="tags-edit" className="mb-3">
                <option value={currentTag.name}>{currentTag.name}</option>
                {tags}
            </select>
            <div className="row">
                <button onClick={handleEdit} className="btn btn-secondary m-3">Submit Edit</button>
                <button onClick={handleDelete} className="btn btn-danger my-3">Delete Blog</button>
                <button onClick={cancelEdit} className="btn btn-warning ml-auto my-3 mr-3">Go back to blog</button>
            </div>
        </div>
    )
}

export default EditBlog;