import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Whole } from "./spa/Whole";
import { Home } from "./pages/Home";
import { DigitRecognition } from "./pages/DigitRecognition";
import { About } from "./pages/About";
import { Math } from "./pages/Math";
import { LunarLander } from "./pages/LunarLander";

function App() {
	return (
		<BrowserRouter>
		<Routes>
				<Route path="/" element={<Whole />}>
				<Route index element={<Home />} />
				<Route path="home" element={<Home />} />
				<Route path="digitrecognition" element={<DigitRecognition />} />
				<Route path="lunarlander" element={<LunarLander />} />
				<Route path="math" element={<Math />} />
				<Route path="about" element={<About />} />
				<Route path="*" element={<Home />} />
			</Route>
		</Routes>
		</BrowserRouter>
	);
}

export default App;
