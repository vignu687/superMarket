import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
const BookDetail = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);

  const [qty, setqty] = useState(1);
  console.log(data);
  useEffect(() => {
    firebase.getBookbyId(params.bookID).then((value) => setdata(value.data()));
  }, []);
  useEffect(() => {
    if (data) {
      const imgurl = data.imageURL;
      firebase.getImageURl(imgurl).then((url) => seturl(url));
    }
  }, [data]);
  const placeorder = async () => {
    const res = await firebase.placeOrder(params.bookID, qty);
    console.log(res);
  };
  if (data == null) return <h2>Loading .......</h2>;
  return (
    <div>
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} />
      <h2>Details</h2>
      <p>Price: Rs {data.price}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setqty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter quantity"
        />
      </Form.Group>
      <Button onClick={placeorder} variant="success">
        Buy Now
      </Button>
    </div>
  );
};
export default BookDetail;
