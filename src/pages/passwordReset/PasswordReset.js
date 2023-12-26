// import './passwordReset.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const PasswordReset = () => {
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState()
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
            const response = await axios.post(`/auth/resetpassword/${resettoken}/${user_id}`, { password })

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
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='confirmPwd'>Confirm Password:</label>
                    <input
                        id='confirmPwd'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button className='signUpButton' disabled={!validPassword || !validConfirmPassword} >Submit new password</button>

            </form>
        </div>
    )
}

export default PasswordReset