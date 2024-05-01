import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const ViewOrder = () => {
  const firebase = useFirebase();
  useEffect(() => {
    firebase.fetchMyOrders();
  }, []);
  return <div>view</div>;
};
export default ViewOrder;
