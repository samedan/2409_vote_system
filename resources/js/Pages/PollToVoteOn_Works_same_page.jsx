import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import ListAllPolls from "./ListAllPolls";

const sentData = [
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
];

const colors = ["#3333FF", "#FF9933", "#FF3333", "#00FF00"];
const svgs = [
    "satisfait",
    "plutot-satisfait",
    "plutot-insatisfait",
    "insatisfait",
];

let total = 0;

export default function PollToVoteOn({ poll }) {
    // console.log(poll);

    const { options } = poll[0];
    // console.log(options[0]);

    const [optionVoted, setOptionVoted] = useState(null);
    const [votedData, setVotedData] = useState(null);
    const [votedOption, setVotedOption] = useState(null);

    function vote(option_id, poll_id, option_name) {
        console.log("option_id, poll_id");
        console.log(option_id, poll_id);
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
                },
            ])
            .then(function (response) {
                // console.log("response.data");
                // console.log(response.data);

                setOptionVoted(response.data);
                createData(response.data);
                // console.log(optionVoted["option"]);

                // {option: 7, votes_count: 9}
                // setOptionVoted(response.data.option, response.data.votes_count);
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
        console.log("poll");
        console.log(poll);
        console.log("res");
        console.log(res);

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
        console.log(total);
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
            <div className="max-w-7xl mx-auto py-12 flex">
                <div className="max-w-4xl mx-auto_ sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-solid border-2 border-green-600">
                        {/* <div className="p-6 text-gray-900"> */}
                        <section className="relative isolate overflow-hidden bg-white px-6 py-2 sm:py-2 lg:px-8 ">
                            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
                            <div className="mx-auto max-w-xl lg:max-w-2xl">
                                <div key={poll[0].id}>
                                    <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
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
                                            <p>
                                                Vous avez voté :{" "}
                                                {votedOption && (
                                                    <strong>
                                                        {votedOption}
                                                    </strong>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto_">
                    {votedData && (
                        <>
                            <Chart data={votedData} totalReceived={total} />
                            <ListAllPolls />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
