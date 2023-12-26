import './subscription.css'

const Subscription = () => {
    return (
        <div className='subsContainer'>
            <h3 className='subsTitle'>Save time, save money</h3>
            <p className='subsDecs'>Sign up and we'll send the best deals to you</p>
            <div className='subsDiv1'>
                <input className='subsInput' type='email' placeholder='email' />
                <button className='subsButton'>Subscribe</button>
            </div>
        </div>
    )
}

export default Subscription