import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Home from "./Routes/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
