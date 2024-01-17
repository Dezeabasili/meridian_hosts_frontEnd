import './changePassword.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosInterceptors from '../../hooks/useAxiosWithInterceptors'
import { baseURL } from "../../context/authContext";

const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
    const [passwordFocus, setPasswordFocus] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState()
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState()
    const navigate = useNavigate()
    const axiosWithInterceptors = useAxiosInterceptors()

    useEffect(() => {
        setValidPassword(password_REGEX.test(password))
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          
            const response = await axiosWithInterceptors.post(baseURL + 'api/v1/auth/changepassword', {currentPassword, password })
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
                    <label htmlFor='password'>Current password:</label>
                    <input
                        id='password'
                        type='password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='password'>New password:</label>
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
                    <label htmlFor='confirmPwd'>Confirm new password:</label>
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

                <button className='signUpButton' disabled={!currentPassword || !validPassword || !validConfirmPassword} >Submit new password</button>


            </form>
        </div>
    )
}

export default ChangePassword