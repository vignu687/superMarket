import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const fireb = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   if (fireb.isLoggedIn && handleSubmit == true) {
  //     navigate("/");
  //   }
  // }, [fireb, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fireb.SignInUser(email, password);
      console.log("User signed in successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await fireb.signinwithgoogle();
      console.log("User signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <h2 className="mt-5 mb-5">OR</h2>
        <Button onClick={handleGoogleSignIn} variant="danger">
          Sign In With Google
        </Button>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Loginpage;
