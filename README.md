# Hardhat project/ Decentralized Task Management System
This project implements a basic decentralized application (dApp) using React and the ethers.js library to interact with an Ethereum smart contract. The dApp simulates an Decentralized Task Management interface where users can connect their MetaMask wallet, create task, mark task as completed, and check the status of an task whether it is completed or not. Additionally, users can get any task details by using the task id. The smart contract's ABI and address are integrated, allowing seamless interaction with the deployed contract on the Ethereum blockchain. The project ensures a smooth user experience by updating the UI based on the connected wallet and providing real-time feedback on transactions.

## Description
Decentralized Task Management is a decentralized application (dApp) built with React and ethers.js, designed to simulate an Decentralized Task management interface. Users can interact with an Ethereum smart contract to manage their tasks and complete tasks of others. The application allows users to connect their MetaMask wallet, create tasks, mark a task as completed, check the status of a task, as well as get any task details by using the task id.
### Key Features
1. **MetaMask Integration**: Users can connect their MetaMask wallet to the dApp, enabling seamless interaction with the Ethereum blockchain.
2. **Create Tasks**: Users can create a new task at any time.
3. **Mark Completed**: Users can mark their created task as completed whenever they want.
4. **Check Status**: Users can check the status of an auction that it has already completed or not.
5. **Get Details**: Users can get the details of any task only with the help of task id.

### Smart Contract Integration
The dApp interacts with a deployed smart contract on the Ethereum blockchain. The contract's ABI and address are integrated into the application for seamless interaction.

**Contract Address:** 0x.......

**ABI:** The ABI is imported from the contract's JSON artifact.

## Getting Started

### Executing Program
To execute this program into your local machine first you have to ensure that your local machine has the latest node.js and npm configuration and added to path in your machine's environment variable. After that create a new folder and open that folder in VS code.
Then follow these steps:
1. Open the terminal in VS code and clone the repository using the command 
`git clone https://github.com/imyashiii/Assessment-3.2.git`
2.  Navigate to the project directory using the command 
`cd Assessment-3.2`
3. Install the required dependencies using the command
`npm i`
4. When it gets completed open two additional terminals in your VS code
5. In the second terminal type: 
`npx hardhat node`
6. In the third terminal, type:
`npx hardhat run scripts/deploy.js --network localhost`
7. This command will give you an address copy that address and paste it in the pages/index.js file in the variable `contractAddress`
8. Back in the first terminal and type the below commant to launch the front-end:
`npm run dev`

After this, the project will be running on your localhost. Typically at http://localhost:3000 run the dApp as you wish.

## Authors
Yashika Swami

## License
This project is licensed under the MIT License.
