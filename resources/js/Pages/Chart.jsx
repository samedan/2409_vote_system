import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import { ResponsiveContainer, PieChart, Pie, LabelList } from "recharts";
import GuestLayout from "@/Layouts/GuestLayout";

// Source
// https://codesandbox.io/p/sandbox/epic-herschel-w6j7se?file=%2Fpackage.json%3A11%2C6-11%2C20

// const data = [
//     {
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

let total = 55;

export default function Chart(votedData, totalReceived) {
    console.log("votedData on chart");
    console.log(votedData);

    const data = votedData.data;

    // console.log("totalReceived");
    // console.log(votedData.totalReceived);
    // const totalReceived = votedData.totalReceived;
    const [totalCalculated, setTotalCalculated] = useState(0);

    useEffect(() => {
        setTotalCalculated(votedData.totalReceived);
    }, []);

    const renderCustomizedLabelPercentage = (data, total) => {
        // console.log("Data", data);
        // console.log(data.value / total);
        // calculate percentage
        // console.log("data.value in function");
        // console.log(data);
        // console.log("totalreceived in function");
        // console.log(totalCalculated);

        let percentageCalculated = (data.value / votedData.totalReceived) * 100;
        // console.log("percentageCalculated");
        // console.log(percentageCalculated);

        return (
            percentageCalculated.toFixed(2).replace(".", ",").toString() + "%"
            // +
            // " (" +
            // data.value +
            // ")"
        );
    };

    const renderLabel = useCallback((piePiece) => {
        return piePiece.name;
    }, []);

    return (
        <>
            <Box
                sx={{
                    // width: "100%",
                    // height: "100vh",
                    width: "450px",
                    height: "142px",
                }}
            >
                <ResponsiveContainer>
                    <PieChart style={{ cursor: "pointer" }}>
                        <Pie
                            dataKey="value"
                            data={data}
                            label={renderLabel}
                            cx="50%"
                            cy="50%"
                            outerRadius={"75%"}
                            nameKey="name"
                            // activeShape={(props) =>
                            //     renderActiveShape(props, showSubchart)
                            // }
                            // onMouseEnter={onMouseOver}
                            // onMouseLeave={onMouseLeave}
                        >
                            <LabelList
                                dy={-3}
                                fill="white" // Percentage color
                                dataKey={renderCustomizedLabelPercentage}
                                position="inside"
                                angle="0"
                                stroke="none" // Border of letters
                                className="label-percentage"
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
