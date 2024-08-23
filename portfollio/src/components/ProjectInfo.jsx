import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const ask = async () => {
    const url = `http://127.0.0.1:8000/api/chat/?message=${encodeURIComponent(
      question
    )}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnswer(result.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold">
          Persional Bot trained in My resume data
        </h1>
        <div>
          {/* Answers */}
          <div className="mt-10 pb-10 rounded-lg mx-40 p-4 font-bold text-red-400 bg-white">
          {answer && (
              <p className="py-[100px] px-[40px] text-3xl">
                <ReactTyped strings={[answer]} typeSpeed={70}></ReactTyped>
              </p>
          )}
          <label htmlFor="question">Enter Your Question </label>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-[50px] text-2xl focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
          ></input>
          <button
            onClick={ask}
            type="button"
            class="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Ask
          </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
