import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [currentBlock, setCurrentBlock] = useState(undefined);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      
    }
    getBlockNumber();

  }, []);

  useEffect(() => {
    async function getBlockNumber() { 
      const blockInfo = await alchemy.core.getBlock(blockNumber);
      setCurrentBlock(blockInfo);
    }
    getBlockNumber();
  }, [blockNumber]);

  return (
    <div className="App">
      <h1>Block explorer</h1>

      <div>
        <button onClick={() => setBlockNumber(blockNumber - 1)}> previous block</button>
        <div>Block Number: {blockNumber}</div>
        <button onClick={() => setBlockNumber(blockNumber + 1)}>Next Block</button>
      </div>
      <div>Gas Limit: {currentBlock?.gasLimit.toString() || 0}</div>
      <div>Gas used: {currentBlock?.gasUsed.toString() || 0}</div>
      <div className="transactions">
        <h2>
          Total transactions in block: {currentBlock?.transactions.length}
        </h2>

        {currentBlock?.transactions.map((transaction, index) => (
          <button
            type="button"
            className="transactionButton"
            key={index}
            onClick={() =>
              window.open(`https://goerli.etherscan.io/tx/${transaction}`)
            }
          >
            {transaction}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
