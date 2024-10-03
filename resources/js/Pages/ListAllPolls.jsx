import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PollToVoteOn from "./PollToVoteOn";

export default function ListAllPolls({ polls }) {
    // console.log(polls);

    const [optionVoted, setOptionVoted] = useState([null, null]);

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

    // useEffect(() => {
    //     rechargeVotes();
    // }, [vote]);

    return (
        <>
            {/* <Head title="All Polls" /> */}
            {/* {JSON.stringify(polls)} */}
            <div className="py-1 grid grid-cols-8">
                <div className="flex h-screen col-span-1">
                    <button
                        onClick={() => window.location.reload(false)}
                        className="m-auto flex h-20 w-20 items-center justify-center rounded-md bg-blue-600 text-center text-white font-bold"
                    >
                        Recharger <br />
                        le <br />
                        formulaire
                    </button>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 col-span-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">
                            {polls &&
                                polls.map((poll) => (
                                    <PollToVoteOn poll={[poll]} key={poll.id} />
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
        </>
    );
}
