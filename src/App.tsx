import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Body } from "./Components/Body/Body";
import { Navbar as Header } from "./Components/Navbar/Navbar";
import { Form } from "./Components/Form/Form";

function App() {
  return (
    <>
      <Header
        styles={{ margin: "10px 7px", color: "orangered", fontSize: "22px" }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Body
              styles={{
                fontSize: "200px",
                color: "lightgray",
                cursor: "pointer",
              }}
            />
          }
        />
        <Route path="/products" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
