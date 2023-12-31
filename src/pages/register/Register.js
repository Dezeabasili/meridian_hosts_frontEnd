import './register.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from "../../context/authContext";

const username_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{5,20}$/
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState()
    const [usernameFocus, setUsernameFocus] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
    const [passwordFocus, setPasswordFocus] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState()
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setValidUsername(username_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(password_REGEX.test(password))
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(baseURL + 'api/v1/auth/register', { name, username, email, password })

            // console.log(response.data)
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            navigate('/login')

        } catch (err) {
            if (!err?.response)
                console.log('no server response')
            else console.log(err)
        }

    }
    return (
        <div className='register'>
            <form className='registerContainer' onSubmit={handleSubmit}>
                <h1 className='registerTitle'>Register</h1>
                <div className='registerDiv'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete='off'
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                    <p className={usernameFocus && !validUsername ? 'showInstructions' : 'hideInstructions'}>
                    Username must begin with a letter.<br/> 
                    Must contain 5 - 20 characters. <br/>
                    The following characters are allowed: <br/> 
                    Letters, numbers, hyphens, underscores
                    </p>
                </div>
                <div className='registerDiv'>
                    <label htmlFor='email'>e-mail:</label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p className={passwordFocus && !validPassword ? 'showInstructions' : 'hideInstructions'}>
                    Password must contain 8 - 24 characters. <br/>
                    It must include the following: <br/>
                    a lowercase letter, an uppercase letter, a number, one of these special characters % ! @ # $ 
                    </p>
                </div>
                <div className='registerDiv'>
                    <label htmlFor='confirmPwd'>Confirm Password:</label>
                    <input
                        id='confirmPwd'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        onFocus={() => setConfirmPasswordFocus(true)}
                        onBlur={() => setConfirmPasswordFocus(false)}
                    />
                    <p className={confirmPasswordFocus && !validConfirmPassword ? 'showInstructions' : 'hideInstructions'}>
                    Passwords must match.
                    </p>

                </div>

                <button className='signUpButton' disabled={!validUsername || !validPassword || !validConfirmPassword} >Sign Up</button>
                <p>Already registered?</p>
                <Link to={'/login'}>
                    <p><strong>Sign In</strong></p>
                </Link>

            </form>
        </div>
    )
}

export default Register