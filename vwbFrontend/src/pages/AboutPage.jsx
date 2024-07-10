import "./AboutPage.css";
import {ButtomBar} from "../components/ButtomBar.jsx";
export function AboutPage() {
    return(
        <div className="AboutPage-container">
            <section>
                <h2 className="AboutPage-header">About the Web:</h2>
                <div className="AboutPage-body">
                    <p>Big Homework for Web Development, NJU 2024</p>
                    <p>A Very Simple WorkBoard Web Application</p>
                </div>
            </section>
                
            <section>
                <h2 className="AboutPage-header">About me:</h2>
                <div>
                    <p className="AboutPage-body">a SE Undergraduate in NJU.</p>
                    <p className="AboutPage-body">221900009, Chen P.X.</p>
                    <div>
                        <h3 className="AboutPage-subHeader">QQ: </h3>
                        <p className="AboutPage-contact">1226814416</p>
                    </div>
                    <div>
                        <h3 className="AboutPage-subHeader">e-mail: </h3>
                        <p className="AboutPage-contact">thousandawn@126.com</p>
                    </div>
                        
                    <div>
                        <h3 className="AboutPage-subHeader">GitHub: </h3>
                        <p className="AboutPage-contact"><a href="https://github.com/vdack">vdack</a></p>
                    </div>
                    
                    
                </div>
            </section>

            <section>
                <p className="AboutPage-end">
                    For More Information, Please Contact Me.
                </p>
            </section>
            
            
            <ButtomBar />
        </div>
    );
};