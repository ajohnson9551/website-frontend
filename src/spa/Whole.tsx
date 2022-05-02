import { Outlet } from "react-router-dom";
import { Top } from "./Top";

export const Whole = () => {
	return (
		<>
			<Top />
			<Outlet />
		</>
	)
};