// import React, {useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../action/userAction";
// import { Helmet } from "react-helmet";
// import "./RegisterUser.css"

// const  RegisterUser = ()=>{
//     const  dispacth = useDispatch();
//     const {loading , error} = useSelector((state)=>state.user);

//     const [formData , setFormData] =useState({
//         name: "",
//         email:"",
//         password:"",
//     });

//     const [success , setSuccess] = useState("");

//     const handleChange = (e)=>{
//         const { name, value}= e.target;
//         setFormData({
//             ...formData,
//             [name]:value,
//         });
//     };

//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         setSuccess("");

//         dispacth(register(formData.name,formData.email ,formData.password))
//         .then(()=>{
//             setSuccess("User register successfully!");
//             setFormData({
//                 name:"",
//                 email:"",
//                 password:"",
//             });
//         })
//         .catch((error)=>{
//             console.error
//         });
//     };

//     return(
//         <div className="register-user">
//             <Helmet>
//                 <title>REGISTER-USER</title>
//                 <meta name="register" content="Register-User"/>
//             </Helmet>
//             <h1>Register User</h1>

//             <form  onSubmit={handleSubmit}>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {success && <p style={{ color: "green" }}>{success}</p>}

//             <div>
//                 <label >Name:</label>
//                 <input type="text"   name="name"
//                 value={formData.name}
//                 onChange={handleChange} required />
//             </div>
//             <div>
//                 <label >Email:</label>
//                 <input type="email"   name="email"
//                 value={formData.email}
//                 onChange={handleChange} required />
//             </div>
//             <div>
//                 <label >Passsword:</label>
//                 <input type="password"   name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 />
//             </div>
//             <button type="submit" disabled={loading}>
//           {loading ? "Register in..." : "Register"}
//         </button>
//             </form>
//         </div>
//     )
// }
// export  default RegisterUser 

// #########################################
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../action/userAction";
import { Helmet } from "react-helmet";
import "./RegisterUser.css";

const RegisterUser = () => {
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user) || {};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            setSuccess("User registered successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");

        dispatch(register(formData.name, formData.email, formData.password));
    };

    return (
        <div className="register-user">
            <Helmet>
                <title>REGISTER-USER</title>
                <meta name="register" content="Register-User" />
            </Helmet>
            <h1>Register User</h1>

            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;

