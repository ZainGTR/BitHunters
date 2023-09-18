import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className='container'>
            <div className='message'>
            <h1>Welcome to bitHunters: Unleash the Power of Data Mining!</h1>
            <p>Are you ready to transform your business through the untapped potential of real human-driven data collection? Look no further than bitHunters, your trusted partner in harnessing the true essence of data.</p>
            <h2>What is bitHunters?</h2>
            <p>bitHunters is the ultimate data mining platform designed for businesses, professionals, and merchants who demand precision and authenticity in their data collection efforts. We bring together two integral components of data harvesting: the Task Creators and the Hunters.</p>
            <p><strong>Task Creators:</strong>  Are you seeking actionable insights, market trends, or specific information to fuel your business objectives? With bitHunters, you can effortlessly create data collection tasks and set prices for each data point. You're in control of your data destiny.</p>
            <p><strong>Hunters:</strong> Looking to earn rewards while helping businesses thrive? Become a bitHunter! As a Hunter, you'll be guided by our intuitive Chrome extension, ensuring your data collection is accurate, efficient, and profitable.</p>
            <h2>Why Choose bitHunters?</h2>
            <ul>
                <li><strong>✨ Real People</strong>, Real Data: We believe in the power of genuine human-driven data collection. Say goodbye to inaccurate or outdated information.</li>
                <li><strong>💼 Business-Centric:</strong> bitHunters is tailored to meet the unique data needs of businesses, professionals, and merchants across various industries.</li>
                <li><strong>💡 Tokenized Rewards:</strong> Task Creators pay Hunters with our dedicated token, providing a seamless and secure transaction experience.</li>
                <li><strong>🌐 Chrome Extension:</strong> Our user-friendly Chrome extension makes data collection a breeze, offering step-by-step guidance for Hunters.</li>
                <li><strong>🔒 Data Security:</strong> We prioritize your data security. Your information is encrypted, ensuring confidentiality and peace of mind.</li>
            </ul>
            <h2>Ready to Get Started?</h2>
            <p>Join the data revolution with bitHunters today and unlock the insights you need to supercharge your business!</p>
            <Link className='signup' to='/login'>Sign Up Now</Link>
            
            
            </div>
        </div >

    )
}

export default Home