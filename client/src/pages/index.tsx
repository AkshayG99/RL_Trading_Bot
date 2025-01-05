import React, { useEffect, useState } from "react";

function Index() {
  // State for the data of each step
  const [stepsData, setStepsData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the data from the Python server
    fetch("http://localhost:8000/api/trades")
      .then((response) => response.json())
      .then((data) => {
        // Process the nested data structure
        const steps = [];
        for (const outerKey in data) {
          const innerData = data[outerKey];
          for (const innerKey in innerData) {
            const stepDetails = {
              key: outerKey,
              subKey: innerKey,
              ...innerData[innerKey],
            };
            steps.push(stepDetails);
          }
        }
        setStepsData(steps);
      });
  }, []); // Empty array means only run once - at render

  // Define the stock prefixes
  const stockLabels = ["Apple", "Motorola", "Starbucks"];

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl text-center text-gray-800 mb-8">Trading Bot Automation</h1>
      <h2 className="text-xl text-blue-600 mb-4 text-center">Below you will find the trades made by an automated trading bot. Each episode has approximatley 600 steps.</h2>
      <h2 className="text-xl text-blue-600 mb-4 text-center">Scroll to the bottom to see how much money the bot made. The initial investment is $20,000. </h2>
      {stepsData.map((stepData, index) => (
        <div className="bg-white mb-6 p-6 rounded-lg shadow-md" key={index}>
          {/* Display Keys */}
          <h2 className="text-xl text-blue-600 mb-4">
            Episode: {stepData.key}, Step: {stepData.subKey}
          </h2>

          {/* Step Information */}
          <h3 className="text-lg text-gray-800 mb-2">Step {stepData.step}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Action */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Action:</h3>
              <ul className="list-none pl-0">
                {stepData.action.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-sm mb-1">
                    {stockLabels[idx]}: {item === 0 ? "Sell" : item === 1 ? "Hold" : "Buy"}
                  </li>
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
                  <li key={idx} className="text-gray-600 text-sm mb-1">
                    {stockLabels[idx]}: ${item.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stocks Owned */}
            <div className="section">
              <h3 className="text-lg text-gray-800 mb-2">Stocks Owned:</h3>
              <ul className="list-none pl-0">
                {stepData.stocks_owned.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-sm mb-1">
                    {stockLabels[idx]}: {item}
                  </li>
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