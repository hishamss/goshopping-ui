import { useState, FormEvent } from 'react';
import { SIGN_UP, LOG_IN } from '../../store/types';
import Layout from '../layout';
// import axios from 'axios';
import { /* apiRoutes, */ routes } from '../../resources';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions';

interface Props extends RouteComponentProps {
    // Tell the component which version to render with string types (exported from store/types)
    type : typeof SIGN_UP | typeof LOG_IN;
}

interface FormData {
    username : string;
    password : string;
    confirmPassword? : string;
}

const Login = ({ type, history } : Props) => {
    const isLogin = (type === LOG_IN);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<FormData>({ username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState<string>('');

    const onChange = (e : FormEvent<HTMLInputElement>) => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

    const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLogin && (formData.password !== formData.confirmPassword)) return setError('Passwords must match');

        try {
            // For testing purposes
            const { username, password } = formData;
            const userExists = ['user', 'admin'].includes(username);
            if (!isLogin || userExists) {
                if ((isLogin && password === 'pass') || (!isLogin && !userExists)) {
                    dispatch( updateUser({ username, isAdmin: username === 'admin' }) );
                    history.push(routes.HOME);
                    return;
                } else return setError(isLogin ? 'Invalid credentials' : 'Username not available');
            } else return setError('Invalid credentials');

            // Normal procedure
            /*
            const response = await axios.post(isLogin ? apiRoutes.LOG_IN : apiRoutes.SIGN_UP, formData);
            
            dispatch( updateUser(response.data) );
            history.push(routes.HOME);
            */ 
        } catch (e) {
            switch (e.status) {
                case 401:
                    return setError('Ivalid credentials');
                case 422:
                    return setError('Username not available');
                default:
                    setError('Something went wrong');
            }    
        }
    }

    return <div className="Login">
        <h1 className="heading">{isLogin ? 'Log in' : 'Sign up'}</h1>
        <div className="error">{error}</div>
        <div className="prompt">Please submit your credentials below</div>
        <form onSubmit={onSubmit}>
            <input type="text" required name="username" placeholder="username" onChange={onChange} />
            <input type="password" required name="password" placeholder="password" onChange={onChange} />
            {!isLogin && <input type="password" required name="confirmPassword" placeholder="confirm password" onChange={onChange} />}
            <button>Submit</button>
        </form>

        <style>{`
            .Login form {
                width: 15rem;
            }

            .Login .error {
                margin-top: .5rem;
            }
        `}</style>
    </div>
}

export default Layout(Login);
