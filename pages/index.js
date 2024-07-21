import { ethers } from "ethers";
import { useEffect, useState } from "react";
import detaskAbi from "../artifacts/contracts/DeTask.sol/DeTask.json";

export default function TaskPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [taskContract, setTaskContract] = useState(undefined);
  const [taskCount, setTaskCount] = useState(undefined);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskId1, setTaskId1] = useState("");
  const [taskId2, setTaskId2] = useState("");
  const [taskId3, setTaskId3] = useState("");
  const [taskName, setTaskName] = useState("");
  const [creator, setCreator] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const taskAbi = detaskAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      setAccounts(accounts);
      setSelectedAccount(accounts[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    setAccounts(accounts);
    setSelectedAccount(accounts[0]);

    getTaskContract();
  };

  const getTaskContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const taskContract = new ethers.Contract(contractAddress, taskAbi, signer);

    setTaskContract(taskContract);
  };

  const getTaskCount = async () => {
    if (taskContract) {
      setTaskCount((await taskContract.taskCount()).toNumber());
    }
  };

  const createTask = async () => {
    if (taskContract) {
      let tx = await taskContract.createTask(taskDescription);
      await tx.wait();
      getTaskCount();
    }
  };

  const completeTask = async () => {
    if (taskContract) {
      let tx = await taskContract.completeTask(taskId2);
      await tx.wait();
      getTaskCount();
    }
  };

  const getTaskDetails = async () => {
    if (taskContract) {
      setTaskName(await taskContract.getTaskName(taskId1));
      setCreator(await taskContract.getCreator(taskId1));
      setTaskStatus(await taskContract.checkTaskCompletion(taskId1));
      alert(`Task Id: ${taskId1} \nDescription: ${taskName} \nCreator: ${creator} \nTask Status: ${(taskStatus?"Completed":"Not Completed")}`);
    }
  };

  const checkTaskCompletion = async () => {
    if (taskContract) {
      await taskContract.checkTaskCompletion(taskId3);
    }
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this DApp.</p>;
    }

    if (accounts.length === 0) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (taskCount === undefined) {
      getTaskCount();
    }

    return (
      <div>
        <p>Your Account: 
          <select value={selectedAccount} onChange={handleAccountChange}>
            {accounts.map((acc, index) => (
              <option key={index} value={acc}>{acc}</option>
            ))}
          </select>
        </p>
        <p>Number of Tasks: {taskCount}</p>
        <div>
          <h4>Create Task</h4>
          <input type="text" value={taskDescription} placeholder="Task Description" onChange={(e) => setTaskDescription(e.target.value)} /><br></br>
          <button onClick={createTask}>Create Task</button>
        </div>
        <div>
          <h4>Get Task Details</h4>
          <input type="number" value={taskId1} placeholder="Task ID" onChange={(e) => setTaskId1(e.target.value)} /><br></br>
          <button onClick={getTaskDetails}>Get Details</button>
        </div>
        <div>
          <h4>Complete Task</h4>
          <input type="number" value={taskId2} placeholder="Task ID" onChange={(e) => setTaskId2(e.target.value)} /><br></br>
          <button onClick={completeTask}>Complete Task</button>
        </div>
        <div>
          <h4>Check Task Completion</h4>
          <input type="number" value={taskId3} placeholder="Task ID" onChange={(e) => setTaskId3(e.target.value)} /><br></br>
          <button onClick={checkTaskCompletion}>Check Completion</button>
          <p>Task Status: {(taskStatus?"Completed":"Not completed")}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to DeTask DApp!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          border: 3px solid brown;
          border-radius: 20px;
          padding: 10px;
          background-color: beige;
        }
        h1 {
          display: inline;
          padding: 5px;
          color: blue;
        }
      `}</style>
    </main>
  );
}