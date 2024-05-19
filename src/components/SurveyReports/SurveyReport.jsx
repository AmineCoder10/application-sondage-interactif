// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { useParams } from "react-router-dom";

// // Register the required Chart.js elements and the datalabels plugin
// Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const SurveyReport = () => {
//   const { surveyId } = useParams();
//   const [genderData, setGenderData] = useState(null);
//   const [ageData, setAgeData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/Answers?surveyId=${surveyId}`
//         );
//         const answers = response.data;

//         const genderCount = { Male: 0, Female: 0 };
//         const ageCount = {
//           "-18": 0,
//           "18-25": 0,
//           "25-35": 0,
//           "35-45": 0,
//           "45+": 0,
//         };

//         answers.forEach((answer) => {
//           if (answer.gender) genderCount[answer.gender]++;
//           if (answer.age) ageCount[answer.age]++;
//         });

//         const genderTotal = genderCount.Male + genderCount.Female;
//         const ageTotal = Object.values(ageCount).reduce(
//           (sum, count) => sum + count,
//           0
//         );

//         setGenderData({
//           labels: ["Male", "Female"],
//           datasets: [
//             {
//               data: [genderCount.Male, genderCount.Female],
//               backgroundColor: ["#36A2EB", "#FF6384"],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage =
//                   ((value / genderTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });

//         setAgeData({
//           labels: ["-18", "18-25", "25-35", "35-45", "45+"],
//           datasets: [
//             {
//               data: [
//                 ageCount["-18"],
//                 ageCount["18-25"],
//                 ageCount["25-35"],
//                 ageCount["35-45"],
//                 ageCount["45+"],
//               ],
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//                 "#9966FF",
//               ],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage = ((value / ageTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching survey data:", error);
//       }
//     };

//     fetchData();
//   }, [surveyId]);

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//       },
//       datalabels: {
//         color: "white",
//         font: {
//           weight: "bold",
//         },
//       },
//     },
//   };

//   const chartContainerStyle = {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     marginTop: "20px",
//   };

//   const chartStyle = {
//     width: "500px",
//     height: "500px",
//     margin: "0 50px",
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Survey Report</h2>
//       {genderData && ageData ? (
//         <div style={chartContainerStyle}>
//           <div style={chartStyle}>
//             <h3>Gender Distribution</h3>
//             <Pie data={genderData} options={options} />
//           </div>
//           <div style={chartStyle}>
//             <h3>Age Distribution</h3>
//             <Pie data={ageData} options={options} />
//           </div>
//         </div>
//       ) : (
//         <p>Loading report data...</p>
//       )}
//     </div>
//   );
// };

// export default SurveyReport;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { useParams } from "react-router-dom";

// // Register the required Chart.js elements and the datalabels plugin
// Chart.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartDataLabels,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// const SurveyReport = () => {
//   const { surveyId } = useParams();
//   const [genderData, setGenderData] = useState(null);
//   const [ageData, setAgeData] = useState(null);
//   const [questionData, setQuestionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/Answers?surveyId=${surveyId}`
//         );
//         const answers = response.data;

//         const genderCount = { Male: 0, Female: 0 };
//         const ageCount = {
//           "-18": 0,
//           "18-25": 0,
//           "25-35": 0,
//           "35-45": 0,
//           "45+": 0,
//         };
//         const questionCount = {};

//         answers.forEach((answer) => {
//           // Gender and age counts
//           if (answer.gender) genderCount[answer.gender]++;
//           if (answer.age) ageCount[answer.age]++;

//           // Question counts
//           if (Array.isArray(answer.responses)) {
//             answer.responses.forEach((response) => {
//               if (!questionCount[response.questionId]) {
//                 questionCount[response.questionId] = {};
//               }
//               if (!questionCount[response.questionId][response.option]) {
//                 questionCount[response.questionId][response.option] = 0;
//               }
//               questionCount[response.questionId][response.option]++;
//             });
//           }
//         });

//         const genderTotal = genderCount.Male + genderCount.Female;
//         const ageTotal = Object.values(ageCount).reduce(
//           (sum, count) => sum + count,
//           0
//         );

//         setGenderData({
//           labels: ["Male", "Female"],
//           datasets: [
//             {
//               data: [genderCount.Male, genderCount.Female],
//               backgroundColor: ["#36A2EB", "#FF6384"],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage =
//                   ((value / genderTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });

//         setAgeData({
//           labels: ["-18", "18-25", "25-35", "35-45", "45+"],
//           datasets: [
//             {
//               data: [
//                 ageCount["-18"],
//                 ageCount["18-25"],
//                 ageCount["25-35"],
//                 ageCount["35-45"],
//                 ageCount["45+"],
//               ],
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//                 "#9966FF",
//               ],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage = ((value / ageTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });

//         const questionDataArr = Object.entries(questionCount).map(
//           ([questionId, options]) => {
//             const totalResponses = Object.values(options).reduce(
//               (sum, count) => sum + count,
//               0
//             );
//             return {
//               questionId,
//               data: {
//                 labels: Object.keys(options),
//                 datasets: [
//                   {
//                     data: Object.values(options),
//                     backgroundColor: [
//                       "#FF6384",
//                       "#36A2EB",
//                       "#FFCE56",
//                       "#4BC0C0",
//                       "#9966FF",
//                       "#FF9F40",
//                     ],
//                   },
//                 ],
//               },
//               totalResponses,
//             };
//           }
//         );

//         setQuestionData(questionDataArr);
//       } catch (error) {
//         console.error("Error fetching survey data:", error);
//       }
//     };

//     fetchData();
//   }, [surveyId]);

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//       },
//       datalabels: {
//         color: "white",
//         font: {
//           weight: "bold",
//         },
//       },
//     },
//   };

//   const chartContainerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: "20px",
//   };

//   const chartStyle = {
//     width: "300px",
//     height: "300px",
//     margin: "20px",
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Survey Report</h2>
//       {genderData && ageData ? (
//         <div style={chartContainerStyle}>
//           <div style={chartStyle}>
//             <h3>Gender Distribution</h3>
//             <Pie data={genderData} options={options} />
//           </div>
//           <div style={chartStyle}>
//             <h3>Age Distribution</h3>
//             <Pie data={ageData} options={options} />
//           </div>
//           {questionData.map(({ questionId, data, totalResponses }) => (
//             <div key={questionId} style={chartStyle}>
//               <h3>Question {questionId} Responses</h3>
//               <Bar
//                 data={data}
//                 options={{
//                   ...options,
//                   plugins: {
//                     ...options.plugins,
//                     datalabels: {
//                       formatter: (value) => {
//                         const percentage =
//                           ((value / totalResponses) * 100).toFixed(1) + "%";
//                         return percentage;
//                       },
//                     },
//                   },
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading report data...</p>
//       )}
//     </div>
//   );
// };

// export default SurveyReport;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { useParams } from "react-router-dom";

// // Register the required Chart.js elements and the datalabels plugin
// Chart.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartDataLabels,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// const SurveyReport = () => {
//   const { surveyId } = useParams();
//   const [genderData, setGenderData] = useState(null);
//   const [ageData, setAgeData] = useState(null);
//   const [questionData, setQuestionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/Answers?surveyId=${surveyId}`
//         );
//         const answers = response.data;

//         const genderCount = { Male: 0, Female: 0 };
//         const ageCount = {
//           "-18": 0,
//           "18-25": 0,
//           "25-35": 0,
//           "35-45": 0,
//           "45+": 0,
//         };
//         const questionCount = {};

//         answers.forEach((answer) => {
//           // Gender and age counts
//           if (answer.gender) genderCount[answer.gender]++;
//           if (answer.age) ageCount[answer.age]++;

//           // Question counts
//           if (answer.responses) {
//             // Check if responses is an array or an object
//             const responses = Array.isArray(answer.responses)
//               ? answer.responses
//               : Object.values(answer.responses);
//             responses.forEach((response) => {
//               if (!questionCount[response.questionId]) {
//                 questionCount[response.questionId] = {};
//               }
//               if (!questionCount[response.questionId][response.option]) {
//                 questionCount[response.questionId][response.option] = 0;
//               }
//               questionCount[response.questionId][response.option]++;
//             });
//           }
//         });

//         const genderTotal = genderCount.Male + genderCount.Female;
//         const ageTotal = Object.values(ageCount).reduce(
//           (sum, count) => sum + count,
//           0
//         );

//         setGenderData({
//           labels: ["Male", "Female"],
//           datasets: [
//             {
//               data: [genderCount.Male, genderCount.Female],
//               backgroundColor: ["#36A2EB", "#FF6384"],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage =
//                   ((value / genderTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });

//         setAgeData({
//           labels: ["-18", "18-25", "25-35", "35-45", "45+"],
//           datasets: [
//             {
//               data: [
//                 ageCount["-18"],
//                 ageCount["18-25"],
//                 ageCount["25-35"],
//                 ageCount["35-45"],
//                 ageCount["45+"],
//               ],
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//                 "#9966FF",
//               ],
//             },
//           ],
//           plugins: {
//             datalabels: {
//               formatter: (value, context) => {
//                 const percentage = ((value / ageTotal) * 100).toFixed(1) + "%";
//                 return percentage;
//               },
//             },
//           },
//         });

//         const questionDataArr = Object.entries(questionCount).map(
//           ([questionId, options]) => {
//             const totalResponses = Object.values(options).reduce(
//               (sum, count) => sum + count,
//               0
//             );
//             return {
//               questionId,
//               data: {
//                 labels: Object.keys(options),
//                 datasets: [
//                   {
//                     data: Object.values(options),
//                     backgroundColor: [
//                       "#FF6384",
//                       "#36A2EB",
//                       "#FFCE56",
//                       "#4BC0C0",
//                       "#9966FF",
//                       "#FF9F40",
//                     ],
//                   },
//                 ],
//               },
//               totalResponses,
//             };
//           }
//         );

//         setQuestionData(questionDataArr);
//       } catch (error) {
//         console.error("Error fetching survey data:", error);
//       }
//     };

//     fetchData();
//   }, [surveyId]);

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//       },
//       datalabels: {
//         color: "white",
//         font: {
//           weight: "bold",
//         },
//       },
//     },
//   };

//   const chartContainerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: "20px",
//   };

//   const chartStyle = {
//     width: "300px",
//     height: "300px",
//     margin: "20px",
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Survey Report</h2>
//       {genderData && ageData ? (
//         <div style={chartContainerStyle}>
//           <div style={chartStyle}>
//             <h3>Gender Distribution</h3>
//             <Pie data={genderData} options={options} />
//           </div>
//           <div style={chartStyle}>
//             <h3>Age Distribution</h3>
//             <Pie data={ageData} options={options} />
//           </div>
//           {questionData.map(({ questionId, data, totalResponses }) => (
//             <div key={questionId} style={chartStyle}>
//               <h3>Question {questionId} Responses</h3>
//               <Bar
//                 data={data}
//                 options={{
//                   ...options,
//                   plugins: {
//                     ...options.plugins,
//                     datalabels: {
//                       formatter: (value) => {
//                         const percentage =
//                           ((value / totalResponses) * 100).toFixed(1) + "%";
//                         return percentage;
//                       },
//                     },
//                   },
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading report data...</p>
//       )}
//     </div>
//   );
// };

// export default SurveyReport;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import "./SurveyReport.css";

// Register the required Chart.js elements and the datalabels plugin
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement
);

const SurveyReport = () => {
  const { surveyId } = useParams();
  const [genderData, setGenderData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Answers?surveyId=${surveyId}`
        );
        const answers = response.data;

        const genderCount = { Male: 0, Female: 0 };
        const ageCount = {
          "-18": 0,
          "18-25": 0,
          "25-35": 0,
          "35-45": 0,
          "45+": 0,
        };
        const questionCount = {};

        answers.forEach((answer) => {
          // Gender and age counts
          if (answer.gender) genderCount[answer.gender]++;
          if (answer.age) ageCount[answer.age]++;

          // Iterate over the keys of the responses object
          Object.keys(answer.responses).forEach((questionId) => {
            const option = answer.responses[questionId];
            if (!questionCount[questionId]) {
              questionCount[questionId] = {};
            }
            if (!questionCount[questionId][option]) {
              questionCount[questionId][option] = 0;
            }
            questionCount[questionId][option]++;
          });
        });

        const genderTotal = genderCount.Male + genderCount.Female;
        const ageTotal = Object.values(ageCount).reduce(
          (sum, count) => sum + count,
          0
        );

        setGenderData({
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [genderCount.Male, genderCount.Female],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const percentage =
                  ((value / genderTotal) * 100).toFixed(1) + "%";
                return percentage;
              },
            },
          },
        });

        setAgeData({
          labels: ["-18", "18-25", "25-35", "35-45", "45+"],
          datasets: [
            {
              data: [
                ageCount["-18"],
                ageCount["18-25"],
                ageCount["25-35"],
                ageCount["35-45"],
                ageCount["45+"],
              ],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const percentage = ((value / ageTotal) * 100).toFixed(1) + "%";
                return percentage;
              },
            },
          },
        });

        const questionDataArr = Object.entries(questionCount).map(
          ([questionId, options]) => {
            const totalResponses = Object.values(options).reduce(
              (sum, count) => sum + count,
              0
            );
            return {
              questionId,
              data: {
                labels: Object.keys(options),
                datasets: [
                  {
                    data: Object.values(options),
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4BC0C0",
                      "#9966FF",
                      "#FF9F40",
                    ],
                  },
                ],
              },
              totalResponses,
            };
          }
        );

        setQuestionData(questionDataArr);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchData();
  }, [surveyId]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
        },
      },
    },
  };

  // const chartContainerStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: "20px",
  // };

  // const chartStyle = {
  //   width: "300px",
  //   height: "300px",
  //   margin: "20px",
  // };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Survey Report</h2>
      {genderData && ageData ? (
        <div className="chartContainerStyle">
          <div className="GenderAndAge">
            <div className="chartStyle">
              <h3>Gender Distribution</h3>
              <Pie data={genderData} options={options} />
            </div>
            <div className="chartStyle">
              <h3>Age Distribution</h3>
              <Pie data={ageData} options={options} />
            </div>
          </div>
          {questionData.map(({ questionId, data, totalResponses }) => (
            <div className="chartStyle" key={questionId}>
              <h3>Question {questionId} Responses</h3>
              <Bar
                data={data}
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    datalabels: {
                      formatter: (value) => {
                        const percentage =
                          ((value / totalResponses) * 100).toFixed(1) + "%";
                        return percentage;
                      },
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
};

export default SurveyReport;