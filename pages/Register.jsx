import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
  const fireb = useFirebase();
  console.log(fireb);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  // useEffect(() => {
  //   if (fireb.isLoggedIn) {
  //     navigate("/log");
  //   }
  // }, [fireb, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fireb.signup(email, pass);
    console.log("result is ", res);
    navigate("/log");
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setpass(e.target.value)}
            value={pass}
            type="password"
            placeholder="Password(Minimum 6 characters)"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
