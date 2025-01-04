import React, { useEffect, useState } from "react";

function Index() {
  // State for the data of each step
  const [stepsData, setStepsData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the data from Python server
    fetch("http://localhost:8000/api/trades")
      .then((response) => response.json())
      .then((data) => {
        // Create an array of data for the first 10 steps
        const steps = [];
        for (let i = 1; i <= 100; i++) {
          if (data[i]) {
            steps.push(data[i]);
          }
        }
        setStepsData(steps);
      });
  }, []); // Empty array means only run once - at render

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl text-center text-gray-800 mb-8">Trade Steps Overview</h1>
      {stepsData.map((stepData, index) => (
        <div className="bg-white mb-6 p-6 rounded-lg shadow-md" key={index}>
          <h2 className="text-xl text-blue-600 mb-4">Step {stepData.step}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Action */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Action:</h3>
              <ul className="list-none pl-0">
                {stepData.action.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-sm mb-1">{item}</li>
                ))}
              </ul>
            </div>

            {/* Cash in Hand */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Cash in Hand:</h3>
              <p className="text-gray-800 text-sm">${stepData.cash_in_hand.toFixed(2)}</p>
            </div>

            {/* Portfolio Value */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Portfolio Value:</h3>
              <p className="text-gray-800 text-sm">${stepData.portfolio_value.toFixed(2)}</p>
            </div>

            {/* Stock Prices */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Stock Prices:</h3>
              <ul className="list-none pl-0">
                {stepData.stock_prices.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-sm mb-1">{item.toFixed(2)}</li>
                ))}
              </ul>
            </div>

            {/* Stocks Owned */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Stocks Owned:</h3>
              <ul className="list-none pl-0">
                {stepData.stocks_owned.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-sm mb-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;