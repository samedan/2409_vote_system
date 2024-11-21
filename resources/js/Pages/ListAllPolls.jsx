import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PollToVoteOn from "./PollToVoteOn";

export default function ListAllPolls({ polls, props }) {
    const [optionVoted, setOptionVoted] = useState([null, null]);
    const [votingClientX, setVotingClient] = useState("");

    function vote(option_id, poll_id) {
        // console.log(option);
        axios
            .post(`/polls/${option_id}`, [
                {
                    option: option_id,
                    poll: poll_id,
                },
            ])
            .then(function (response) {
                console.log(response.data);
                setOptionVoted([
                    response.data.option,
                    response.data.votes_count,
                ]);
                // {option: 7, votes_count: 9}
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function rechargeVotes() {
        console.log("options");
    }

    function votingClient() {
        const votingClient = Math.floor(100000 + Math.random() * 900000);
        return votingClient;
    }

    useEffect(() => {
        setVotingClient(votingClient());
    }, []);

    return (
        <>
            {/* <Head title="All Polls" /> */}
            {/* {JSON.stringify(polls)} */}
            <div
                className=" w-full flex  h-screen pt-2 justify-center items-center_"
                style={{ height: "100vh !important" }}
            >
                <div className="max-w-[1110px] max-h-[540px] bg-white border-red-300 rounded-2xl overflow-y-auto">
                    <div className="py-1 grid grid-cols-8 max-h-[540px] max-w-[1110px]">
                        <div className="flex h-screen_ col-span-1">
                            <button
                                onClick={() => window.location.reload(false)}
                                className="m-auto flex h-20 w-20 items-center justify-center rounded-md bg-blue-600 text-center text-white font-bold"
                            >
                                Recharger <br />
                                le formulaire
                            </button>
                        </div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 col-span-7">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className=" text-gray-900">
                                    {polls &&
                                        polls.map((poll) => (
                                            <PollToVoteOn
                                                poll={[poll]}
                                                key={poll.id}
                                                votingClient={votingClientX}
                                                cur="cur"
                                                // time={new Date(
                                                //     8.64e15
                                                // ).toString()}
                                            />
                                            // <Link
                                            //     key={poll.id}
                                            //     href={`/polls/${poll.id}`}
                                            // >
                                            //     <h1>{poll.title}</h1>

                                            //     <br />
                                            // </Link>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
