import React from 'react';
import '../assets/css/home.css';
import Navigation from './Navigation';


const Home = () => {
    return (
        <section id='home'>
          
            <div className="container home__container">
                <Navigation></Navigation>
            </div> 
            </section>

    )
}

export default Home