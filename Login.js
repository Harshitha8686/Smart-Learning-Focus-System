import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailRegex.test(email)) {
        alert("Invalid Email Format! Use lowercase letters only.");
        return;
    }

    setLoading(true);

    try {

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.text();

        if (result === "SUCCESS") {
            navigate("/dashboard");
        } else {
            alert("Invalid Credentials");
        }

    } catch (error) {
        alert("Backend not running!");
    }

    setLoading(false);
};
  

  return(

<div className="login-page">

<div className="left-panel">

<h1> 
  <span className="title-icon">🚀</span>
  Smart Learning Focus System</h1>

<p>

Stay Focused.
Learn Smarter.
Achieve More.

</p>

<div className="feature">
  <span className="title-icon">📚</span>
  AI Study Planner
</div>

<div className="feature">
  <span className="title-icon">🎯</span>
 Focus Tracking
</div>

<div className="feature">
  <span className="title-icon">📊</span>
 Live Analytics
</div>

<div className="feature">
<span className="title-icon">🤖</span>
 AI Face Detection
</div>
</div>

<div className="right-panel">

<div className="login-card">
  <h2>
  Welcome Back 
  <span className="title-icon">👋</span>
</h2>
<p>Login to continue</p>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type={showPassword?"text":"password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<div className="show-password-container">
  <label className="show-password-label">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
    />
    <span>Show Password</span>
  </label>
</div>

<button onClick={handleLogin}>

{loading ? "Logging in..." : "Login"}

</button>

<p className="register-text">
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

</div>

</div>

  );

}

export default Login;