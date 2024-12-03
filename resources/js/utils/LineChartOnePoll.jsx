import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
function LineChartOnePoll({
    chartData,
    titleReceived,
    votes,
    polls,
    votesSent,
    options,
    allVotesOnPoll,
    selectedPoll,
}) {
    // console.log("title in Line Chart");
    // console.log(titleReceived);
    // console.log(chartData);
    // console.log(votes);
    // console.log(polls);
    // console.log("votesSent");
    // console.log(votesSent);
    // console.log("options");
    // console.log(options);
    // console.log("polls");
    // console.log(polls);
    // console.log("allVotesOnPoll");
    // console.log(allVotesOnPoll);

    const [pollReceived, setPollReceived] = useState();
    const [newChartData, setNewChartData] = useState(chartData);

    useEffect(() => {
        setPollReceived(allVotesOnPoll);
    }, [votesSent, chartData["datasets"]]);

    // chartData['labels'] =

    let satisfactionArray = [
        "Insatisfait",
        "Plutôt Insatisfait",
        "Plutôt Satisfait",
        "Satisfait",
    ];

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

        // chartData["labels"] = votesLegend;
        chartData["labels"] = satisfactionArray;

        // chartData["datasets"][0].data = [1, 5, 2, 4];
        chartData["datasets"][0].label = allVotesOnPoll[0].poll_name;

        // chartData["datasets"][1].data = [7, 4, 3, 1];
        // chartData["datasets"][1].label = "Name2";
        // console.log(votesLegend);
        // console.log(chartData);
    };

    const getResultsInChart = () => {
        let arrayOfVotesCounts = [];
        let satisfactionArrayWithVotes = [];
        // allVotesOnPoll.map((dataOnPoll) => {
        //     console.log(dataOnPoll);
        //     satisfactionArray.map((subTitle) => {
        //         console.log(dataOnPoll.content);
        //         if (dataOnPoll.content === subTitle) {
        //             console.log(dataOnPoll.vote_count);
        //             arrayOfVotesCounts.push(dataOnPoll.vote_count);
        //         }
        //     });
        // });
        satisfactionArray.map((subTitle) => {
            // console.log(subTitle);
            allVotesOnPoll.map((dataOnPoll) => {
                if (dataOnPoll.content === subTitle) {
                    // console.log(dataOnPoll.vote_count);

                    arrayOfVotesCounts.push(dataOnPoll.vote_count);
                    satisfactionArrayWithVotes.push(
                        subTitle + "(" + dataOnPoll.vote_count + ")"
                    );
                }
            });
        });
        // allVotesOnPoll.map((dataOnPoll) => {
        //     console.log(dataOnPoll);
        // });

        // console.log(arrayOfVotesCounts);

        chartData["datasets"][0].data = arrayOfVotesCounts;

        chartData["labels"] = satisfactionArrayWithVotes;
    };

    useEffect(() => {
        console.log("useEffect on Line");
        console.log("chartData");
        console.log(chartData);
        getLabelsInChartData();
        getResultsInChart();
    }, [selectedPoll, chartData]);

    // getLabelsInChartData();
    // getResultsInChart();

    return (
        <div
            className="chart-container"
            style={{ width: "700px", height: "350px" }}
        >
            <h2 style={{ textAlign: "center" }}>{titleReceived}</h2>
            {/* <p>{chartData["datasets"][0].data.toString()}</p> */}
            <Line
                key={Math.random()}
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: allVotesOnPoll[0].poll_name,
                            // text: titleReceived,
                        },
                        legend: {
                            display: false,
                            // display: true,
                        },
                    },
                }}
            />
        </div>
    );
}
export default LineChartOnePoll;
