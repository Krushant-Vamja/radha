import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import MoreReview from "./Components/MoreReview";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<MoreReview />} />
      </Routes>
    </>
  );
}

export default App;
