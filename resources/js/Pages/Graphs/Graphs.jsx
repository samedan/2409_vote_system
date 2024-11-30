// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/Data";
// import "./styles.css";
import { Pie } from "react-chartjs-2";
import LineChart from "@/utils/LineChart";
import { useEffect } from "react";

Chart.register(CategoryScale);

export default function Graphs({ votes, polls }) {
    const [title, setTitle] = useState("");

    // console.log("votes", votes);
    // console.log("polls", polls);
    console.log("title");
    console.log(title);

    // getAllPolls Number
    function getAllPolls() {
        const allPolls = [];
        if (votes) {
            votes.map((vote) => {
                // console.log(vote.poll_id);
                if (!allPolls.includes(vote.poll_id)) {
                    allPolls.push(vote.poll_id);
                }
            });
        }
        return allPolls;
    }

    // get one Poll all Data
    function getOnePollAllData(x) {
        let onePollData = [];
        onePollData = votes.filter((vote) => {
            return vote.poll_id == x;
        });

        // setTitle(onePollData.)
        return onePollData;
    }

    // return Poll Title & Stuff
    function getPollTitle(x) {
        let titleOfPoll = polls.filter((poll) => poll.id == x);

        return titleOfPoll.title;
    }

    useEffect(() => {
        // console.log("allPolls");

        // console.log(getAllPolls());

        console.log("getOnePollAllData(8)");
        getOnePollAllData(8);
        getPollTitle(8);
    }, []);
    useEffect(() => {
        // console.log("allPolls");

        // console.log(getAllPolls());
        setTitle(getPollTitle(8));
    }, [title]);

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    // &quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    return (
        <>
            {/* <Head title="All Polls" /> */}
            {/* {JSON.stringify(polls)} */}
            <div
                className=" w-full flex  h-screen pt-2 justify-center items-center_"
                style={{ height: "100vh !important" }}
            >
                <div className="max-w-[1110px] max-h-[540px] bg-white border-red-300 rounded-2xl overflow-y-auto">
                    <div className="py-1 grid grid-cols-12 max-h-[540px] max-w-[1110px]">
                        <div className="flex h-screen_ col-span-2">
                            <div className="m-auto items-center justify-center ml-2">
                                <p>Using Chart.js in React</p>
                                {/* <Pie
                                    data={chartData}
                                    options={{
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: "Users Gained between 2016-2020",
                                            },
                                        },
                                    }}
                                /> */}
                                {title !== "" && (
                                    <LineChart
                                        chartData={chartData}
                                        titleReceived={title}
                                    />
                                )}
                                {/* <LineChart chartData={chartData} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
