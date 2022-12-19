// SignUp
-------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const formInitialSchema = {
        email: '',
        password: ''
    }
    const formValidation = yup.object().shape({
        email: yup.string().required('Email is required').email('Please Enter Valid Email Address'),
        password: yup.string().required('Password is required')
    });


    return (
        <>
            <section className='signup-page'>
                <div className='sign-left'>
                    <div className='left-content'>
                        <h1> Hello, Friend!</h1>
                        <p>
                            Enter your personal details and start journey with us</p>
                    </div>
                </div>
                <div className='sign-right'>
                    <div></div>
                    <div className='main-form'>
                        <h2>Sign Up Here</h2>
                        <Formik initialValues={formInitialSchema}
                            validationSchema={formValidation}
                            onSubmit={(values) => {
                                console.log("values", values);
                                localStorage.setItem("loginId", values.email);
                                localStorage.setItem("pwd", values.password);
                                navigate("/signin");

                            }
                            }
                        >
                            <Form>
                                <div className='form-group'>
                                    <label>Enter Your Email :</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='email' />
                                    </p>
                                </div>
                                <div className='form-group'>
                                    <label>Enter Your Password :</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='password' />
                                    </p>
                                </div>
                                <div className='submit-btn form-group'>
                                    <button
                                        className='custom-btn'
                                        type='submit'>Sign Up</button>
                                </div>
                                <div className='form-group back-success'>
                                    {success}
                                </div>
                                <div className='form-group back-error'>
                                    {error}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <Footer />
                </div>
            </section>
        </>
    )
}

export default Signup;

// SignIn
-------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const loginIds = localStorage.getItem("loginId");
    const pwds = localStorage.getItem("pwd");
    console.log("pwds",pwds);

    const formInitialSchema = {
        email: '',
        password: ''
    }
    const formValidation = yup.object().shape({
        email: yup.string().required('Email is required').email('Please Enter Valid Email Address'),
        password: yup.string().required('Password is required')
    });


    return (
        <>
            <section className='signup-page'>
                <div className='sign-left'>
                    <div className='left-content'>
                        <h1> Hello, Friend!</h1>
                        <p>
                            Enter your personal details and start journey with us</p>
                    </div>
                </div>
                <div className='sign-right'>
                    <div></div>
                    <div className='main-form'>
                        <h2>Sign In Here</h2>
                        <Formik initialValues={formInitialSchema}
                            validationSchema={formValidation}
                            
                            onSubmit={(values) => {
                                

                                console.log("values", values);
                                if (values.email === `${loginIds}` && values.password === `${pwds}`) {
                                    console.log("success");
                                    setSuccess("Login SuccessFull");
                                    navigate("/dashboard");
                                    // localStorage.setItem("loginId", values.email);

                                } else {
                                    console.log("error");
                                    setError("Email Id OR Password incorrect");
                                }
                            }
                            }
                        >
                            <Form>
                                <div className='form-group'>
                                    <label>Enter Your Email :</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='email' />
                                    </p>
                                </div>
                                <div className='form-group'>
                                    <label>Enter Your Password :</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='password' />
                                    </p>
                                </div>
                                <div className='submit-btn form-group'>
                                    <button
                                        className='custom-btn'
                                        type='submit'>Sign In</button>
                                </div>
                                <div className='form-group back-success'>
                                    {success}
                                </div>
                                <div className='form-group back-error'>
                                    {error}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <Footer />
                </div>
            </section>
        </>
    )
}

export default SignIn;

// Dashboard
-------------------------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Product from '../jsonFiles/Product';
import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import { cartData } from '../Redux-Saga/reducer/Reducer';

const Dashboard = () => {
    // const result = useSelector((state)=>state.cartData)
    // console.warn("Redux Data",result)

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("loginId") == null) {
            navigate("/");
        }
    }, []);

    const removeToken = () => {
        localStorage.removeItem("loginId");
        navigate("/");
    }

    const addtocart = () => {
        navigate("/cart");
    }

    const uname = localStorage.getItem("loginId");

    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                    <h1>Prakash</h1>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span></p>
                    <button className="custom-btn" onClick={removeToken}>Log Out</button>
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='container'>
                    <h2 className='section-heading'>This is Dashboard Page :</h2>
                    <div className='sign-in-one'>
                        {
                            Product.map((val) => {
                                return (
                                    <div key={val.id} className='items'>
                                        <div className='items-img'>
                                            <img src={val.image} alt="React" />
                                            <span>{val.id}</span>
                                        </div>
                                        <div className='items-body'>
                                            <h4>Product Name : {val.name}</h4>
                                            <p>Product Price : {val.price}</p>
                                        </div>
                                        <div className='items-btn'>
                                            <button onClick={addtocart} className='custom-btn'>Add to cart</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Dashboard;
