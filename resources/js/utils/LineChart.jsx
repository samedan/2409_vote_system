import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData, titleReceived }) {
    console.log("title in Line Chart");
    console.log(titleReceived);

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{titleReceived}</h2>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            // text: "Users Gained between 2016-2020",
                            text: titleReceived,
                        },
                        legend: {
                            // display: false,
                            display: true,
                        },
                    },
                }}
            />
        </div>
    );
}
export default LineChart;
