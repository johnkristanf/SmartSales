
function DataAnalysisSteps(){
    return (

        <div className="w-full flex justify-center h-[145rem]">

            <div className="w-[75%] flex flex-col gap-24">

                <BusinessProblem />
                <BusinessObjective />
                <BusinessQuestions />
                <BusinessObjectiveSteps />
                <BusinessObjectiveImpact />
            </div>

        </div>
       
    )
}


function BusinessProblem(){
    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-blue-950 text-6xl font-semibold text-center">
                Business Problem Statement
            </h1>
                
            <h1 className="font-semibold text-justify">
                Accurately projecting future sales and deriving actionable 
                insights from data are frequent issues faced by businesses. 
                The intricacy and seasonality of sales patterns may be too 
                complex for traditional approaches to fully capture, which 
                could result in ineffective resource allocation and lost 
                opportunities. Creating a strong forecasting model and a set 
                of visuals that work together to give a thorough insight of
                past and future sales performance is the difficult part of
                the job.
            </h1>
        </div>
    )
}

function BusinessObjective(){
    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-blue-950 text-6xl font-semibold text-center">
                Smart Sales's Objective
            </h1>

            <h1 className="font-semibold text-justify">
                The main objective of this project is to create an extensive 
                online application that uses historical sales data to estimate 
                future sales and provide insightful business information via 
                sophisticated visualizations. <b>The monthly profit</b>, <b>the year sales</b>, 
                <b>the top 10 clients by product purchases</b>, <b>the highest-selling areas</b>, 
                and <b>the top-10 cities</b> will all be included in these insights. 
                The purpose of this program is to assist firms 
                in improving overall strategy planning, budgeting successfully, inventory management optimization, and decision-making.
            </h1>
        </div>
    )
}



function BusinessQuestions(){
    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-blue-950 text-6xl font-semibold text-center">
                Objective based Questions
            </h1>

            <h1 className="font-semibold text-justify">
                1. What are the key patterns and trends in the historical sales data?<br />
                    <div className="ml-5">• Understanding the underlying patterns, trends, and seasonality in historical data to build an effective forecasting model.</div> <br />

                2. Which forecasting model best captures the patterns in the sales data?<br />
                    <div className="ml-5">
                        • Evaluating different forecasting models (such as ARIMA, SARIMA, and other time series models) to determine which provides the most accurate and reliable forecasts.
                    </div> <br />


                3. How can we visualize sales data and forecasts in a way that is easily interpretable for stakeholders?<br />
                    <div className="ml-5">
                        • Developing visualizations that clearly communicate past sales performance and future sales projections, including monthly profit, yearly sales, and more.
                    </div> <br />


                4. What are the top business insights that can be derived from the sales data?<br />
                    <div className="ml-5">
                        • Identifying key insights such as top 10 customers by product purchases, regions with highest sales, and top 10 cities with highest sales.
                    </div> <br />


                5. How do external factors (such as holidays, promotions, and economic conditions) impact sales, and can they be incorporated into the forecasting model?<br />
                    <div className="ml-5">
                        • Assessing the impact of external factors on sales and exploring methods to integrate these variables into the forecasting model to improve accuracy.
                    </div> <br />

            </h1>
        </div>
    )
}


function BusinessObjectiveSteps(){
    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-blue-950 text-6xl font-semibold text-center">
                Data Analysis Steps
            </h1>

            <h1 className="font-semibold text-justify">
                • Data Collection and Preprocessing:<br />
                    <div className="ml-5">• Gathering historical sales data using SQL and converting it to CSV, cleaning, and preprocessing it for analysis. </div> <br />

                • Exploratory Data Analysis (EDA):<br />
                    <div className="ml-5">• Conducting EDA to identify patterns, trends, outliers, and key business insights. </div> <br />

                • Model Selection and Evaluation:<br />
                    <div className="ml-5">• Evaluating different time series forecasting models and selecting the best-performing one. </div> <br />

                • Forecasting:<br />
                    <div className="ml-5">•Using the selected model to forecast future sales. </div> <br />

                • Business Insights Visualization:<br />
                    <div className="ml-5">• Creating visualizations to present monthly profit, yearly sales, top 10 customers, regions with highest sales, and top 10 cities with highest sales using Tableau. </div> <br />

                • Deployment:<br />
                    <div className="ml-5">• Implementing the forecasting model and visualizations in a web application using Flask and React. </div> <br />

            </h1>
        </div>
    )
}



function BusinessObjectiveImpact(){
    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-blue-950 text-6xl font-semibold text-center">
                Business Impact
            </h1>

            <h1 className="font-semibold text-justify">
                • Improved Inventory Management:<br />
                    <div className="ml-5">• Reducing overstock and stockouts, thus saving costs and optimizing storage. </div> <br />

                • Enhanced Budgeting and Planning:<br />
                    <div className="ml-5">• Facilitating better financial planning and resource allocation. </div> <br />

                • Informed Strategic Decisions:<br />
                    <div className="ml-5">• Enabling data-driven decision-making, leading to increased profitability and growth. </div> <br />

                • Increased Customer Understanding:<br />
                    <div className="ml-5">• Identifying top customers and their purchasing behavior, allowing for targeted marketing and improved customer relationships. </div> <br />


            </h1>
        </div>
    )
}




export default DataAnalysisSteps