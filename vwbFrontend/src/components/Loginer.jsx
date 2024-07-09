
import reactLogo from "../assets/react.svg";
import "./Loginer.css";
import { useState } from "react";
import { getUserByName } from "../api/userApi";

export function Loginer () {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [ifHiddenPassword, setIHP] = useState(true);

    const changeAccount = (event) => {
        setAccount(event.target.value);
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
    }
    const loginin = async () => {
        console.log('account', account);
        console.log('password', password);
        const user = await getUserByName(account);
        console.Console(JSON.stringify(user));
        setAccount('');
        setPassword('');
    }

    return (
        <div className="Loginer-container">
            <div className="Loginer-logoContainer">
                <img src={reactLogo} className="Loginer-logo"/>
            </div>
            <h1>LOGIN HERE</h1>
            <div className="Loginer-accountInput">
                <h3>Account: </h3>
                <input 
                    type="text"
                    value={account}
                    onChange={changeAccount}
                />
            </div>

            <div className="Loginer-passwordInput">
                <h3>Password: </h3>
                <input 
                    type="password"
                    value={password}
                    onChange={changePassword}
                />
            </div>

            <button className="Loginer-loginButton" onClick={loginin}>Login</button>
        </div>
    );
}