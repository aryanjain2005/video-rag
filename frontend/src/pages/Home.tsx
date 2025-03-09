import React, { useState } from "react";
import axios from "axios";

const VideoSearch: React.FC = () => {
  const defaultQueries = [
    "एक निर्देशक की भूमिका क्या होती है?",
    "किरदारों का चयन कैसे किया जाता है?",
    "शूटिंग लोकेशन का चुनाव करने के लिए किन बातों का ध्यान रखना चाहिए?",
    "एक निर्देशक को शूटिंग के दौरान किन तकनीकी बातों पर ध्यान देना चाहिए?",
  ];

  const [queries, setQueries] = useState<string[]>([...defaultQueries]);
  const [responses, setResponses] = useState<
    { query: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQueries = [...queries];
    updatedQueries[index] = value;
    setQueries(updatedQueries);
  };

  const addQuestion = () => {
    setQueries([...queries, ""]); // Add an empty question field
  };

  const removeQuestion = (index: number) => {
    if (queries.length > 1) {
      setQueries(queries.filter((_, i) => i !== index));
    }
  };

  const handleSearch = async () => {
    if (queries.some((query) => query.trim() === "")) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8084/query", { queries });
      const newResponses = queries.map((query, index) => ({
        query,
        response: res.data.responses[index],
      }));

      setResponses([...responses, ...newResponses]);
      setQueries([...defaultQueries]);
    } catch (error) {
      console.error("Error fetching response", error);
    }

    setLoading(false);
  };

  const isAskDisabled = queries.some((query) => query.trim() === ""); // Button disabled condition

  return (
    <div className="mx-auto p-6 w-screen h-screen bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
        🎥 Video-RAG Search
      </h1>

      {/* Past Queries & Responses */}
      {responses.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            📜 Past Queries & Responses:
          </h2>
          {responses.map((entry, index) => {
            const match = entry.response.match(
              /🎬 Video URL: (.*?) ⏳ Start Time: (.*?)s\n📜 Excerpt: (.*)/
            );
            const videoUrl = match ? match[1] : "";
            const startTime = match ? match[2] : "";
            const excerpt = match ? match[3] : "";

            return (
              <div key={index} className="mb-4 p-4 bg-white rounded-md shadow">
                <p className="text-blue-600 font-semibold">🔹 {entry.query}</p>
                {videoUrl && (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    🎬 Video Link
                  </a>
                )}
                <p className="text-gray-700">
                  ⏳ <strong>Start Time:</strong> {startTime}s
                </p>
                <p className="text-gray-700">
                  📜 <strong>Excerpt:</strong> {excerpt}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Editable Questions */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">🔍 Ask Your Questions:</h2>
        {queries.map((query, index) => (
          <div key={index} className="mb-3 flex items-center">
            <span className="mr-3 text-gray-600 font-semibold">
              {index + 1}.
            </span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              value={query}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            {queries.length > 1 && (
              <button
                className="ml-2 p-2 text-red-600 hover:text-red-800"
                onClick={() => removeQuestion(index)}
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={addQuestion}
          >
            ➕ Add Question
          </button>
          <button
            className={`px-6 py-2 rounded-md text-white transition ${
              isAskDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSearch}
            disabled={isAskDisabled || loading}
          >
            {loading ? "Querying..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSearch;
