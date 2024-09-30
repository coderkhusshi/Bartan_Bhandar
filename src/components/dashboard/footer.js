import React from "react";

function Footer() {

    return (
        <div className="">

            <footer className="bg-light text-center text-black">
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#3b5998" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-facebook-f"></i>
                        </a>

                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#55acee" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-twitter"></i>
                        </a>

                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#dd4b39" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-google"></i>
                        </a>

                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#ac2bac" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-instagram"></i>
                        </a>

                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#0082ca" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a
                            className="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: "#333333" }}
                            href="#!"
                            role="button">
                            <i className="fab fa-github"></i>
                        </a>
                    </section>
                </div>

                <div className="container row">

                    <div className="col-md-3">
                        <div className="heading">
                        <h1 className="item" style={{ fontWeight: "bold" }}>
                        Ravi<span style={{ color: "#fcb103" }}>Bartan</span><span style={{ fontWeight: "bold" }}>Bhandar</span>
                    </h1>
                        </div>
                    </div>

                </div>

                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>

        </div>
    )
}

export default Footer;