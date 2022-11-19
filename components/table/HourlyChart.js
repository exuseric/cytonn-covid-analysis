import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LogarithmicScale
);

const fetchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b427af1f07msha8033cbf7053452p11cd29jsnbe1e5d54fd05",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};
const HourlyChart = () => {
  const [countries, setCountries] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [country, setCountry] = useState("");

  const xAxis = chartData.map((d) => format(parseISO(d.time), "hh:mm a"));
  const yAxis = (set) => chartData.map((d) => d[set].total);
  console.log(yAxis("cases"));

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "cases",
        data: yAxis("cases"),
        fill: true,
        backgroundColor: "#3182ce",
        borderColor: "#3182ce",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "deaths",
        data: yAxis("deaths"),
        fill: false,
        backgroundColor: "#ff6b6b",
        borderColor: "#ff6b6b",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "tests",
        data: yAxis("tests"),
        fill: false,
        backgroundColor: "#ff922b",
        borderColor: "#ff922b",
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    type: "bar",
    elements: {
      line: {
        tension: 0,
        borderWidth: 1,
      },
      point: {
        radius: 5,
        hitRadius: 2,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        stacked: true,
        min: 10000,
        max: 1520000,
        ticks: {
          // forces step size to be 50 units
          stepSize: 10000,
        },
      },
    },
  };

  const deaths = {
    labels: xAxis,

    datasets: [
      {
        label: "deaths",
        data: yAxis("deaths"),
        fill: false,
        backgroundColor: "#ff6b6b",
        borderColor: "#ff6b6b",
      },
    ],
  };

  const getCountries = async () => {
    const res = await fetch(
      "https://covid-193.p.rapidapi.com/countries",
      fetchOptions
    );

    const { response } = await res.json();
    setCountries(response);
  };

  const getCountry = async () => {
    const res = await fetch(
      `https://covid-193.p.rapidapi.com/history?country=${country}`,
      fetchOptions
    );

    const { response } = await res.json();
    setChartData(response);

    console.log({ response });
  };

  useEffect(() => {
    getCountries();
  }, []);

  function handleCountry(e) {
    const s = e.target;
    const country = s.options[s.options.selectedIndex].value;
    setCountry(country);
    getCountry();
  }
  return (
    <div className="section">
      <header>
        <h2>Select Country</h2>
        <select name="countries" id="countries" onChange={handleCountry}>
          {countries.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </header>

      <Bar data={data} height={400} options={options} />
    </div>
  );
};
export default HourlyChart;
