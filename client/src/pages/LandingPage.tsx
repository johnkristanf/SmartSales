import { Link } from "react-router-dom"
import { NavBar } from "../components/navbar"
import DataAnalysisSteps from "./DAsteps"
import HomePage from "./HomePage"

function LandingPage(){
    return(

        <>
            <NavBar />
            
            <HomePage />

            <DataAnalysisSteps />

            <ProcessToGraphs />
        </>
       
    )
}

function ProcessToGraphs(){
    return(
        <div className="w-full flex justify-center gap-3 pb-10">
            <Link
                to="/smartsales/graphs"
                className="flex items-center gap-2 hover:opacity-75 hover:cursor-pointer"
            >

                <h1 className="font-semibold text-blue-950 text-4xl">Procced to Graphs</h1>
                <img src="/arrow_right.png" width={40} height={40} />

            </Link>
        </div>
    )
}

export default LandingPage