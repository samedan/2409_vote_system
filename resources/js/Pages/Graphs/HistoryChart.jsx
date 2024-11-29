import React, { useRef, useEffect, useState } from "react";
// import { Chartjs } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// import { historyOptions } from "../chartConfigs/chartConfigs";
import { historyOptions } from "./chartConfigs";

const HistoryChart = ({ data }) => {
    const chartRef = useRef();
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("24h");

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };
    const determineColorFormat = () => {
        switch (timeFormat) {
            case "24h":
                return "rgba(13, 110, 253, 0.5)";
            case "7d":
                return "rgba(174, 305, 194, 0.5)";
            case "1y":
                return "rgba(255, 193, 7, 0.5)";
            default:
                return "rgba(13, 110, 253, 0.5)";
        }
    };

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {
            const chartInstance = new Chartjs(chartRef.current, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: `${detail.name} price`,
                            data: determineTimeFormat(),
                            backgroundColor: determineColorFormat(),
                            borderColor: "rgba(174, 305, 194, 0.4",
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    ...historyOptions,
                },
            });
        }
    });

    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <p className="my-0">${detail.current_price.toFixed(2)}</p>
                    <p
                        className={
                            detail.price_change_24h < 0
                                ? "text-danger my-0"
                                : "text-success my-0"
                        }
                    >
                        {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </>
            );
        }
    };
    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>
                <Doughnut />
            </div>
            <div>{renderPrice()}</div>
            <div>
                <canvas
                    ref={chartRef}
                    id="myChart"
                    width={250}
                    height={250}
                ></canvas>
            </div>

            <div className="chart-button mt-1">
                <button
                    onClick={() => setTimeFormat("24h")}
                    className="btn btn-outline-secondary btn-sm text-white"
                    style={{ backgroundColor: "rgba(13, 110, 253, 0.5)" }}
                >
                    24h
                </button>
                <button
                    onClick={() => setTimeFormat("7d")}
                    className="btn btn-outline-secondary btn-sm mx-1 "
                    style={{ backgroundColor: "rgba(174, 305, 194, 0.5)" }}
                >
                    7d
                </button>
                <button
                    onClick={() => setTimeFormat("1y")}
                    className="btn btn-outline-secondary btn-sm"
                    style={{ backgroundColor: "rgba(255, 193, 7, 0.5)" }}
                >
                    1y
                </button>
            </div>
        </div>
    );
};

export default HistoryChart;
