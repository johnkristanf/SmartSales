import { NavBar } from "../components/navbar"
import DataAnalysisSteps from "./DAsteps"
import GraphsPage from "./GraphsPage"
import HomePage from "./HomePage"

function LandingPage(){
    return(

        <>
            <NavBar />
            
            <HomePage />

            <DataAnalysisSteps />

            <GraphsPage />
        </>
       
    )
}

export default LandingPage