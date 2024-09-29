import logo from "../assets/logo-cr.png"
import '../style/styleFot.css'

const Footer = () => {
    return (
        <footer>
            <section>
                <div className="contact py-5" id="footer">
                    <div className="container">
                        <div className="col-lg-12">
                            <div className="row text-light">
                                <div className="col-lg-4 mb-4">
                                    <div className="fs-4 font-outfit">
                                        <img src={logo} alt="" className="ft-img"/>
                                        <br />
                                    </div>
                                    <div className="alamat">
                                        <h2>ADDRESS</h2>
                                            <p>Jl. Mayjen Sutoyo No.11, RT.3/RW.9, Cawang, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13630
                                            <br />Call Center : <a href="https://www.asabri.co.id/tel:+621500043" >1500043</a>
                                            </p>
                                        </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row fs-4">
                                        <div className="col-sm-4">
                                            <span className="font-outfit" style={{ color: "white" }}>Hyperlink</span>
                                            <div className="fs-6 mt-2 nav-item">
                                                <a href="#header" className="nav-link">Home</a>
                                                {/* <a href="#about" className="nav-link">About</a>
                                                <a href="#project" className="nav-link">Project</a> */}
                                                <a href="#footer" className="nav-link">Contact</a>
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <span className="font-outfit" style={{ color: "white" }}>Tool that Use</span>
                                            <div className="fs-6 mt-2 nav-item">
                                                <a href="https://www.figma.com/" target="_blank" className="nav-link">Figma</a>
                                                <a href="https://hype4.academy/tools/glassmorphism-generator" target="_blank"
                                                    className="nav-link">Glassmorphism</a>
                                                <a href="https://www.csshero.org/mesher/" target="_blank" className="nav-link">Background Mesh</a>
                                                <a href="https://v2.chakra-ui.com/" target="_blank" className="nav-link">Chakra UI</a>
                                                <a href="https://getbootstrap.com/" target="_blank" className="nav-link">Bootstrap</a>
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <span className="font-outfit" style={{ color: "white" }}>Social Media</span>
                                            <div className="fs-6 mt-2 nav-item">
                                                <a href="https://www.instagram.com/asabri_official/" target="_blank" className="nav-link">Instagram</a>
                                                <a href="https://www.facebook.com/asabriofficial/" target="_blank" className="nav-link">Facebook</a>
                                                <a href="https://www.youtube.com/channel/UC25CUhG6hXnWg_MOcCE1VQA" target="_blank" className="nav-link">Youtube</a>
                                                <a href="mailto:asabri@asabri.co.id" target="_blank" className="nav-link">Email</a>
                                                <a href="https://www.linkedin.com/company/pt.-asabri/?originalSubdomain=id" target="_blank" className="nav-link">Linkedin</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                        <hr className="mt-5"/>
                                        <span>© 2024. All Right Reserved.</span>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
