import React, { useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useSelector } from "react-redux";

const chartSetting = {
    yAxis: [
      {
        label: '',
      },
    ],
    width: 1100,
    height: 600,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

const valueFormatter = (value) => `${value}`;


const Chart = () => {
  const { admin } = useSelector((state) => state)
  const dataset = admin.monthly_data
    // useEffect(() => {

    // }, admin.total_posts)

    return (
        <>
            {admin.monthly_data && (
                <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                    { dataKey: 'posts', label: "Bài Post", valueFormatter },
                    { dataKey: 'codeExercises', label: "Bài code", valueFormatter },
                    { dataKey: 'codeSubmissions', label: "Submit code", valueFormatter },
                ]}
                {...chartSetting}
                />
            )}
        </>
    );
}

export default Chart;
