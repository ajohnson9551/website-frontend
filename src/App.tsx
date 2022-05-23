import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Whole } from "./spa/Whole";
import { WelcomePage } from "./pages/WelcomePage";
import { DigitRecognitionPage } from "./pages/DigitRecognitionPage";
import { ContactPage } from "./pages/ContactPage";
import { MathPage } from "./pages/MathPage";
import { LunarLanderPage } from "./pages/LunarLanderPage";
import { CryptographyPage } from "./pages/CryptographyPage";
import { LunarLanderGame } from "./mechanics/lunarlander/LunarLanderGame";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
	const game = new LunarLanderGame();

	return (
		<BrowserRouter>
		<Routes>
				<Route path="/" element={<Whole />}>
				<Route index element={<WelcomePage />} />
				<Route path="welcome" element={<WelcomePage />} />
				<Route path="digitrecognition" element={<DigitRecognitionPage />} />
				<Route path="lunarlander" element={<LunarLanderPage game={game}/>} />
				<Route path="cryptography" element={<CryptographyPage />} />
				<Route path="math" element={<MathPage />} />
				<Route path="contact" element={<ContactPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Route>
		</Routes>
		</BrowserRouter>
	);
}

export default App;
