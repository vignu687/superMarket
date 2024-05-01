import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setURL] = useState(null);
  useEffect(() => {
    firebase.getImageURl(props.imageURL).then((url) => setURL(url));
  }, []);
  return (
    <Card style={{ width: "18rem", margin: "25px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title{props.name} and this book is sold by{" "}
          {props.displayName} and price of this book is {props.price}
        </Card.Text>
        <Button
          onClick={(e) => navigate(`/book/view/${props.id}`)}
          variant="primary"
        >
          view
        </Button>
      </Card.Body>
    </Card>
  );
};
export default BookCard;
