import { useState } from "react";
import './NewInput.css';
import reactLogo from "../assets/react.svg";


export function AccPswdInputer(paras) {
    

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [ifHiddenPassword, setIHP] = useState(true);

    const submitName = paras.submitName;
    const onSubmit = (event) => {
        event.preventDefault();
        const tempAccount = account;
        const tempPassword = password;
        setAccount('');
        setPassword('');
        paras.onSubmit(tempAccount, tempPassword);
        
    }

    const changeAccount = (event) => {
        setAccount(event.target.value);
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    // return (
    //     <div>
    //         <div className="NewInput-logoContainer">
    //             <img src={reactLogo} className="Loginer-logo"/>
    //         </div>
    //         <h1>{submitName}</h1>
    //         <div className="NewInput-container">
    //             <h3>Account: </h3>
    //             <input 
    //                 type="text"
    //                 value={account}
    //                 onChange={changeAccount}
    //             />
    //         </div>

    //         <div className="NewInput-container">
    //             <h3>Password: </h3>
    //             <input 
    //                 type="password"
    //                 value={password}
    //                 onChange={changePassword}
    //             />
    //         </div>

    //         <button className="NewInput-submitButton" onClick={onSubmit}>{submitName}</button>
    //     </div>
    // );

    return (
        <div className="NewInput-container">
            <div className="logoContainer">
                <img src={reactLogo} className="Loginer-logo"/>
            </div>
            <h2>{submitName}</h2>
            <form onSubmit={onSubmit} >
                <label>
                    Name: 
                    <input type="text" value={account} onChange={changeAccount} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={changePassword} />
                </label>
                <br />
                <input type="submit" value={submitName} />
            </form>
        </div>
    );
}