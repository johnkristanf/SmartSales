import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { getForeCastData } from "../api/forecast";
import Chart from "react-google-charts";

function GraphsPage(){

    const queryClient = new QueryClient()

    return (
        <div className="w-full flex justify-center h-[50rem]" id="graphs">

            <div className="w-[75%] flex flex-col gap-28">
                <h1 className="text-blue-950 text-6xl font-semibold text-center">
                    Smart Sales Forecast Graph
                </h1>
            </div>

            <QueryClientProvider client={queryClient}>
                <Forecast />
            </QueryClientProvider>

        </div>
    )
}

function Forecast(){
    const forecastPeriods = 24

    const { data, error, isLoading } = useQuery({
        queryKey: ['forecastData', forecastPeriods],
        queryFn: () => getForeCastData(forecastPeriods)
    });

    console.log("data query", data)

    const forecastData = data?.data

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // const chartData = [['Date', 'Forecast']];
    // Object.entries(forecastData).forEach(([date, value]) => {
    //     chartData.push([new Date(date), value]);
    // });

    const options = {
        title: 'Sales Forecast',
        hAxis: { title: 'Date' },
        vAxis: { title: 'Sales' },
        legend: 'none',
    };

    return(
        <div>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                // data={chartData}
                options={options}
            />
        </div>
    )
}

export default GraphsPage