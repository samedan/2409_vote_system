import { useCallback } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import { ResponsiveContainer, PieChart, Pie, LabelList } from "recharts";
import GuestLayout from "@/Layouts/GuestLayout";

// Source
// https://codesandbox.io/p/sandbox/epic-herschel-w6j7se?file=%2Fpackage.json%3A11%2C6-11%2C20

const data = [
    {
        name: "Cash",
        value: 6000,
        percentage: "18%",
        fill: "#3333FF",
    },
    {
        name: "Pension",
        value: 4000,
        percentage: "25%",
        fill: "#FF9933",
    },
    {
        name: "Real-state",
        value: 10000,
        percentage: "31%",
        fill: "#FF3333",
    },
    {
        name: "Business",
        value: 12000,
        percentage: "13%",
        fill: "#00FF00",
    },
];

const renderCustomizedLabelPercentage = (data, total = 32000) => {
    // console.log("Data", data);
    // console.log(data.value / total);
    // calculate percentage
    let percentageCalculated = (data.value / total) * 100;
    return percentageCalculated.toFixed(2).replace(".", ",").toString() + "%";
};
export default function Chart() {
    const renderLabel = useCallback((piePiece) => {
        return piePiece.name;
    }, []);

    return (
        <GuestLayout>
            <Box
                sx={{
                    // width: "100%",
                    // height: "100vh",
                    width: "350px",
                    height: "350px",
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
                            // activeShape={(props) => renderActiveShape(props, showSubchart)}
                            // onMouseEnter={onMouseOver}
                            // onMouseLeave={onMouseLeave}
                        >
                            <LabelList
                                dy={-3}
                                fill="white" // Percentage color
                                // dataKey="percentage"
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
        </GuestLayout>
    );
}
