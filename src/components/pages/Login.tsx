import { useState, FormEvent } from 'react';
import { SIGN_UP, LOG_IN } from '../../store/types';
import Layout from '../layout';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions';
import { LoginForm } from '../../types';
import Redirect from './Redirect';

interface Props {
    // Tell the component which version to render with string types (exported from store/types)
    type : typeof SIGN_UP | typeof LOG_IN;
}

const Login = ({ type } : Props) => {
    const isLogin = (type === LOG_IN);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<LoginForm>({ username: '', password: '', confirmPassword: '' });
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
                    dispatch( updateUser({ username, isAdmin: username === 'admin', id: !isLogin
                        ? 3
                        : (username === 'admin') ? 1 : 2 }) );
                    return <Redirect />;
                } else return setError(isLogin ? 'Invalid credentials' : 'Username not available');
            } else return setError('Invalid credentials');

            // Normal procedure
            /*
            const user = await (isLogin ? login(formData) : signup(formData));
            dispatch( updateUser(user) );
            return <Redirect />;
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
        <form onSubmit={onSubmit} autoComplete="off">
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
