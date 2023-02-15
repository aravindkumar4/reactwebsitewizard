import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Createpost from "./screens/create/Createpost";
import Home from "./screens/home/Home";
import Postdetail from "./screens/postdetail/Postdetail";
import Editpost from "./screens/edit/Editpost";
import Themeswitch from "./components/switch/Themeswitch";
import { useThemeContext } from "./hooks/useThemeContext";
import "./App.css";
function App() {
  const { theme } = useThemeContext();
  return (
    <div className={`App ${theme}bg`}>
      <BrowserRouter>
        <Navbar />
        <Themeswitch /> <br />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Createpost />} />
            <Route path="/post/:id" element={<Postdetail />} />
            <Route path="edit/:id" element={<Editpost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
