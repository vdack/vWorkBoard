import reactLogo from "../assets/react.svg";
import { ButtomBar } from "../components/ButtomBar";
import { HomeBoard } from "../components/HomeBoard";

export function HomePage() {
    return (
        <div>
            <section>
                <div className="logoContainer">
                    <img src={reactLogo} className="logo"/>
                </div>
                <h1>Welcome to WorkBoard!</h1>
            </section>
            <section>
                <HomeBoard />
            </section>
            <ButtomBar />
        </div>
    );
}