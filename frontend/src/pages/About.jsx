import React from "react";
import Navbar from "../components/Navbar";

function About() {
    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">About SmartTransit</h4>
                    </div>

                    <div className="card-body">

                        <p>
                            <strong>SmartTransit</strong> is a modern travel booking platform
                            that allows users to book flights, buses, trains, and metro tickets
                            easily and efficiently.
                        </p>

                        <h5 className="mt-4">Our Mission</h5>
                        <p>
                            To provide a seamless, fast, and secure travel booking experience
                            for users across different transportation systems.
                        </p>

                        <h5 className="mt-4">Features</h5>
                        <ul>
                            <li>Multi-transport booking (Bus, Train, Flight, Metro)</li>
                            <li>Secure authentication system</li>
                            <li>Real-time booking management</li>
                            <li>Favorites and quick access</li>
                        </ul>

                        <h5 className="mt-4">Technology Stack</h5>
                        <ul>
                            <li>Frontend: React + Bootstrap</li>
                            <li>Backend: Node.js + Express</li>
                            <li>Database: MongoDB</li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}

export default About;