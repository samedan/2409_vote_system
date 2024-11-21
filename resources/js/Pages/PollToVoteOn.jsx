import { useEffect, useState } from "react";
import Chart from "./Chart";
import ListAllPolls from "./ListAllPolls";

// const sentData = [
// {
//     name: "",
//     value: 0,
//     percentage: "",
//     fill: "#3333FF",
// },
// {
//     name: "Cash",
//     value: 6000,
//     percentage: "18%",
//     fill: "#3333FF",
// },
//         name: "Cash",
//         value: 6000,
//         percentage: "18%",
//         fill: "#3333FF",
//     },
//     {
//         name: "Pension",
//         value: 4000,
//         percentage: "25%",
//         fill: "#FF9933",
//     },
//     {
//         name: "Real-state",
//         value: 10000,
//         percentage: "31%",
//         fill: "#FF3333",
//     },
//     {
//         name: "Business",
//         value: 12000,
//         percentage: "13%",
//         fill: "#00FF00",
//     },
// ];

const colors = ["#3333FF", "#FF9933", "#FF3333", "#00FF00"];
const svgs = [
    "satisfait",
    "plutot-satisfait",
    "plutot-insatisfait",
    "insatisfait",
];
// let sentData = [];

export default function PollToVoteOn(props) {
    const { poll, votingClient } = props;

    console.log(poll);
    console.log(votingClient);
    const { options } = poll[0];
    // console.log(options[0]);

    const [sentData, setSentData] = useState([]);
    const [optionVoted, setOptionVoted] = useState(null);
    const [votedData, setVotedData] = useState(null);
    const [votedOption, setVotedOption] = useState(null);
    const [totalSent, setTotalSent] = useState(0);

    function vote(option_id, poll_id, option_name) {
        console.log("option_id, poll_id");

        console.log(option_id, poll_id);
        console.log("option_name");
        console.log(option_name);
        setVotedOption(option_name);
        //  async function fetchData() {
        //   try {
        //     const response = await fetch('https://api.example.com/data');
        //     if (!response.ok) {
        //       throw new Error('Network response was not ok');
        //     }
        //     const data = await response.json();
        //     console.log(data);
        //   } catch (error) {
        //     console.error('Fetch error:', error);
        //   }
        // }
        // fetchData();
        axios
            .post(`/polls/${option_id}`, [
                {
                    option: option_id,
                    poll: poll_id,
                    voting_client: 555,
                },
            ])
            .then(function (response) {
                setOptionVoted(response.data);
                createData(response.data);
                OptionVoted(response.data.option, response.data.votes_count);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function rechargeVotes() {
        // console.log("options");
        // setOptionVoted([null, null]);
    }

    function createData(res) {
        // console.log("poll");
        // console.log(poll);
        // console.log("res");
        // console.log(res);
        let total = 0;
        poll[0].options.map((option, i) => {
            const newOption = {};
            newOption.name = option.content;
            newOption.value = option.votes_count;
            newOption.percentage = "18%";
            newOption.fill = colors[i];
            total = total + option.votes_count;
            sentData.push(newOption);
        });
        console.log("sentData");
        console.log(sentData);
        console.log("total");
        console.log(total);
        setTotalSent(total);
        setVotedData(sentData);
    }

    useEffect(() => {
        rechargeVotes();
    }, [vote]);

    return (
        <>
            {
                // JSON.stringify(poll[0])
            }
            <div className="max-w-7xl mx-auto py-0">
                {/* <div className="max-w-7xl mx-auto py-1 flex">  Full Width */}
                <div className="max-w-4xl mx-auto_ sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-solid border-2 border-green-600">
                        {/* <div className="p-6 text-gray-900"> */}
                        <section className="grid-cols-8 relative isolate overflow-hidden bg-white px-6 py-2 sm:py-1 lg:px-6 ">
                            {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div> */}

                            <div
                                className={`mx-auto max-w-xl lg:max-w-2xl ${
                                    votedData ? "col-span-3" : ""
                                }`}
                            >
                                <div key={poll[0].id}>
                                    <blockquote
                                        className={`${
                                            votedData ? "hidden" : " "
                                        } text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9" `}
                                    >
                                        <p>{poll[0].title}</p>
                                    </blockquote>
                                    {/* <img
                                    src={"/images/satisfait.svg"}
                                    width={50}
                                    height={50}
                                    alt="mySvgImage"
                                /> */}
                                    <div className="flex justify-between">
                                        {/* before vote */}
                                        {!votedData &&
                                            poll[0].options.map((option, i) => (
                                                <button
                                                    className="waves-effect waves-light btn green lighten-0 min-w-40"
                                                    onClick={() =>
                                                        vote(
                                                            option.id,
                                                            poll[0].id,
                                                            option.content
                                                        )
                                                    }
                                                    key={option.id}
                                                >
                                                    <figcaption className="mt-2">
                                                        {
                                                            <img
                                                                src={`/images/${svgs[i]}.svg`}
                                                                width={50}
                                                                height={50}
                                                                className="mx-auto h-15 w-15 rounded-full"
                                                                alt={`{option.id}`}
                                                            />
                                                        }

                                                        <div className="mt-2 flex items-center justify-center space-x-3 text-base">
                                                            <div className="font-semibold text-gray-900">
                                                                {option.content}
                                                            </div>
                                                        </div>
                                                    </figcaption>

                                                    {/* {option.votes_count}
                                                {" - "} */}
                                                </button>
                                            ))}
                                        {/* after vote */}
                                        {votedData && (
                                            <div
                                                className="flex flex-col text-center"
                                                style={{
                                                    minHeight: "120px",
                                                    minWidth: "640px",
                                                }}
                                            >
                                                <p>&nbsp;</p>
                                                <p className="font-bold text-green-800">
                                                    {poll[0].title}
                                                </p>
                                                <p className="col-span-3 ">
                                                    Vous avez voté :{" "}
                                                    {votedOption && (
                                                        <strong>
                                                            {votedOption}
                                                        </strong>
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                        {/* {votedData && (
                                            <div className="max-w-3xl mx-auto col-span-5"> */}
                                        {/* <Chart data={votedData} totalReceived={total} /> */}
                                        {/* <Chart
                                                    data={votedData}
                                                    totalReceived={totalSent}
                                                /> */}
                                        {/* </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
