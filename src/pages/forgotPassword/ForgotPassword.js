// import './forgotPassword.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/auth/forgotpassword', { email })

            // console.log(response.data)
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
                <h2 className='registerTitle'>Password assistance</h2>
                <p>Enter the email address associated with your account.</p>
                <br />
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

                <button className='signUpButton' >Continue</button>
                <h4>Has your email changed?</h4>
                <p>If you no longer use the email address associated with your account, you may contact Customer Service for help restoring access to your account.</p>
            </form>
        </div>
    )
}

export default ForgotPassword