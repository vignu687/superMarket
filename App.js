import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Loginpage from "./pages/Login";
import MyNabBar from "./components/NavBar";
import AddListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetail from "./pages/Detail";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <div className="App">
      <MyNabBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log" element={<Loginpage />} />
        <Route path="/reg" element={<RegisterPage />} />
        <Route path="/list" element={<AddListingPage />} />
        <Route path="/book/view/:bookID" element={<BookDetail />} />
        <Route path="/book/orders" element={<ViewOrder />} />
      </Routes>
    </div>
  );
}

export default App;
