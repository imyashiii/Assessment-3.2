# Hardhat project/ Decentralized Auction
This project implements a basic decentralized application (dApp) using React and the ethers.js library to interact with an Ethereum smart contract. The dApp simulates an Decentralized Auction interface where users can connect their MetaMask wallet, create auction, place bid, end an auction manually, and check the status of an auction. Additionally, users can get any auctions details by using the auctions id. The smart contract's ABI and address are integrated, allowing seamless interaction with the deployed contract on the Ethereum blockchain. The project ensures a smooth user experience by updating the UI based on the connected wallet and providing real-time feedback on transactions.

## Description
Decentralized auction is a decentralized application (dApp) built with React and ethers.js, designed to simulate an Decentralized Auction management interface. Users can interact with an Ethereum smart contract to manage their auctions and place bid on others auction items. The application allows users to connect their MetaMask wallet, create auction, place bid, end an auction manually, check the status of an auction, as well as get any auctions details by using the auctions id.
### Key Features
1. **MetaMask Integration**: Users can connect their MetaMask wallet to the dApp, enabling seamless interaction with the Ethereum blockchain.
2. **Create Auciton**: Users can create a new auction at any time.
3. **Place Bid**: Users can place a bid on any auction.
4. **End Auction**: Users can end their created auction manually whenever they want.
5. **Availability Check**: Users can check the availability of an auction that it has already ended or not.
6. **Get Details**: Users can the details of any auction only with the help of auction id.

### Smart Contract Integration
The dApp interacts with a deployed smart contract on the Ethereum blockchain. The contract's ABI and address are integrated into the application for seamless interaction.

**Contract Address:** 0x.......

**ABI:** The ABI is imported from the contract's JSON artifact.

## Getting Started

### Executing Program
To execute this program into your local machine first you have to ensure that your local machine has the latest node.js and npm configuration and added to path in your machine's environment variable. After that create a new folder and open that folder in VS code.
Then follow these steps:
1. Open the terminal in VS code and clone the repository using the command 
`git clone https://github.com/Abhi072004/Assessment3.2.git`
2.  Navigate to the project directory using the command 
`cd Assessment3.2`
3. Install the required dependencies using the command
`npm i`
4. When it gets completed open two additional terminals in your VS code
5. In the second terminal type: 
`npx hardhat node`
6. In the third terminal, type:
`npx hardhat run scripts/deploy.js --network localhost`
7. Back in the first terminal and type the below commant to launch the front-end:
`npm run dev`

After this, the project will be running on your localhost. Typically at http://localhost:3000 run the dApp as you wish.

## Authors
Yashika Swami

## License
This project is licensed under the MIT License.