import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const AddListingPage = () => {
  const firebase = useFirebase();
  const [name, setname] = useState("");
  const [isbnNum, seisbnNum] = useState("");
  const [price, setprice] = useState("");
  const [coverpic, setcoverpic] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.hadleCreatenewListing(name, isbnNum, price, coverpic);
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => seisbnNum(e.target.value)}
            value={isbnNum}
            type="text"
            placeholder="enter the isbn number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setprice(e.target.value)}
            value={price}
            type="text"
            placeholder="enter the price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>coverPic</Form.Label>
          <Form.Control
            onChange={(e) => setcoverpic(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default AddListingPage;
