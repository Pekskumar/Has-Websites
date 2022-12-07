// Registration/SignUp
-------------------------------------------------------------------------------------------

import React , {useEffect,useState} from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik , Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';

const SignUp = () => {
    useEffect (() => {
        if (localStorage.getItem("token") !== null) {
            console.log("hellos");
            navigate("/dashboard");
        }
    }, [])
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const formInitialSchema = {
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        contact_no : '',
        confirm_password : '',
        business_name : '',
        business_description : ''
    }
    const formValidation = yup.object().shape({
        first_name : yup.string().required('First Name is required'),
        last_name : yup.string().required('Last Name is required'),
        email : yup.string().required('Email is required').email('Please Enter Valid Email Address'),
        contact_no: yup.string().required('Contact Number is required').max(10, 'Contact Number must be between 1 and 10 Numbers.'),
        password : yup.string().required('Password is required'),
        confirm_password : yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Both password need to be the same"
            )
          }),
        business_name : yup.string().required('Business Name is required'),
        business_description : yup.string().required('Business Description is required')
    });

 return (
    <>
    <Header 
    text = 'Already have an Account?'
    pageLink = '/signin'
    pageName = "Sign In"
    />
    <section className='signup-page'>
        <div className='sign-left'>
            <div className='left-content'>
                <h1> Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
            </div>
        </div>
        <div className='sign-right'>
            <div></div>
            <div className='main-form'>
                <h2>Create Account</h2>
                <Formik initialValues={formInitialSchema} 
                validationSchema={formValidation}
                onSubmit={async (values) => {
                    const data = {
                                first_name: values.first_name,
                                last_name: values.last_name,
                                email: values.email,
                                contact_no: values.contact_no,
                                password: values.password,
                                confirm_password: values.confirm_password,
                                business_name: values.business_name,
                                business_description: values.business_description,
                        }
                
                        const axiosConfig = {
                            headers: {
                                'Accept': 'application/json',
                            },
                        }
                         const response = await axios.post(
                            'https://rsacarbook.jaraware.com/api/v1/register',
                            data,
                            axiosConfig)

                            .then((response) => {
                                console.log('response',data)
                                setSuccess('You have successfully Registered');
                                setError('');
                                navigate("/signin");
                            })
                            .catch((e) => {
                                console.log('Error',data)
                                setError('Email or Contact Number is aleready Exist');
                                setSuccess('');
                            });
                
                    }
                }                
                >
                    <Form>
                        <div className='form-group'>
                            <label>Enter First Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='first_name' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Last Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='last_name' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Email<span className='red-color'>*</span></label>
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
                            <label>Enter Your Contact Number<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="contact_no"
                            placeholder="Enter Your Contact Number"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='contact_no' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Password<span className='red-color'>*</span></label>
                            <Field 
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='password' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Confirm Password<span className='red-color'>*</span></label>
                            <Field 
                            type="password"
                            name="confirm_password"
                            placeholder="Enter Your Confirm Password"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='confirm_password' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Business Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="business_name"
                            placeholder="Enter Your Business Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='business_name' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Business Description<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="business_description"
                            placeholder="Enter Your Business Description"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='business_description' />
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

export default SignUp;

// SignIn/LogIn
-------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Header from "../components/Header";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';

const SignIn = () => {
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            console.log("hellos");
            navigate("/dashboard");
        }
    }, [])

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
            <Header
                text="You Don't have an Account?"
                pageLink='/'
                pageName="Sign Up"
            />
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
                        <h2>Sign In</h2>
                        <Formik initialValues={formInitialSchema}
                            validationSchema={formValidation}
                            onSubmit={async (values) => {
                                const data = {
                                    email: values.email,
                                    password: values.password,
                                }
                                const axiosConfig = {
                                    headers: {
                                        'Accept': 'application/json',
                                    },
                                }

                                const response = await axios.post(
                                    'https://rsacarbook.jaraware.com/api/v1/login',
                                    data,
                                    axiosConfig)

                                    .then((response) => {
                                        if (response.data.data.token) {
                                            localStorage.setItem("token", response.data.data.token.accessToken);
                                            localStorage.setItem("first_name", response.data.data.user.first_name);
                                            localStorage.setItem("last_name", response.data.data.user.last_name);
                                            localStorage.setItem("profile_pic", response.data.data.user.profilepic);
                                        }
                                        setSuccess('You have successfully Registered');
                                        setError('');
                                        navigate("/dashboard");
                                    })
                                    .catch((e) => {
                                        console.log('Error', data)
                                        setError('Email or Contact Number is aleready Exist');
                                        setSuccess('');
                                    });

                            }
                            }
                        >
                            <Form>
                                <div className='form-group'>
                                    <label>Enter Your Email<span className='red-color'>*</span></label>
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
                                    <label>Enter Your Password<span className='red-color'>*</span></label>
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

// Update Profile/Details
-------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import logo from '../images/logo.png'
import { Await, NavLink, useNavigate } from 'react-router-dom';


const UpdateProfile = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [contactnumber, setContactnumber] = useState([]);
    const [bname, setBname] = useState([]);
    const [bdesc, setBdesc] = useState([]);
    const [cityid, setCityid] = useState([]);
    

    useEffect(() => {

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getUserData', axiosConfig)
            .then((res) => {
                setUsername(res.data.data.user.first_name);
                setLastname(res.data.data.user.last_name);
                setContactnumber(res.data.data.user.contact_no);
                setBname(res.data.data.user.business.business_name);
                setBdesc(res.data.data.user.business.business_description);
                setCityid(res.data.data.user.city_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const formInitialSchema = {
        business_name: '',
        business_description: '',
        first_name: '',
        contact_no: '',
        last_name: '',
        city_id: '',
      
    }
    const formValidationSchema = yup.object().shape({
        business_name: yup.string().required('Business Name is required'),
        business_description: yup.string().required('business_description required'),
        first_name: yup.string().required('first_name is required'),
        contact_no: yup.string().required('contact_no is required'),
        last_name: yup.string().required('last_name is required'),
        city_id: yup.string().required('city_id is required'),
     
    })

    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
        // setToken(null);
    }
    const proPic = localStorage.getItem("profile_pic");
    const uname = localStorage.getItem("first_name");

    const [file, setFile] = useState('');

    function handleChange(event) {
        setFile(event.currentTarget.files[0]);
    }

    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button className="custom-btn" onClick={removeToken}>Log Out</button>
                    </p>
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                    <ul className='user-pages'>
                    <li><NavLink exact className='custom-btn'  to='/dashboard'>Dashboard</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                        <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                    </ul>
                    </div>
                    <div className='sign-right'>
                        <div className='main-form'>
                            <h2>Update Your Profile Details :</h2>
                            <Formik
                                initialValues={formInitialSchema}
                                validationSchema={formValidationSchema}
                                
                                onSubmit={
                                     (values) => {
                                        const url = 'https://rsacarbook.jaraware.com/api/v1/updateUserData';
                                        const formData = new FormData();
                                        formData.append('profile_pic', file);
                                        formData.append('business_name', values.business_name);
                                        formData.append('business_description', values.business_description);
                                        formData.append('first_name', values.first_name);
                                        formData.append('last_name', values.last_name);
                                        formData.append('contact_no', values.contact_no);
                                        formData.append('city_id', values.city_id);
                                        console.log("file this",file)

                                        const axiosConfig = {
                                            headers: {
                                                // 'Accept': 'application/json',
                                                // 'content-type': 'multipart/form-data',
                                                Authorization: 'Bearer ' + localStorage.getItem("token"),
                                            }
                                        };
                                        
                                axios.post(url,formData,axiosConfig
                                        ).then((response) => {
                                            console.log('response', response);
                                            setSuccess(response.data.meta.message);
                                            setError('');
                                        })
                                            .catch((err) => {
                                                console.log("error", err);
                                                setError(err.message);
                                                setSuccess('');
                                            })

                                    }
                                }
                            >
                                <Form>
                                    <div className='form-group'>
                                        <label>Change Your first_name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="first_name"
                                            placeholder={username}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='first_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your last_name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder={lastname}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='last_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your contact_no<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="contact_no"
                                            placeholder={contactnumber}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='contact_no' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your city_id<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="city_id"
                                            placeholder={cityid}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='city_id' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your Business Name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="business_name"
                                            placeholder={bname}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='business_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your Business Description<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="business_description"
                                            placeholder={bdesc}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='business_description' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your profile_pic<span className='red-color'>*</span></label>
                                        <Field
                                            type="file" name='profilepic'
                                            onChange={handleChange}
                                            // placeholder={bdesc}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='profile_pic' />
                                        </p>
                                    </div>
                                    
                                    
                                    <div className='submit-btn form-group'>
                                        <button
                                            className='custom-btn'
                                            type='submit'>Upadte Profile</button>
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
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default UpdateProfile;

// Pricing/Show data/Get data
-------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const Pricing = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState([]);
    const [price, setPrice] = useState([]);
    useEffect(() => {

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getUserData', axiosConfig)
            .then((res) => {
                setUsername(res.data.data.user.first_name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }
        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getPlanList', axiosConfig)
            .then((res) => {
                console.log("res", res.data);
                setPrice(res.data.data.plan);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
        // setToken(null);
    }

    const proPic = localStorage.getItem("profile_pic");
    const uname = localStorage.getItem("first_name");


    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button class="custom-btn" onClick={removeToken}>Log Out</button>
                    </p>
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                    <ul className='user-pages'>
                    <li><NavLink exact className='custom-btn'  to='/dashboard'>Dashboard</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                        <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                    </ul>
                    </div>
                    <div className='sign-right'>
                        <div className='main-form'>
                            <h2>Pricing :</h2>
                            <div className="pricing-plan">
                                {
                                    price.map((val, i) => (
                                        <div className='item' key={i}>
                                            <h5>planname: <span className='green-color'>{val.planname}</span></h5>
                                            <h5>Price: <span className='green-color'>{val.price}</span></h5>
                                            <h6>Duration: <span className='green-color'>{val.duration}</span></h6>
                                            <p>Description: <span className='green-color'>{val.description}</span></p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default Pricing;

// Upload Images
-------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink , useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const UploadDocuments = () => {


    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }
    }, []);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
    }

    const [file, setFile] = useState('');
    const [file2, setFile2] = useState('')
    const [file3, setFile3] = useState('')
    const [file4, setFile4] = useState('')

    function handleChange(event) {
        setFile(event.target.files[0])
    }
    function handleChange2(event) {
        setFile2(event.target.files[0])
    }
    function handleChange3(event) {
        setFile3(event.target.files[0])
    }
    function handleChange4(event) {
        setFile4(event.target.files[0])
    }


    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://rsacarbook.jaraware.com/api/v1/uploadUserDocument';
        const formData = new FormData();
        formData.append('aadhar_front', file);
        formData.append('aadhar_back', file2);
        formData.append('license', file3);
        formData.append('license_back', file4);
        const config = {
            headers: {
                // 'content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log("response.data",response.data);
            setSuccess(response.data.meta.message);
            setError('');
        })
        .catch((err) => {
            console.log("err.data",err);
            setSuccess('');
            setError(err.message);
        })
    
    }

    const proPic = localStorage.getItem("profile_pic");
    const uname = localStorage.getItem("first_name");


    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button className="custom-btn" onClick={removeToken}>Log Out</button>
                    </p>
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                    <ul className='user-pages'>
                    <li><NavLink exact className='custom-btn'  to='/dashboard'>Dashboard</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                        <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                    </ul>
                    </div>
                    <div className='sign-right'>
                        <div className='main-form'>
                            <h2>Update Your Profile Details :</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Uplaod Your aadhar_front<span className='red-color'>*</span></label>
                                    <input type="file" name='aadhar_front' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your aadhar_back<span className='red-color'>*</span></label>
                                    <input type="file" name='aadhar_back' onChange={handleChange2} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your license<span className='red-color'>*</span></label>
                                <input type="file" name='license' onChange={handleChange3} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your license_back<span className='red-color'>*</span></label>
                                <input type="file" name='license_back' onChange={handleChange4} />
                                </div>
                                <div className='submit-btn form-group'>
                                    <button className="custom-btn" type="submit">Upload</button>
                                </div>
                                <div className='form-group back-success'>
                                        {success}
                                    </div>
                                    <div className='form-group back-error'>
                                        {error}
                                    </div>
                            </form>



                        </div>
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default UploadDocuments;

// Inquery/post data
-------------------------------------------------------------------------------------------

import React , {useEffect,useState} from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik , Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink,useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const Inquery = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
const formInitialSchema = {
      fullname : '',
      description : '',
        
        // city_id : '',
    }
    const formValidationSchema = yup.object().shape({
        fullname : yup.string().required('fullname is required'),
        description : yup.string().required('description is required'),
        
}) 

const removeToken = (userToken) => { // export function from module 
    localStorage.removeItem("token");
    navigate("/");
    // setToken(null);
  }
  
  const proPic = localStorage.getItem("profile_pic");
  const uname = localStorage.getItem("first_name");
    return (
        <>
        <header className='dash-header'>
        <div className='app-logo'>
        <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
        </div>
        <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button class="custom-btn" onClick={removeToken}>Log Out</button>
                    </p>
                </div>
        </header>
        <section className='signup-page dashboard'>
        <div className='d-flex'>
        <div className='sign-left'>
        <ul className='user-pages'>
                    <li><NavLink exact className='custom-btn'  to='/dashboard'>Dashboard</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                        <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                    </ul>
            </div>
            <div className='sign-right'>
                <div className='main-form'>
                    <h2>Update Your Profile Details :</h2>
                    <Formik 
                    initialValues={formInitialSchema}
                    validationSchema={formValidationSchema}
                    onSubmit={ 
                        async(values) => {
                            const data = {
                              fullname : values.fullname,
                              description : values.description,
                            }
                            const axiosConfig = {
                                headers : {
                                    'Accept': 'application/json',
                                    Authorization: 'Bearer '+localStorage.getItem("token"),
                                }
                            }
                            const response = await axios.post(
                              'https://rsacarbook.jaraware.com/api/v1/general_inquiry',
                              data,
                              axiosConfig
                            ).then((response) => {
                                console.log('response',response);
                                setSuccess(response.data.meta.message);
                            })
                            .catch((err) => {
                                console.log("error",response);
                                setError(err.data.meta.message);
                            })

                        }
                    }
                    >
                        <Form>
                            <div className='form-group'>
                                <label>Enter Your fullname:</label>
                                <Field 
                                type="text"
                                name="fullname"
                                placeholder="fullname"
                                />
                                <p className='error-msg'>
                                    <ErrorMessage name='fullname' />
                                </p>
                            </div>
                            <div className='form-group'>
                                <label>Enter Your description:</label>
                                <Field 
                                type="text"
                                name="description"
                                placeholder="description"
                                />
                                <p className='error-msg'>
                                    <ErrorMessage name='description' />
                                </p>
                            </div>
                            <div className='submit-btn form-group'>
                                <button 
                                className='custom-btn' 
                                type='submit'>Send Message</button>
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
                </div>
            </div>
            <Footer />
        </section>
        </>
      )
    }

export default Inquery;

// Dashboard/Show data
-------------------------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import { NavLink, Await, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

const Dashboard = () => {
    
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const navigate = useNavigate();
    const [lastname, setLastname] = useState([]);
    const [contactnumber, setContactnumber] = useState([]);
    const [bname, setBname] = useState([]);
    const [bdesc, setBdesc] = useState([]);
    const [cityid, setCityid] = useState([]);
    const [aadharf, setAadharf] = useState([]);
    const [aadharb, setAadharb] = useState([]);
    const [license, setLicense] = useState([]);
    const [licenseb, setLicenseb] = useState([]);
    
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getUserData', axiosConfig)
            .then((response) => {
                console.log("response", response);
                setPosts(response.data.meta.message);
                setUsername(response.data.data.user.first_name);
                setLastname(response.data.data.user.last_name);
                setContactnumber(response.data.data.user.contact_no);
                setBname(response.data.data.user.business.business_name);
                setBdesc(response.data.data.user.business.business_description);
                setCityid(response.data.data.user.city_id);
                setAadharf(response.data.data.user.document.aadharfronturl);
                setAadharb(response.data.data.user.document.aadharbackurl);
                setLicense(response.data.data.user.document.licensefronturl);
                setLicenseb(response.data.data.user.document.licensebackurl);
                
                // console.log("setPosts",setPosts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const removeToken = (userToken) => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const proPic = localStorage.getItem("profile_pic");
    const uname = localStorage.getItem("first_name");

    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                    <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span></p>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button className="custom-btn" onClick={removeToken}>Log Out</button>
                    
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                        <ul className='user-pages'>
                            <li><NavLink exact className='custom-btn' to='/dashboard'>Dashboard</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                            <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                        </ul>
                    </div>
                    <div className='sign-right '>
                        <div className='profile-details'>
                            <div className='main-form'>
                                <h1>Welcome to <span className='green-color'> {username}</span>,</h1>
                                <p>First Name is : {username}</p>
                                <p>Last Name is : {lastname}</p>
                                <p>Contact Number is : {contactnumber}</p>
                                <p>City Id is : {cityid}</p>
                                <p>Business Name is : {bname}</p>
                                <p>Business Description is : {bdesc}</p>
                            </div>
                            <div className='profile-pic'>
                                <img className='pro-pic' alt="pro" src={proPic} />
                            </div>
                        </div>
                        <div className='documents'>
                            <div className='doc'>
                                <p>1. aadhar_front</p>
                                <img className='pro-pic' alt="pro" src={aadharf} />
                            </div>
                            <div className='doc'>
                            <p>2. aadhar_back</p>
                                <img className='pro-pic' alt="pro" src={aadharb} />
                            </div>
                            <div className='doc'>
                            <p>3. license</p>
                                <img className='pro-pic' alt="pro" src={license} />
                            </div>
                            <div className='doc'>
                            <p>3. license_back</p>   
                                <img className='pro-pic' alt="pro" src={licenseb} />
                            </div>
                        </div>


                    </div>

                </div>
                <Footer />
            </section>
        </>
    )
}

export default Dashboard;


// App.js
-------------------------------------------------------------------------------------------

import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/UpdateProfile';
import UploadDocuments from './pages/UploadDocuments';
import Inquery from './pages/Inquery';
import Pricing from './pages/Pricing';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <main>
      <BrowserRouter>
        <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="inquery" element={<Inquery />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path='uplaodDocument' element={<UploadDocuments />} />
        </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

// Header
-------------------------------------------------------------------------------------------

import React from 'react'
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div className='app-logo'>
        <img className='logo' src={logo} alt="logo" />
      </div>
      <div className='app-right'>
        <p className='signin-text'>{props.text}</p>
        <Link to={props.pageLink}>{props.pageName}</Link>
        
      </div>
    </header>
  )
}

export default Header;










