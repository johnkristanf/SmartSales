import { NavBar } from "../components/navbar"
import GraphsPage from "./GraphsPage"
import HomePage from "./HomePage"

function LandingPage(){
    return(

        <>
            <NavBar />
            <HomePage />

            <GraphsPage />
        </>
       
    )
}

export default LandingPage