import React from 'react'
import { useState } from 'react'
import './login.css'
const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()

        if(!email || !password){
            setError('Please fill in the required fields')
        }else{
            setError('')
            setEmail('')
            setPassword('')
        }
    }

    return(
        <>
        <div className='formInput'>
            <form onSubmit={handleSubmit} className='form'>
                <p>Login to your Account</p>
                <br />
                <label htmlFor="">E-mail:</label>
                <input type="email" placeholder="example@gmail.com" onChange={(e)=>setEmail(e.target.value)} value={email} required/>

                <br />

                <label htmlFor="">Password:</label>
                <input type="password" placeholder="**********" onChange={(e)=>setPassword(e.target.value)} value={password} required/>

                <br />

                <button type='submit'>Login</button>

                <br /><br />
                <p><a href="/reset">Forgot password</a></p>
                <h4>Not have an account? / <a href="/signup">SignUp</a></h4>
            </form>
        </div>
        </>
    )
}
export default Login