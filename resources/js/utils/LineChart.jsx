import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({
    chartData,
    titleReceived,
    votes,
    polls,
    votesSent,
    options,
}) {
    // console.log("title in Line Chart");
    // console.log(titleReceived);
    // console.log(chartData);
    // console.log(votes);
    // console.log(polls);
    console.log("votesSent");
    console.log(votesSent);
    console.log("options");
    console.log(options);
    console.log("polls");
    console.log(polls);

    // chartData['labels'] =

    const getLabelsInChartData = () => {
        let votesLegend = [];

        var index = 0;
        for (const key in votesSent) {
            if (votesSent.hasOwnProperty(key)) {
                // console.log(`Index: ${index}, ${key}: ${votesSent[key]}`);
                // console.log(index);
                votesLegend.push(key.substring(0, 10));
                // console.log(key.substring(0, 10));
                // console.log(votesSent[key]);
                index++;
            }
        }

        chartData["labels"] = votesLegend;

        chartData["datasets"][0].data = [1, 5, 2, 4, 2];
        // console.log(votesLegend);
        // console.log(chartData);
    };

    getLabelsInChartData();

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
