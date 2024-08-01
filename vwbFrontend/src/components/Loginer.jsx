import reactLogo from "../assets/react.svg";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { login } from "../api/userApi";
import { AccPswdInputer } from "./NewInput";
import { Backdrop, Alert, Snackbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
export function Loginer () {
    const [cookies, setCookies] = useCookies(['authorized', 'authToken', 'name', 'id', 'password']);
    const navigate = useNavigate();
    
    const [pswdError, setPswdError] = useState(false);
    const [accountError, setAccountError] = useState(false);

    const handleClose = () => {
        setPswdError(false);
        setAccountError(false);
    }

    const pswdAlert = (<Alert severity="error">Password Incorrect!</Alert>);
    const accountAlert = (<Alert severity="error">Account Not Exists!</Alert>);

    const submitName = 'Login';
    
    const onSubmit = async (account, password) => {
        const res = await login({name: account, password: password});
        console.log(JSON.stringify(res.data));
        if (res.status == 400) {
            // alert('Account not exist.');
            setAccountError(true);
        } else if (res.status == 401) {
            // alert('Password incorrect');
            setPswdError(true);
        } else if (res.status == 200) {
            const data = res.data;
            setCookies('name', account, {path: '/', maxAge: 60*60, sameSite: 'none',});
            setCookies('id', data.id, {path: '/', maxAge: 60*60, sameSite: 'none',});
            setCookies('authToken', data.token, {path: '/', maxAge: 60*60, sameSite: 'none',});
            setCookies('password', password, {path: '/', maxAge: 60*60, sameSite: 'none',});    
            alert('login sucessfully');
            setCookies('authorized', true, {path: '/', maxAge: 60*60, sameSite: 'none', });  
            
        } else {
            console.log('Unkown Error!');
        }
    };
    return (
        <div className="Loginer-container">
            <AccPswdInputer submitName={submitName} onSubmit={onSubmit} /> 
            <Backdrop
                sx={{color: '#fff', }}
                open={pswdError||accountError}
                onClick={handleClose}
            >
            {pswdError? pswdAlert:accountAlert}
            </Backdrop>
        </div>
    );
}