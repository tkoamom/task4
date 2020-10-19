import React,{useState} from 'react'
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () =>{
    const {loading, request} = useHttp()

    const [form,setForm] = useState({
        email:'', password:''
    })

    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
        console.log(event.target.name)
    }

    const registerHandler = async ()=>{
        try{
            const data = await request("api/auth/register", 'POST', {...form})
            console.log('data',data)
        } catch(e){

        }
    }
    return(
    <div className="main-form">
        <h1>Authorization</h1>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" name="email"
                    onChange={changeHandler}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" name="password"
                           onChange={changeHandler}/>
                </div>
            </div>


            <div className="form-group row">
                <div className="col-sm-3">
                    <div className="d-flex justify-content-between">
                        <button  className="btn btn-primary" >Login</button>
                        <button onClick={registerHandler} className="btn btn-primary" >Register</button>

                    </div>
                </div>

            </div>
        </div>
    )}