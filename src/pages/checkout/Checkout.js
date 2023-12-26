import './checkout.css'
import { Link } from 'react-router-dom'

const Checkout = () => {
    
    return (
        <>
            <h4>Thank you for your successful booking </h4>
            <p>Please check your email for your booking reference</p>
            <br />

            <Link to={'/'}>Return to the Home page</Link>

        </>
    )
}

export default Checkout