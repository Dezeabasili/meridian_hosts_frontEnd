// import './passwordReset.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from "../../context/authContext";

const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const PasswordReset = () => {
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
    const [passwordFocus, setPasswordFocus] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState()
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState()
    const navigate = useNavigate()
    const {resettoken, user_id} = useParams()

    useEffect(() => {
        setValidPassword(password_REGEX.test(password))
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            //continue tomorrow
            const response = await axios.post(baseURL + `api/v1/auth/resetpassword/${resettoken}/${user_id}`, { password })

            // console.log(response.data)
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
                <h1 className='registerTitle'>Reset Password</h1>
               
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

                <button className='signUpButton' disabled={!validPassword || !validConfirmPassword} >Submit new password</button>

            </form>
        </div>
    )
}

export default PasswordReset