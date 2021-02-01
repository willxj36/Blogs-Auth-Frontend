import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import apiService, { SetAccessToken } from '../../utils/apiService';

const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (emailText: string) => setEmail(emailText);

    const handlePassword = (passText: string) => setPassword(passText);

    const url = 'http://localhost:3000/auth/login';

    const handleSubmit = async () => {
        try {
            let result: any = await apiService(url, 'POST', {
                email,
                password
            });
            if(result) {
                SetAccessToken(result.token, {userid: result.userid, role: result.role})
            } else {
    
            }
        } catch(e) {
            throw (e);
        }
        history.goBack();
    }

    return(
        <div className="col container shadow border">
            <h5 className="form-label mt-4">Email</h5>
            <input onChange={(e) => handleEmail(e.currentTarget.value)} type="text" name="email" id="email" className="form-control"/>
            <h5 className="form-label mt-4">Password</h5>
            <input type="text" onChange={(e) => handlePassword(e.currentTarget.value)} name="password" id="password" className="form-control"/>
            <div className="row">
                <button onClick={handleSubmit} className="btn btn-secondary m-3">Login</button>
                <button onClick={() => history.goBack()} className="btn btn-warning ml-auto my-3 mr-3">Go back</button>
            </div>
        </div>
    )
}

export default Login;