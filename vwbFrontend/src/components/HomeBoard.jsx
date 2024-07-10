import "./HomeBoard.css";

export function HomeBoard() {
    
    let authorized = localStorage.getItem('authToken') > 0;

    const unauthorizedBoard = (
    <div className="HomeBoard-unauthorized">
        <p className="HomeBoard-body">Have Not Logined Yet!</p>
        <p className="HomeBoard-body">Please Click Below to Start.</p>
    </div>
    );
    const authorizedBoard = (
        <div className="HomeBoard-authorized">
            <p className="HomeBoard-body">Hello, {localStorage.getItem('name')} !</p>
        </div>
    );


    return (
        <div className="HomeBoard-container">
            {authorized? authorizedBoard : unauthorizedBoard}
        </div>
    );
};