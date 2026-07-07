import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailRegex.test(form.email)) {
        alert("Invalid Email Format! Use lowercase letters only.");
        return;
    }

    fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    })
   
    .then((res) => res.text())
    .then(() => {
      alert("Registration Successful!");
      navigate("/");
    })
    .catch(() => {
      alert("Registration Failed");
    });
};

  
return (
  <div className="register-page">

    {/* Left Side */}
    <div className="register-left">
      

      </div>
       <div className="register-right">
      <div className="register-card">

        <h1>Create Account</h1>
        <p>Start your Smart Learning Journey.</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/"> Login</Link>
        </div>

      </div>
    </div>

    {/* Right Side */}
    

        
      
  </div>
);
}

export default Register;