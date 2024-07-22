import { Loginer } from "../components/Loginer.jsx"
import { ButtomBar } from "../components/ButtomBar.jsx";
export function LoginPage () {
    return (
        <div>
            <Loginer />
            <ButtomBar location='login'/>
        </div>

    );
}