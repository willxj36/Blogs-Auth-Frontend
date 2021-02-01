import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return(
        <div className="d-flex navbar bg-success">
            <h3>Bloggy Blogger Blogs</h3>
            <Link to='/' className="btn btn-lg btn-dark-outline ml-auto">Home</Link>
            {(/* not logged in */) ?
                <Link to='/login' className="btn btn-lg btn-dark-outline">Login</Link>
                : <Link to='/authorpage' className="btn btn-lg btn-dark-outline">Add/Edit Blogs</Link>
            }
        </div>
    )

}

export default Navbar;