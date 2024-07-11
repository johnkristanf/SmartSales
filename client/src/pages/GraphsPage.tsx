import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Chart from "react-google-charts";
import { getForeCastData } from "../api/forecast";
import { useState } from "react";

const queryClient = new QueryClient();

function GraphsPage() {
    return (
        <div className="w-full flex items-start justify-center h-[120rem]" id="graphs">

            <div className="w-full flex flex-col justify-center gap-8">
                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Smart Sales Forecast Graph
                </h1>
                <QueryClientProvider client={queryClient}>
                    <Forecast />
                </QueryClientProvider>

                <SalesPerRegion />


            </div>
        </div>
    );
}

interface SalesData {
    date: string;
    sales: number;
}

function Forecast() {

    const [forecastPeriods, setForecastPeriods] = useState<number>(12);
    const { data, error, isLoading } = useQuery({
        queryKey: ['forecastData', forecastPeriods],
        queryFn: () => getForeCastData(forecastPeriods)
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const forecastData: SalesData[] = data?.data.forecast_data;
    const historicalData: SalesData[] = data?.data.historical_data;

    // Prepare data for the chart
    const chartData = [['Date', 'Sales', { role: 'style' }]];

    // Format historical data
    historicalData.forEach(({ date, sales }) => {
        const date_obj = new Date(date);
        const formattedDate = date_obj.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
        chartData.push([formattedDate, sales, 'blue']);
    });

    // Format forecast data
    forecastData.forEach(({ date, sales }) => {
        const date_obj = new Date(date);
        const formattedDate = date_obj.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
        chartData.push([formattedDate, sales, 'red']);
    });

    const options = {
        hAxis: { title: 'Date' },
        vAxis: { title: 'Sales' },
        legend: 'none',
       
    };

    const legend = [
        {label: "Past Sales", src: "/blue_linechart.png"},
        {label: "Predicted Future Sales", src: "/red_linechart.png"}
    ]

    const handleForecastPeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        queryClient.invalidateQueries({
            queryKey: ['forecastData']
        })

        const selectedYears = parseInt(event.target.value);
        const selectedForecastPeriod = selectedYears * 12;

        setForecastPeriods(selectedForecastPeriod)
    };

    return (
        <div className="flex h-[35rem]">

            <Chart
                chartType="LineChart"
                width="100%"
                height="100%"
                data={chartData}
                options={options}
                className="relative pt-3"
            />

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
                >
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                </select>

            </div>
        </div>
    );
}


function SalesPerRegion(){

    const tableauLink = "https://public.tableau.com/app/profile/john.kristan.torremocha/viz/SmartSalesDashboard/Dashboard1?publish=yes"

    return(

        <>
        
            <div className="flex flex-col items-center h-[30rem] gap-5 mt-10">

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

                    <p className="flex gap-2 w-[90%] truncate mt-1">
                        Tableau Link: 
                        <a href={tableauLink}>
                            <p className="text-blue-800 hover:opacity-75"> 
                                { tableauLink } 
                            </p>
                        </a>
                    </p>

                </div>

            </div>
        </>
       
    )
}

export default GraphsPage;
