// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/Data";
// import "./styles.css";
import { Pie } from "react-chartjs-2";
import LineChart from "@/utils/LineChart";
import LineChartOnePoll from "@/utils/LineChartOnePoll";
import { useEffect } from "react";

Chart.register(CategoryScale);

export default function Graphs({ votes, polls, options, selectedPoll }) {
    const [title, setTitle] = useState("");
    const [votesSent, setVotesSent] = useState();
    // const [selectedPoll, setSelectedPoll] = useState(selectedPollId);
    const [receivedPolls, setPollReceived] = useState(polls);
    const [loading, setLoading] = useState(false);

    console.log("selectedPoll on Grapnhs", selectedPoll);
    // console.log("votes", votes);
    // console.log("polls", polls);

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

    function getDaysCountAndData() {
        let data = [];
        let dataFinal = [];
        let labels = [];
        votes.map((vote) => {
            if (!data.includes(vote.created_at.substring(0, 10))) {
                // data.push(vote.created_at.substring(0, 9));
                if (!labels.includes(vote.created_at.substring(0, 10))) {
                    labels.push(vote.created_at.substring(0, 10));
                }
            }
            // data.push(vote.created_at);
        });
        let i = 0;
        let j = 0;
        // console.log(votes.length);
        // console.log(labels.length);

        var obj2 = {};

        while (j < labels.length) {
            // console.log("j", j);

            var name2 = j;
            obj2[labels[j]] = {};

            data.push(labels[j]);
            // console.log(data[j]); // Calendar days

            // OBJECT
            // var obj = {};
            // var name = "name";
            // var val = 2;
            // obj[name] = val;
            // console.log(obj);
            // END OBJECT

            // pollsAndOptions.push("date", labels[j], []);
            // console.log(pollsAndOptions[labels[j]]);

            // while (i < votes.length) {
            // for (i = 0; i <= votes.length; i++) {
            //     // console.log("i", votes[i].created_at.substring(0, 10));
            //     // if (votes[i].created_at.substring(0, 10) == "2024-10-22") {
            //     // console.log("data[j]");
            //     // console.log(data[j]);
            //     // console.log(votes[i]);

            //     if (votes[i].created_at.substring(0, 10) === data[j]) {
            //         if (
            //             !data[j].includes(votes[i].created_at.substring(0, 10))
            //         ) {
            //             // console.log(votes[i].created_at.substring(0, 9));

            //             // pollsAndOptions.push({
            //             //     poll_id: votes[i].poll_id,
            //             //     option_id: votes[i].option_id,
            //             // });
            //             pollsAndOptions.push({
            //                 poll_id: 1,
            //                 option_id: 2,
            //             });
            //         }
            //         // }
            //     }

            //     i++;
            //     obj2[data[j]] = pollsAndOptions;
            //     pollsAndOptions = [];
            //     // data[j] = [data[j], [pollsAndOptions]];
            // }
            // obj2[data[j]] = pollsAndOptions;
            // obj2[labels[j]] = pollsAndOptions;
            // console.log(pollsAndOptions);
            // data[j].push(pollsAndOptions);
            // console.log(data[j]);
            dataFinal.push([data[j]]);

            // obj2[data[j]] = pollsAndOptions;
            j++;
        }
        // console.log(dataFinal);

        let finalObject = {};
        for (const key of Object.entries(obj2)) {
            finalObject[key] = getDataFromEachDay(key);
            // console.log(getDataFromEachDay(key));

            // console.log(`${key}: ${value}`);
        }
        // console.log(finalObject);
        // console.log(obj2);
        setVotesSent(finalObject);
    }

    // get Each day with its votes
    const getDataFromEachDay = (dayDate) => {
        // console.log(dayDate[0]);

        let arrayEachDay = [];
        votes.map((vote) => {
            if (vote.created_at.substring(0, 10) === dayDate[0]) {
                // console.log("yes");

                arrayEachDay.push([vote.poll_id, vote.option_id]);
            }
            // }
        });
        return countDuplicatesInArray(arrayEachDay);
        // return arrayEachDay;
    };

    // count number of duplicates in one day
    const countDuplicatesInArray = (arrayEachDay) => {
        const counts = {};
        // const sampleArray = ['a', 'a', 'b', 'c'];
        arrayEachDay.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        // console.log(counts);
        return counts;
    };

    // return Poll Title & Stuff
    function getPollTitle(selectedPoll) {
        let titleOfPoll = polls.filter((poll) => poll.id == selectedPoll);

        return titleOfPoll.title;
    }

    // Transform in numbers
    const setVotesInNumbers = (options, selectedPoll) => {
        console.log(receivedPolls);
        console.log("selectedPoll");
        console.log(selectedPoll);

        let noteEachVote = [];
        let noteValue = {
            Satisfait: 4,
            "Plutôt Satisfait": 3,
            "Plutôt Insatisfait": 2,
            Insatisfait: 1,
        };

        // const pollsIds = {
        //     { "idPoll": 7, id: 5 },
        //     { idPoll: 5, id: 3 },
        //     { idPoll: 5, id: 4 },
        //     { idPoll: 8, id: 6 },
        // };

        for (const [key, value] of Object.entries(polls)) {
            // console.log(`${value["id"]}`);
            if (value["id"] === selectedPoll) {
                console.log("value");
                console.log(value);
            }
            // console.log(`${key}: ${value}`);
        }
        // setLoading(true);
        let foundPoll = polls.find((element) => element.id == selectedPoll);
        console.log("foundPoll");
        console.log(foundPoll);

        if (foundPoll) {
            console.log("if foundPoll");
            console.log(foundPoll);
            options.map((option) => {
                // console.log("[option.poll_id]");
                // console.log(option.poll_id);
                // console.log("selectedPoll");
                // console.log(selectedPoll);
                if (option.poll_id == selectedPoll) {
                    // console.log("true found");
                    // console.log(option.votes_count);
                    noteEachVote.push({
                        poll_name: foundPoll.title,
                        content: option.content,
                        // note: noteValue[option.content],
                        vote_count: option.votes_count,
                        // value_vote_count:
                        //     option.votes_count * noteValue[option.content],
                        poll_id: option.poll_id,
                    });
                }
            });
            // console.log("noteEachVote");
            // console.log(noteEachVote);
        } else {
            console.log("loading");
        }

        return noteEachVote;
    };

    // setVotesInNumbers(options, 8);

    useEffect(() => {
        // console.log("allPolls");

        console.log("selectedPoll on useEffect");
        console.log(selectedPoll);

        setVotesInNumbers(options, selectedPoll);
    }, [selectedPoll]);

    useEffect(() => {
        // console.log("allPolls");

        // console.log(getAllPolls());
        getDaysCountAndData();
        // console.log("getOnePollAllData(8)");
        getOnePollAllData(selectedPoll);
        getPollTitle(selectedPoll);
        setTitle(getPollTitle(selectedPoll));
    }, []);

    // useEffect(() => {
    //     // console.log("allPolls");

    //     // console.log(getAllPolls());
    //     setTitle(getPollTitle(selectedPoll));
    // }, [title]);

    const [chartData, setChartData] = useState({
        // labels: Data.map((data) => data.year),
        labels: [],
        datasets: [
            {
                label: "Initial data",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
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
            {/* <div className="max-w-[1110px]  bg-white border-red-300 rounded-2xl overflow-y-auto">
                {selectedPoll}
                <form method="post">
                    <select
                        onChange={(e) => setSelectedPoll(e.target.value)}
                        value={selectedPoll}
                    >
                        <option value={7}>
                            L'écoute de la part du professionnel de santé
                        </option>
                        <option value={8}>
                            Les explications fournies autour de votre traitement
                        </option>
                        <option value={5}>Le délai d'attente</option>
                        <option value={6}>L'accueil par notre équipe</option>
                    </select>
                </form>
            </div> */}

            <div
                className=" w-full flex  h-screen pt-2 justify-center items-center_"
                // style={{ height: "100vh !important" }}
            >
                <div className="max-w-[1110px]  bg-white border-red-300 rounded-2xl overflow-y-auto">
                    {/* <div className="py-1 grid grid-cols-12 max-h-[540px] max-w-[1110px]"> */}
                    <div className="py-1 grid grid-cols-12  max-w-[1110px]">
                        <div className="flex h-screen_ col-span-2">
                            <div className="m-auto items-center justify-center ml-2">
                                {/* <p>Using Chart.js in React</p> */}
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
                                {/* {title !== "" && (
                                    <LineChart
                                        chartData={chartData}
                                        titleReceived={title}
                                        votes={votes}
                                        polls={polls}
                                        votesSent={votesSent}
                                        options={options}
                                    />
                                )} */}
                                {/* <LineChart chartData={chartData} /> */}
                            </div>
                            <div className="m-auto items-center justify-center ml-2">
                                {/* <p>Poll id = 8</p> */}
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

                                {
                                    <LineChartOnePoll
                                        // chartData={chartData}
                                        chartData={chartData}
                                        allVotesOnPoll={setVotesInNumbers(
                                            options,
                                            selectedPoll
                                        )}
                                        titleReceived={title}
                                        votes={votes}
                                        polls={polls}
                                        votesSent={votesSent}
                                        options={options}
                                        selectedPoll={selectedPoll}
                                    />
                                }

                                {/* <LineChart chartData={chartData} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
