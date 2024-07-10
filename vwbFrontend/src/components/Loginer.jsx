import reactLogo from "../assets/react.svg";
import "./Loginer.css";
import { useState } from "react";
import { getUserByName, login} from "../api/userApi";
import { AccPswdInputer } from "./NewInput";
export function Loginer () {
    const submitName = 'Login';
    const onSubmit = async (account, password) => {
        const res = await login({name: account, password: password});
        console.log(JSON.stringify(res.data));
        if (res.data.status == 400) {
            console.log('Account not exist.');
        } else if (res.data.status == 401) {
            console.log('Password incorrect');
        } else if (res.data.status == 200 && res.data.password) {
            console.log('login sucessful');
        } else {
            console.log('Unkown Error!');
        }
    }
    return (
        <div className="Loginer-container">
            <AccPswdInputer submitName={submitName} onSubmit={onSubmit} /> 
        </div>
    );
}