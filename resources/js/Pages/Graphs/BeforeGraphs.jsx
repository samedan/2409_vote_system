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
import Graphs from "./Graphs";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "react-router-dom";

export default function BeforeGraphs({ votes, polls, options }) {
    const [selectedPoll, setSelectedPoll] = useState(8);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // console.log("allPolls");

        console.log("selectedPoll on useEffect");
        console.log(selectedPoll);
        document.title = `You clicked ${count} times`;
    }, [selectedPoll, count]);

    const incrementCounter = () => {
        setCount(count + 1);
    };

    return (
        <div
            className=" w-full flex  h-screen_ pt-0 justify-center items-center flex-col"
            // style={{ height: "100vh !important" }}
        >
            {/* <Head title="All Polls" /> */}
            {/* {JSON.stringify(polls)} */}
            <header>
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <NavLink href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </NavLink>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Avis client Pharmacie
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("poll.create")}
                                        active={route().current("poll.create")}
                                    >
                                        Ajouter une question
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("poll.index")}
                                        active={route().current("poll.index")}
                                    >
                                        Voir les questions
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        // href={route("poll.index")}
                                        href={"/graphs/all-votes"}
                                        // active={route().current("poll.index")}
                                        style={{
                                            color: "green",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Voir les Résultats
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="max-w-[1110px]  bg-white border-red-300 rounded-2xl overflow-y-auto mt-10">
                    {/* {selectedPoll} */}
                    {/* <p>You clicked {count} times</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={incrementCounter}
                >
                    Increment
                </button> */}
                    <h1 style={{ color: "green", fontWeight: "bold" }}>
                        Choisissez entre les questions suivantes (2024/09 -
                        2024/12):
                    </h1>
                    <form method="post">
                        <select
                            onChange={(e) => {
                                setSelectedPoll(e.target.value);
                                incrementCounter();
                            }}
                            value={selectedPoll}
                        >
                            <option value={7}>
                                L'écoute de la part du professionnel de santé
                            </option>
                            <option value={8}>
                                Les explications fournies autour de votre
                                traitement
                            </option>
                            <option value={5}>Le délai d'attente</option>
                            <option value={6}>
                                L'accueil par notre équipe
                            </option>
                        </select>
                    </form>
                    {/* <p>{selectedPoll}</p> */}
                    {selectedPoll && (
                        <Graphs
                            votes={votes}
                            polls={polls}
                            options={options}
                            selectedPoll={selectedPoll}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
