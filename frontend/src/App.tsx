import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [digitInput, setDigitInput] = useState<string>("0,1,2,3,4,5,6,7,8,9");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [validCount, setValidCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const digits = digitInput.split(",").map(Number);

  const generateToken = (): void => {
    let newToken = "";
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) newToken += "-";
      newToken += digits[Math.floor(Math.random() * digits.length)].toString();
    }
    setToken(newToken);
    setIsValid(null);
    setTotalCount(totalCount + 1);
  };

  const validateToken = (): void => {
    axios
      .get(`http://localhost:3001/validate/${token}`)
      .then((response) => {
        setIsValid(response.data.isValid);
        if (response.data.isValid) {
          setValidCount(validCount + 1);
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your axios operation: ",
          error
        );
      });
  };

  const toggleLoop = (): void => {
    setIsLooping(!isLooping);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLooping) {
      timer = setInterval(() => {
        generateToken();
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isLooping, totalCount]);

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Token Generator</h1>
        <div className="mb-4">
          <input
            className="w-full p-2 mb-2 border rounded"
            value={digitInput}
            onChange={(e) => setDigitInput(e.target.value)}
            placeholder="Enter digits, separated by comma"
          />
          <button
            className="w-full px-4 py-2 mb-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={generateToken}
          >
            Generate Token
          </button>
          <button
            className="w-full px-4 py-2 mb-2 font-bold text-white bg-green-500 rounded hover:bg-green-400"
            onClick={validateToken}
          >
            Validate Token
          </button>
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-400"
            onClick={toggleLoop}
          >
            {isLooping ? "Stop Generating" : "Start Generating"}
          </button>
        </div>
        <div className="border-t-2 border-gray-200">
          <p className="mt-4">
            Token: <span className="font-mono">{token || "N/A"}</span>
          </p>
          <p className="mt-2">
            Validation:{" "}
            <span className="font-bold">
              {isValid === null ? "N/A" : isValid ? "Valid" : "Invalid"}
            </span>
          </p>
          <p className="mt-2">
            Total tokens: <span className="font-bold">{totalCount}</span>
          </p>
          <p className="mt-2">
            Valid tokens: <span className="font-bold">{validCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
