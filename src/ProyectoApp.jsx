import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { AppTheme } from "./theme"


export const ProyectoApp = () => {
	return(
		<BrowserRouter>
			<AppTheme>
				<AppRouter />
			</AppTheme>
		</BrowserRouter>
	)
}
