import * as React from 'react';
import { useEffect, useState } from 'react';
import apiService from '../../utils/apiService';
import $ from 'jquery';

const AdminPage = () => {

    const [users, setUsers] = useState([]);

    const url = 'http://localhost:3000/api/authors'

    useEffect(() => {
        (async () => {
            let users = await apiService(url);
            setUsers(users);
        })()
    }, []);

    const roleChange = async (userid: number) => {
        let role = $(`#role${userid}`).val();
        let res = await apiService(`${url}/${userid}`, 'PUT', {
            role
        });
        alert(res.message);
    }

    return(
        <div className="col container">
            {users.map(user => { //wouldn't let me include the button in the rest of the ternary curly braces
                return (
                    <div key={user.id} className="card border shadow p-3">
                        <h5>User ID: {user.id}</h5>
                        <h5>Author Name: {user.name}</h5>
                        <h5>Author Email: {user.email}</h5>
                        <div className="row my-2">
                            {user.name === 'Will' ? <h5 className="ml-3">Page Owner i.e. Supreme Leader of this page</h5> : <select className="mx-3" name="role" id={`role${user.id}`}>
                                <option value={user.role}>{user.role}</option>
                                <option value="admin">admin</option>
                                <option value="author">author</option>
                                <option value="guest">guest</option>
                            </select>}
                            {user.name === 'Will' ? null : <button onClick={(e) => roleChange(user.id)} className="btn btn-primary mx-3">Submit Role Change</button> }                        </div>
                        <p className="text-muted">Registered: {user._created}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default AdminPage;