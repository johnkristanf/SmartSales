import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Chart from "react-google-charts";
import { getForeCastData } from "../api/forecast";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar";

const queryClient = new QueryClient();

function GraphsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

            <>
                <NavBar />

                <div className="w-full flex flex-col justify-center items-center gap-20 mt-12">

                    <div className="flex flex-col items-center gap-8 w-full">
                        <h1 className="text-blue-950 text-6xl font-semibold text-center">
                            Smart Sales Forecast Graph
                        </h1>

                        <p className="font-semibold w-[70%]">
                            The sales forecasting analysis, utilizing the SARIMA model, offers strategic 
                            insights for business planning. By predicting future sales trends, businesses 
                            can optimize inventory levels, allocate resources efficiently, and tailor 
                            marketing strategies to anticipated demand. This forecast enables proactive 
                            decision-making, helping to mitigate risks, capitalize on growth opportunities, 
                            and maintain competitive advantage. Accurate sales predictions ensure better 
                            financial planning, improving overall operational efficiency and profitability.
                        </p>

                        <QueryClientProvider client={queryClient}>
                            <Forecast />
                        </QueryClientProvider>
                    </div>

                   

                    <SalesPerRegion />

                    <CitiesHighestSales />

                    <HighestProductsBought />

                    <SalesByCategory />

                    <SalesDiscount />


                </div>
            </>
           
    );
}

interface SalesData {
    date: string;
    sales: any;
}

function Forecast() {

    const [selectedYear, setSelectedYear] = useState<string>();
    const [forecastPeriods, setForecastPeriods] = useState<number>(12);
    const { data, error, isLoading } = useQuery({
        queryKey: ['forecastData', forecastPeriods],
        queryFn: () => getForeCastData(forecastPeriods)
    });

    if (isLoading){
        return <div className="text-3xl text-orange-600 font-bold">Forecasting may take a while please wait....</div>;

    } else if (error){
        return <div className="text-3xl font-bold text-red-800">Error: {error.message}</div>;
    } 

    const forecastData: SalesData[] = data?.data.forecast_data;
    const historicalData: SalesData[] = data?.data.historical_data;

    const chartData = [['Date', 'Sales', { role: 'style' }]];

    historicalData.forEach(({ date, sales }) => {
        const date_obj = new Date(date);
        const formattedDate = date_obj.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
        chartData.push([formattedDate, sales, 'blue']);
    });

    forecastData.forEach(({ date, sales }) => {
        const date_obj = new Date(date);
        const formattedDate = date_obj.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
        chartData.push([formattedDate, sales, 'red']);
    });

    const options = {
        hAxis: { title: 'Dates' },
        vAxis: { title: 'Sales' },
        legend: 'none',
       
    };

    const legend = [
        {label: "Past Sales", src: "/blue_linechart.png"},
        {label: "Forecast Future Sales", src: "/red_linechart.png"}
    ]

    console.log("forecastingPeriods", forecastPeriods)

    const handleForecastPeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        queryClient.invalidateQueries({
            queryKey: ['forecastData']
        })

        const selectedYears = parseInt(event.target.value);
        const selectedForecastPeriod = selectedYears * 12;

        setSelectedYear(event.target.value)
        setForecastPeriods(selectedForecastPeriod)
    };

    const githubLink = "https://github.com/johnkristanf/SmartSales"

    return (
        <div className="flex h-[35rem] w-full">

            <div className="w-full flex flex-col items-center justify-center">
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="100%"
                    data={chartData}
                    options={options}
                    className="relative pt-3"
                />

                <div className="flex gap-2 truncate mt-1">
                    <p>Github Link:</p>
                        <a target="blank" href={githubLink} className="text-blue-800 hover:underline">
                            { githubLink } 
                        </a>
                </div>
            </div>
 
           

            <div className="flex flex-col absolute right-5 mt-5 w-56">
                {
                    legend.map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                            <img src={item.src} width={30} height={30} />
                            <h1 className="font-semibold"> { item.label } </h1>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col absolute left-28 mt-3 w-56">
                <h1 className="font-semibold">
                    Select Forecast Period
                </h1>

                <select 
                    className="bg-gray-300 p-1 rounded-md focus:outline-none font-medium " 
                    onChange={handleForecastPeriodChange}
                    value={selectedYear}
                >
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                </select>

            </div>
        </div>
    );
}


function SalesPerRegion(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[45rem] gap-12 mt-10">

                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Sales by Region
                </h1>

                <p className="font-semibold w-[70%]">
                    This report examines regional sales data across 
                    North, South, East, and West regions to uncover trends and opportunities. 
                    It compares current performance with past periods, identifying growth
                    areas and challenges. Insights highlight regional preferences and market 
                    dynamics, providing actionable recommendations for optimizing strategies 
                    and resource allocation to improve business outcomes.
                </p>

                <div className="flex flex-col items-center">

                    <img src="/sales_region.png" />

                    <div className="flex gap-2 w-[90%] truncate mt-1">
                        <p>Tableau Link:</p>
                        <a target="blank" href={tableauLink} className="text-blue-800 hover:underline">
                            { tableauLink } 
                        </a>
                    </div>

                    
                </div>

            </div>
        </>
       
    )
}

function CitiesHighestSales(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[45rem] gap-12 mt-10">

                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Top 10 Cities with Highest Sales
                </h1>

                <p className="font-semibold w-[70%]">
                    Strategic decision-making was aided by the data analysis, 
                    which identified the top 10 cities with the largest sales. 
                    These cities include, but are not limited to, New York, Los 
                    Angeles, Chicago, Houston, and Phoenix. The report provides 
                    guidance for resource allocation and marketing initiatives 
                    aimed at optimizing revenue and market share in these important 
                    urban locations by highlighting regional demand trends and growth 
                    prospects.

                </p>

                <div className="flex flex-col items-center">

                    <img src="/city_highestSales.png" />

                    <div className="flex gap-2 w-[90%] truncate mt-1">
                        <p>Tableau Link:</p>
                        <a target="blank" href={tableauLink} className="text-blue-800 hover:underline">
                            { tableauLink } 
                        </a>
                    </div>

                </div>

            </div>
        </>
       
    )
}


function HighestProductsBought(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[35rem] gap-12 mt-10">

                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Customer Highest Products Bought
                </h1>

                <p className="font-semibold w-[70%]">
                    The data analysis identified the top 10 customers with the
                    highest number of products purchased. 
                    These key customers demonstrate significant buying behavior, 
                    indicating strong loyalty and potential for long-term revenue. 
                    By focusing on these high-value customers, businesses can tailor 
                    marketing strategies and enhance customer relationships, 
                    ultimately driving increased sales and customer retention.
                </p>

                <div className="flex flex-col items-center">

                    <img src="/highest_products.png" />

                    <div className="flex gap-2 w-[90%] truncate mt-1">
                        <p>Tableau Link:</p>
                        <a target="blank" href={tableauLink} className="text-blue-800 hover:underline">
                            { tableauLink } 
                        </a>
                    </div>

                </div>

            </div>
        </>
       
    )
}


function SalesByCategory(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[45rem] gap-12 mt-10">

                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Sales by Category
                </h1>

                <p className="font-semibold w-[70%]">
                    Sales were broken down by category by the data analysis, 
                    which showed which product categories were doing the best. 
                    Through this analysis, businesses may better identify which 
                    categories generate the most income, which in turn helps them 
                    focus on high-demand products, optimize inventory, and improve 
                    marketing efforts to increase overall sales and profitability.
                </p>

                <div className="flex flex-col items-center">

                    <img src="/sales_category.png" />

                    <div className="flex gap-2 w-[90%] truncate mt-1">
                        <p>Tableau Link:</p>
                        <a target="blank" href={tableauLink} className="text-blue-800 hover:underline">
                            { tableauLink } 
                        </a>
                    </div>

                </div>

            </div>
        </>
       
    )
}



function SalesDiscount(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[50rem] gap-12 mt-10">

                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Yearly Sales each year Discount
                </h1>

                <p className="font-semibold w-[70%]">
                    Yearly sales by discount count reveals the relationship between 
                    discount levels and sales volume. By examining how sales fluctuate with varying 
                    discount rates, businesses can better strategize their discount offerings to boost 
                    sales, enhance customer satisfaction, and improve overall profitability. 
                    This insight is crucial for refining pricing strategies and optimizing promotional 
                    efforts.
                </p>

                <div className="flex flex-col items-center">

                    <img src="/sales_discount.png" />

                    <div className="flex gap-2 w-[90%] truncate mt-1">
                        <p>Tableau Link:</p>
                        <a target="blank" href={tableauLink} className="text-blue-800 hover:underline">
                            { tableauLink } 
                        </a>
                    </div>

                </div>

            </div>
        </>
       
    )
}

export default GraphsPage;
