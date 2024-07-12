import "./HomeBoard.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export function HomeBoard() {
    const navigate = useNavigate();

    const [cookies, setCookies, removeCookies] = useCookies(['authorized', 'authToken', 'name']);
    const logout = () => {
        setCookies('authorized', false, {path: '/', maxAge: 60*60});
        removeCookies('authorized', {path: '/'});
        removeCookies('name', {path: '/'});
    }
    const unauthorizedBoard = (
    <div className="HomeBoard-unauthorized">
        <p className="HomeBoard-body">Have Not Logined Yet!</p>
        <p className="HomeBoard-body">Please Click Below to Start.</p>
    </div>
    );
    const authorizedBoard = (
        <div className="HomeBoard-authorized">
            <p className="HomeBoard-body">Hello, {cookies.name} !</p>
            
            <div className="button-container">
                <button onClick={() => {cookies.authorized? navigate('/board'): navigate('/');}} className="action-button">WorkBoard</button>
                    <div className="divider"></div>
                <button onClick={logout} className="action-button">Log Out</button>
            </div>
        </div>
    );


    return (
        <div className="HomeBoard-container">
            {cookies.authorized? authorizedBoard : unauthorizedBoard}
        </div>
    );
};