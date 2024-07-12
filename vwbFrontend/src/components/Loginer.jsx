import reactLogo from "../assets/react.svg";
import "./Loginer.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { getUserByName, login} from "../api/userApi";
import { AccPswdInputer } from "./NewInput";
export function Loginer () {
    const [cookies, setCookies] = useCookies(['authorized', 'authToken', 'name', 'id', 'password']);

    const submitName = 'Login';
    
    const onSubmit = async (account, password) => {
        const res = await login({name: account, password: password});
        console.log(JSON.stringify(res.data));
        if (res.status == 400) {
            alert('Account not exist.');
        } else if (res.status == 401) {
            alert('Password incorrect');
        } else if (res.status == 200) {
            console.log('login sucessful');
            setCookies('authorized', true, {path: '/', maxAge: 60*60});
            setCookies('authToken', res.data.token, {path: '/', maxAge: 60*60});
            setCookies('name', res.data.name, {path: '/', maxAge: 60*60});
            setCookies('id', res.data.id, {path: '/', maxAge: 60*60});
            setCookies('password', password, {path: '/', maxAge: 60*60});        
        } else {
            console.log('Unkown Error!');
        }
    };
    return (
        <div className="Loginer-container">
            <AccPswdInputer submitName={submitName} onSubmit={onSubmit} /> 
        </div>
    );
}