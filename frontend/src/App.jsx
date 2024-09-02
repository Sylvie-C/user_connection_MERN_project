import { Provider } from "react-redux" ; 
import { store } from "./store" ; 
import { Outlet } from "react-router-dom" ; 
import Navbar from "./components/Navbar/Navbar" ; 

export default function App() {
	return (
		<>
			<Provider store={store}>
				<Navbar />
				<Outlet />
			</Provider>
		</>
	)
}
