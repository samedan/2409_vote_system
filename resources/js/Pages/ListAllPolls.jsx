import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PollToVoteOn from "./PollToVoteOn";
import { useIdleTimer } from "react-idle-timer";
import Modal from "react-modal";

export default function ListAllPolls({ polls, props }) {
    const [optionVoted, setOptionVoted] = useState([null, null]);
    const [votingClientX, setVotingClient] = useState("");
    const [votingDateX, setVotingDate] = useState(null);
    const [votesCount, setVotesCount] = useState(0);

    const data_from_child = (data) => {
        setVotesCount(votesCount + 1); // or set the data to a state
        // find array index
        // pollsArray = polls.splice(poll => poll.id === data);
        // votesCount + 1;
        // console.log("votesCount", votesCount);
        setRemaining(60);
    };

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
                // console.log(response.data);
                setOptionVoted([
                    response.data.option,
                    response.data.votes_count,
                ]);
                // {option: 7, votes_count: 9}
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
    // function rechargeVotes() {
    //     console.log("options");
    // }

    function votingClient() {
        const votingClient = Math.floor(100000 + Math.random() * 900000);
        return votingClient;
    }
    function votingDate() {
        var timestamp = new Date().getTime();
        var formattedDate = timestamp.format("Y-m-d H:i:s");
        // const votingDate = Date.now();
        return formattedDate;
    }

    useEffect(() => {
        setVotingClient(votingClient());
    }, []);

    // Idle timer
    const [state, setState] = useState("Active");
    const [count, setCount] = useState(0);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [remaining, setRemaining] = useState(1);
    const onIdle = () => {
        setState("Idle");
    };
    const onActive = () => {
        setState("Active");
    };
    const onAction = () => {
        setCount(count + 1);
    };
    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 180_000,
        throttle: 500,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("setRemaining");
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        // return () => {
        //     // console.log("clearInterval");
        //     clearInterval(interval);
        // };
    });
    // END Idle timer

    // Modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    // Modal.setAppElement("#yourAppElement");
    Modal.setAppElement(document.getElementById("yourAppElement"));
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function closeModal() {
        // setRemaining(50);
        setIsOpen(false);
    }
    const [modalContent, setModalContent] = useState();
    // END Modal

    // Modal Thanks
    const customThanksStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    // Modal.setAppElement("#yourAppElement");
    Modal.setAppElement(document.getElementById("yourThanksElement"));
    // let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    // const [modalContent, setModalContent] = useState();
    // END Modal

    // console.log(remaining);
    useEffect(() => {
        // console.log("remaining", remaining);

        if (remaining === 50) {
            openModal();
        }
        // if (remaining10 === 10) {

        // }
        if (remaining === 0) {
            // console.log("Go home");
            goHome();
        }
    }, [remaining]);

    // useEffect(() => {
    //     if (votesCount === 2) {
    //         openModal();
    //     }
    // }, [votesCount]);

    function goHome() {
        // navigate("/");
        window.location.replace(
            "https://bilan-sante.pharmacie-en-couleurs-eragny.com/"
        );
    }

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
                                Veuillez compléter le formulaire pour nous
                                partager votre expérience
                                <button
                                    // onClick={() => window.location.reload(false)}
                                    // onClick={() => window.location.reload(false)}
                                    onClick={() => goHome()}
                                    className="m-auto mt-2 flex h-20 w-20 items-center justify-center rounded-md bg-blue-600 text-center text-white font-bold"
                                >
                                    Revenir à l'accueil
                                </button>
                            </div>
                        </div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 col-span-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className=" text-gray-900">
                                    {polls &&
                                        polls.map((poll, i) => (
                                            <PollToVoteOn
                                                poll={[poll]}
                                                key={poll.id}
                                                votingClient={votingClientX}
                                                votingDate={votingDateX}
                                                setter={data_from_child}

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
            {/* MODAL */}
            <div id="yourAppElement">
                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    // className="items-center"
                >
                    <h2>
                        {" "}
                        <span className="text-2xl font-bold">
                            Vous êtes toujours là ?
                        </span>
                    </h2>

                    <div className="w-80 flex flex-col items-center  border-t-4 border-green-500">
                        <div className="mb-2 mt-3">
                            <button
                                color="green"
                                onClick={closeModal}
                                className="w-60 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {" "}
                                <span className="text-xl">
                                    Cliquez ici pour continuer à donner votre
                                    avis
                                </span>
                            </button>
                        </div>

                        <div className="text-2xl font-bold">
                            Sinon vous allez perdre vos résultats et l'enquete
                            va redémarrer en {remaining} secondes.
                        </div>

                        <button
                            color="red"
                            onClick={() => goHome()}
                            className="mt-3 w-60 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="text-xl">Revenir au debut</span>
                            {/* <ExclamationTriangleIcon className="h-6 w-6 ml-2" /> */}
                        </button>
                    </div>

                    {/* <>
                        <form>
                            <input />
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button>
                        </form>
                    </> */}
                </Modal>
            </div>
            {/* END MODAL */}

            {/* MODAL THANKS*/}
            {votesCount === 4 && (
                <div id="yourThanksElement">
                    {/* <button onClick={openModal}>Open Modal</button> */}
                    <Modal
                        isOpen={true}
                        // isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        style={customThanksStyles}
                        contentLabel="Thanks Modal"
                    >
                        <h2>
                            {" "}
                            <span className="text-2xl font-bold">
                                Nous vous remercions <br /> pour votre avis.{" "}
                                <br />
                            </span>
                        </h2>

                        <div className="w-80 flex flex-col items-center  border-t-4 border-green-500">
                            <div className="text-2xl  items-center">
                                Votre avis nous est précieux afin de nous aider
                                à fournir un support de grande qualité et une
                                satisfaction client irréprochable.
                            </div>

                            <button
                                color="red"
                                onClick={() => goHome()}
                                className="mt-3 w-60 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="text-xl">
                                    Revenir à l'accueil ({remaining})
                                </span>
                                {/* <ExclamationTriangleIcon className="h-6 w-6 ml-2" /> */}
                            </button>
                        </div>

                        {/* <>
                        <form>
                            <input />
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button>
                        </form>
                    </> */}
                    </Modal>
                </div>
            )}
            {/* END MODAL THANKS*/}
        </>
    );
}
