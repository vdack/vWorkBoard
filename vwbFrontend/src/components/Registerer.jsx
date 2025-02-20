import { AccPswdInputer } from "./NewInput";
import "./Registerer.css"
import { register } from "../api/userApi";
import { redirect } from "react-router-dom";
export function Registerer() {
    const submitName = 'Register';
    const onSubmit = async (account, password) => {
        if (account.length == 0 || account.length > 32) {
            alert('Invalid Account!');
            return;
        }
        if (password.length == 0 || password.length > 32) {
            alert('Invalid Password!');
            return;
        }
        const res = await register({name: account, password: password});
        console.log(JSON.stringify(res));
        if (res.status == 400) {
            alert('Account Already exist!');
        } else if (res.status == 200) {
            console.log('register sucessfully for', res.data);
        } else {
            confirm.log('Unknown Error!');
        }
    }
    return (
        <div className="Registerer-container">
            <AccPswdInputer submitName={submitName} onSubmit={onSubmit} /> 
        </div>
    );
}