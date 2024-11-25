// Both table and chart
import { useGetFacebookPageInsightsQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import { MetricDisplayNames, MetricNames } from "./types";
import { format, parseISO } from "date-fns";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Insights({ facebookPage }: any) {
    const { data, isError, isLoading } = useGetFacebookPageInsightsQuery(facebookPage?.pageId as string);
    const insights = data?.data?.insights || [];

    if (isLoading) return <Loader />;
    if (!isLoading && isError) return <ErrorMessage message="Something went wrong." />;
    if (!isLoading && !isError && insights.length === 0)
        return <ErrorMessage message="Oops! Sorry! There are no insights available!" />;

    // Helper function to filter insights based on the period
    const filterInsightsByPeriod = (period: string) =>
        insights.filter((insight: any) => insight.period === period);

    // Extract daily, weekly, and 28 days insights
    const dailyInsights = filterInsightsByPeriod("day");
    const weeklyInsights = filterInsightsByPeriod("week");
    const monthlyInsights = filterInsightsByPeriod("days_28");

    // Helper function to extract one end_time from insights
    const extractOnlyOneEndTime = (insightsArray: any[]) => {
        for (let insight of insightsArray) {
            const endTime = insight?.values?.[insight.values.length - 1]?.end_time;
            if (endTime) {
                return endTime; // Return the first non-null end_time found
            }
        }
        return "N/A"; // If no end_time is found
    };

    // Extract one end time from daily insights (I can also choose weeklyInsights or monthlyInsights)
    const endTime = extractOnlyOneEndTime(dailyInsights);

    // Metrics to display in the new order
    const metricNames: MetricNames[] = [
        "page_impressions",
        "page_impressions_unique",
        "page_post_engagements",
        "page_views_total",
        "page_video_views",
        "page_fan_adds",
        "page_fan_removes",
    ];

    const metricDisplayNames: MetricDisplayNames = {
        "page_impressions": "Impressions",
        "page_impressions_unique": "Reach",
        "page_post_engagements": "Engagements",
        "page_views_total": "Views",
        "page_video_views": "Video Views",
        "page_fan_adds": "New Likes",
        "page_fan_removes": "Unlikes",
    };

    // Helper function to get the value of a specific metric for a given period
    const getMetricValue = (metricName: MetricNames, insightsArray: any[]) => {
        const insight = insightsArray.find(
            (insight: any) => insight.name === metricName
        );
        const lastValue = insight?.values?.[insight.values.length - 1]?.value || 0;
        return lastValue;
    };

    // Helper function to prepare chart data (using display names for labels)
    const prepareChartData = (insightsArray: any[]) => {
        const labels = insightsArray.map((insight) =>
            metricDisplayNames[insight.name as keyof MetricDisplayNames] || insight.title || insight.name
        );
        const values = insightsArray.map((insight) => insight.values[insight.values.length - 1]?.value || 0);

        return {
            labels,
            datasets: [
                {
                    label: "Total",
                    data: values,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    // Options for Bar Chart
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Facebook Page Insights",
            },
        },
    };

    // Prepare chart data for daily, weekly, and monthly insights
    const dailyChartData = prepareChartData(dailyInsights);
    const weeklyChartData = prepareChartData(weeklyInsights);
    const monthlyChartData = prepareChartData(monthlyInsights);

    return (
        <div className="flex flex-col items-center">
            {/* Table for Insights */}
            <div className="bg-white w-full max-w-[1000px] p-6 rounded-lg shadow mb-10">
                <h2 className="text-xl font-semibold text-center pb-6">Page Insights Table</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">Period</th>
                                {metricNames.map((metric) => (
                                    <th key={metric} className="px-4 py-2 text-center font-medium text-gray-700">
                                        {metricDisplayNames[metric]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Daily Insights Row */}
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Daily</td>
                                {metricNames.map((metric) => (
                                    <td key={`daily-${metric}`} className="px-4 py-2 text-center">
                                        {getMetricValue(metric, dailyInsights)}
                                    </td>
                                ))}
                            </tr>

                            {/* Weekly Insights Row */}
                            <tr className="border-b">
                                <td className="px-4 py-2 font-semibold">Weekly</td>
                                {metricNames.map((metric) => (
                                    <td key={`weekly-${metric}`} className="px-4 py-2 text-center">
                                        {getMetricValue(metric, weeklyInsights)}
                                    </td>
                                ))}
                            </tr>

                            {/* 28 Days Insights Row */}
                            <tr>
                                <td className="px-4 py-2 font-semibold">28 Days</td>
                                {metricNames.map((metric) => (
                                    <td key={`monthly-${metric}`} className="px-4 py-2 text-center">
                                        {getMetricValue(metric, monthlyInsights)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-xs text-gray-500 italic pt-6">Last Count: {format(parseISO(endTime), 'MMM d, yyyy - h:mm:ss a')}</p>
            </div>

            {/* Daily Insights Chart */}
            <div className="bg-white w-full max-w-[1000px] p-6 rounded-lg shadow mb-10">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-center text-blue-500">Daily Page Insights Chart</h2>
                    {dailyInsights.length > 0 ? (
                        <Bar data={dailyChartData} options={chartOptions} />
                    ) : (
                        <p className="text-gray-500">No daily insights available.</p>
                    )}
                </div>
                <p className="text-center text-xs text-gray-500 italic">Last Count {new Date(endTime).toLocaleString()}</p>
            </div>

            {/* Weekly Insights Chart */}
            <div className="bg-white w-full max-w-[1000px] p-6 rounded-lg shadow mb-10">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-center text-blue-500">Weekly Page Insights Chart</h2>
                    {weeklyInsights.length > 0 ? (
                        <Bar data={weeklyChartData} options={chartOptions} />
                    ) : (
                        <p className="text-gray-500">No weekly insights available.</p>
                    )}
                </div>
                <p className="text-center text-xs text-gray-500 italic">Last Count {new Date(endTime).toLocaleString()}</p>
            </div>

            {/* 28 Days Insights Chart */}
            <div className="bg-white w-full max-w-[1000px] p-6 rounded-lg shadow">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-center text-blue-500">28 Days Page Insights Chart</h2>
                    {monthlyInsights.length > 0 ? (
                        <Bar data={monthlyChartData} options={chartOptions} />
                    ) : (
                        <p className="text-gray-500">No 28 days insights available.</p>
                    )}
                </div>
                <p className="text-center text-xs text-gray-500 italic">Last Count {new Date(endTime).toLocaleString()}</p>
            </div>
        </div>
    );
}



// // Only table
// import { useGetFacebookPageInsightsQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Loader from "../loader/Loader";
// import { MetricDisplayNames, MetricNames } from "./types";

// export default function Insights({ facebookPage }: any) {
//     const { data, isError, isLoading } = useGetFacebookPageInsightsQuery(facebookPage?.pageId as string);

//     const insights = data?.data?.insights || [];

//     if (isLoading) return <Loader />;
//     if (!isLoading && isError) return <ErrorMessage message="Something went wrong." />;
//     if (!isLoading && !isError && insights.length === 0)
//         return <ErrorMessage message="Oops! Sorry! There are no insights available!" />;

//     // Helper function to filter insights based on the period
//     const filterInsightsByPeriod = (period: string) =>
//         insights.filter((insight: any) => insight.period === period);

//     // Extract daily, weekly, and 28 days insights
//     const dailyInsights = filterInsightsByPeriod("day");
//     const weeklyInsights = filterInsightsByPeriod("week");
//     const monthlyInsights = filterInsightsByPeriod("days_28");

//     // Metrics to display in the new order
//     const metricNames: MetricNames[] = [
//         "page_impressions",
//         "page_impressions_unique",
//         "page_post_engagements",
//         "page_views_total",
//         "page_video_views",
//         "page_fan_adds",
//         "page_fan_removes",
//     ];

//     const metricDisplayNames: MetricDisplayNames = {
//         "page_impressions": "Impressions",
//         "page_impressions_unique": "Reach",
//         "page_post_engagements": "Engagements",
//         "page_views_total": "Views",
//         "page_video_views": "Video Views",
//         "page_fan_adds": "New Likes",
//         "page_fan_removes": "Unlikes",
//     };

//     // Helper function to get the value of a specific metric for a given period
//     const getMetricValue = (metricName: MetricNames, insightsArray: any[]) => {
//         const insight = insightsArray.find(
//             (insight: any) => insight.name === metricName
//         );
//         const lastValue = insight?.values?.[insight.values.length - 1]?.value || 0;
//         return lastValue;
//     };

//     return (
//         <div className="flex justify-center px-6">
//             <div className="bg-white w-full max-w-[1000px] p-6 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold text-center pb-6">Page Insights Table</h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border rounded-lg shadow-sm">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="px-4 py-2 text-left font-medium text-gray-700">Period</th>
//                                 {metricNames.map((metric) => (
//                                     <th key={metric} className="px-4 py-2 text-center font-medium text-gray-700">
//                                         {metricDisplayNames[metric]}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Daily Insights Row */}
//                             <tr className="border-b">
//                                 <td className="px-4 py-2 font-semibold">Daily</td>
//                                 {metricNames.map((metric) => (
//                                     <td key={`daily-${metric}`} className="px-4 py-2 text-center">
//                                         {getMetricValue(metric, dailyInsights)}
//                                     </td>
//                                 ))}
//                             </tr>

//                             {/* Weekly Insights Row */}
//                             <tr className="border-b">
//                                 <td className="px-4 py-2 font-semibold">Weekly</td>
//                                 {metricNames.map((metric) => (
//                                     <td key={`weekly-${metric}`} className="px-4 py-2 text-center">
//                                         {getMetricValue(metric, weeklyInsights)}
//                                     </td>
//                                 ))}
//                             </tr>

//                             {/* 28 Days Insights Row */}
//                             <tr>
//                                 <td className="px-4 py-2 font-semibold">28 Days</td>
//                                 {metricNames.map((metric) => (
//                                     <td key={`monthly-${metric}`} className="px-4 py-2 text-center">
//                                         {getMetricValue(metric, monthlyInsights)}
//                                     </td>
//                                 ))}
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }




// // Normal insights data
// import { useGetFacebookPageInsightsQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Loader from "../loader/Loader";

// export default function Insights({ facebookPage }: any) {
//     const { data, isError, isLoading } = useGetFacebookPageInsightsQuery(facebookPage?.pageId as string);

//     const insights = data?.data?.insights || [];

//     console.log(insights)

//     if (isLoading) return <Loader />;
//     if (!isLoading && isError) return <ErrorMessage message="Something went wrong." />;
//     if (!isLoading && !isError && insights.length === 0)
//         return <ErrorMessage message="Oops! Sorry! There are no insights available!" />;

//     // Helper function to filter insights based on the period
//     const filterInsightsByPeriod = (period: string) =>
//         insights.filter((insight: any) => insight.period === period);

//     // Extract daily, weekly, and 28 days insights
//     const dailyInsights = filterInsightsByPeriod("day").filter((insight: any) => insight.name !== "page_fans"); // Exclude "page_fans" for daily insights
//     const weeklyInsights = filterInsightsByPeriod("week");
//     const monthlyInsights = filterInsightsByPeriod("days_28");

//     // Helper function to render insights
//     const renderInsights = (insightsArray: any[]) => {
//         return insightsArray.map((insight) => {
//             const lastValue = insight.values[insight.values.length - 1]?.value || 0;
//             const endTime = insight.values[insight.values.length - 1]?.end_time || "N/A";

//             return (
//                 <div key={insight.id} className="flex justify-between items-center py-3 border-b">
//                     <div>
//                         <h4 className="font-semibold">{insight.title || insight.name}</h4>
//                         <p className="text-xs text-gray-500">End Time: {new Date(endTime).toLocaleString()}</p>
//                     </div>
//                     <div>
//                         <p className=" font-medium">{lastValue}</p>
//                     </div>
//                 </div>
//             );
//         });
//     };

//     return (
//         <div className="flex justify-center">
//             <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow">
//                 {/* Daily Insights */}
//                 <div className="mb-6">
//                     <h2 className="text-xl font-semibold text-center py-4 text-blue-500">Daily Insights</h2>
//                     {dailyInsights.length > 0 ? (
//                         renderInsights(dailyInsights)
//                     ) : (
//                         <p className="text-gray-500">No daily insights available.</p>
//                     )}
//                 </div>

//                 {/* Weekly Insights */}
//                 <div className="mb-6">
//                     <h2 className="text-xl font-semibold text-center py-4 text-blue-500">Weekly Insights</h2>
//                     {weeklyInsights.length > 0 ? (
//                         renderInsights(weeklyInsights)
//                     ) : (
//                         <p className="text-gray-500">No weekly insights available.</p>
//                     )}
//                 </div>

//                 {/* 28 Days Insights */}
//                 <div>
//                     <h2 className="text-xl font-semibold text-center py-4 text-blue-500">28 Days Insights</h2>
//                     {monthlyInsights.length > 0 ? (
//                         renderInsights(monthlyInsights)
//                     ) : (
//                         <p className="text-gray-500">No 28 days insights available.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }