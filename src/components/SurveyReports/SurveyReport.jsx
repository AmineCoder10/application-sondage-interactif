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
// import "./SurveyReport.css";
// import { Container } from "reactstrap";
// import HelmetComponent from "../CustomHook/HelmeComponentt";

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

//   const [questions, setQuestions] = useState([]);

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

//           // Iterate over the keys of the responses object
//           Object.keys(answer.responses).forEach((questionId) => {
//             const option = answer.responses[questionId];
//             if (!questionCount[questionId]) {
//               questionCount[questionId] = {};
//             }
//             if (!questionCount[questionId][option]) {
//               questionCount[questionId][option] = 0;
//             }
//             questionCount[questionId][option]++;
//           });
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

//   return (
//     <>
//       <HelmetComponent title="Survey Reports and Analytics" />
//       <Container style={{
//         position: "relative",
//         border: "solid black",
//         marginTop: "100px",
//         marginBottom: "70px",
//         borderRadius: "20px",
//       }}>
//         {genderData && ageData ? (
//           <div className="chartContainerStyle">
//             <div className="GenderAndAge">
//               <div className="chartStyle">
//                 <h3>Gender Distribution</h3>
//                 <Pie data={genderData} options={options} />
//               </div>
//               <div className="chartStyle">
//                 <h3>Age Distribution</h3>
//                 <Pie data={ageData} options={options} />
//               </div>
//             </div>
//             <div className="flex-Questions">
//               {questionData.map(({ questionId, data, totalResponses }, index) => (
//                 <div className="chartStyle" key={questionId}>

//                   <h3>Question {index + 1} Responses</h3>
//                   <Bar
//                     data={data}
//                     options={{
//                       ...options,
//                       plugins: {
//                         ...options.plugins,
//                         datalabels: {
//                           formatter: (value) => {
//                             const percentage =
//                               ((value / totalResponses) * 100).toFixed(1) + "%";
//                             return percentage;
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>Loading report data...</p>
//         )}
//       </Container>
//     </>
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
import { Container } from "reactstrap";

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
  const [questions, setQuestions] = useState({});

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
        const questionText = {};

        answers.forEach((answer) => {
          // Gender and age counts
          if (answer.gender) genderCount[answer.gender]++;
          if (answer.age) ageCount[answer.age]++;

          // Iterate over the keys of the responses object
          Object.entries(answer.responses).forEach(([questionId, option]) => {
            // Store question text if available
            if (answer.responses[questionId] && !questionText[questionId]) {
              questionText[questionId] = questions[questionId];
            }
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
        setQuestions(questionText);
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

  return (
    <Container
      style={{
        position: "relative",
        border: "solid black",
        marginTop: "100px",
        marginBottom: "70px",
        borderRadius: "20px",
      }}
    >
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
          <div className="flex-Questions">
            {questionData.map(({ questionId, data, totalResponses }, index) => {
              const questionText =
                questions[questionId] || `Question ${index + 1}`;
              return (
                <div className="chartStyle" key={questionId}>
                  <h3>{questionText} Responses</h3>
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
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading report data...</p>
      )}
    </Container>
  );
};

export default SurveyReport;