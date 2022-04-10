import React from 'react';
import {Link} from 'react-router-dom'

const styles = {
    section : {
        marginTop : "25px"
    }
}


export const Start = () => {
    return (
        <section className="pt-5 pt-md-11" style={styles.section}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-5 col-lg-8 order-md-2">      
                        <img 
                            src="https://landkit.goodthemes.co/assets/img/illustrations/illustration-2.png"
                            className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 aos-init aos-animate"
                            alt="Intro image"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        />
                    </div>
                <div className="col-12 col-md-7 col-lg-4 order-md-1 aos-init aos-animate" data-aos="fade-up">

                    
                    <h1 className="display-3 text-center text-md-start">
                    Welcome to <span className="text-primary">Employee</span>. <br/>
                    Develop App.
                    </h1>

                    
                    <p className="lead text-center text-md-start text-muted mb-6 mb-lg-8">
                    Build a beautiful, modern website with flexible Bootstrap components built from scratch.
                    </p>

                    
                    <div className="text-center text-md-start">
                    <Link to="/login" className="btn btn-info shadow lift me-1">
                        Log in <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                    <Link to="/signup" className="btn btn-outline-warning lift">
                    <i className="bi bi-person-check-fill"></i>
                    &nbsp;Sign up
                    </Link>
                    </div>

                </div>
                </div> 
            </div> 
        </section>
    )
}