import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { login, register } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeAll = () => {
        setShowRegister(false);
        setShowLogin(false);
    };

    // REGISTER API
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(form.name, form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    // LOGIN API
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(form.email, form.password)

            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="home-container">

            {/* HEADER */}
            <header className="home-header">
                <div className="home-logo">MyApp</div>

                <div className="home-nav">
                    <button
                        className="btn"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className="btn"
                        onClick={() => setShowRegister(true)}
                    >
                        Register
                    </button>

                </div>
            </header>

            {/* HERO */}
            <section className="home-hero">
                <div className="home-hero-left">
                    <h1>Build Beautiful Pages Without Code</h1>
                    <p>Create and launch faster.</p>
                    <button
                        className="home-hero-btn"
                        onClick={() => setShowRegister(true)}
                    >
                        Get Started
                    </button>
                </div>

                <div className="home-hero-right">
                    <div className="home-hero-card"></div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="home-footer">
                <p>© 2026 MyApp</p>
            </footer>

            {/* REGISTER MODAL */}
            {showRegister && (
                <div className="home-modal-overlay" onClick={closeAll}>
                    <div className="home-modal" onClick={(e) => e.stopPropagation()}>

                        <button className="home-modal-close" onClick={closeAll}>×</button>

                        <h2>Create Account</h2>

                        <form onSubmit={handleRegister}>
                            <input name="name" placeholder="Full Name" onChange={handleChange} required />
                            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                            <button className="home-modal-btn">Register</button>
                        </form>

                        <p className="home-modal-footer">
                            Already have an account?{" "}
                            <span
                                className="home-login-link"
                                onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* LOGIN MODAL */}
            {showLogin && (
                <div className="home-modal-overlay" onClick={closeAll}>
                    <div className="home-modal" onClick={(e) => e.stopPropagation()}>

                        <button className="home-modal-close" onClick={closeAll}>×</button>

                        <h2>Login</h2>

                        <form onSubmit={handleLogin}>
                            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                            <button className="home-modal-btn">Login</button>
                        </form>

                        <p className="home-modal-footer">
                            Don’t have an account?{" "}
                            <span
                                className="home-login-link"
                                onClick={() => {
                                    setShowLogin(false);
                                    setShowRegister(true);
                                }}
                            >
                                Register
                            </span>
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;