import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Phone from "./pages/phone/Phone";
import Color from "./pages/color/Color";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-screen font-sans">
        <nav className="w-60 bg-[#427DC0] p-6 shadow-md text-white">
          <h2 className="text-2xl font-bold mb-6">LOGO</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/"
                className="hover:bg-amber-50 hover:text-[#427DC0] py-2 px-4 rounded transition-all"
              >
                Create Phone
              </Link>
            </li>
            <li>
              <Link
                to="/phone"
                className="hover:bg-white hover:text-[#427DC0] py-2 px-4 rounded transition-all"
              >
                Phone
              </Link>
            </li>
            <li>
              <Link
                to="/color"
                className="hover:bg-white hover:text-[#427DC0] py-2 px-4 rounded transition-all"
              >
                Color
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-1 p-8 bg-[#F4F6FA]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phone" element={<Phone />} />
            <Route path="/color" element={<Color />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
