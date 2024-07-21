import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/DeAuction.sol/DeAuction.json";

export default function AuctionPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [auctionContract, setAuctionContract] = useState(undefined);
  const [itemsCount, setItemsCount] = useState(undefined);
  const [auctionId1, setAuctionId1] = useState("");
  const [auctionId2, setAuctionId2] = useState("");
  const [auctionId3, setAuctionId3] = useState("");
  const [auctionId4, setAuctionId4] = useState("");
  const [itemName, setItemName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const [auctionState, setAuctionState] = useState("");

  const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const auctionABI = atm_abi.abi;

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

    // once wallet is set we can get a reference to our deployed contract
    getAuctionContract();
  };

  const getAuctionContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const auctionContract = new ethers.Contract(contractAddress, auctionABI, signer);

    setAuctionContract(auctionContract);
  };

  const getItemsCount = async () => {
    if (auctionContract) {
      setItemsCount((await auctionContract.getNoOfItems()).toNumber());
    }
  };

  const createAuction = async () => {
    if (auctionContract) {
      let tx = await auctionContract.createAuction(itemName, basePrice, duration);
      await tx.wait();
      getItemsCount();
    }
  };

  const getAuctionDetails = async () => {
    if(auctionContract){
      setItemName(await auctionContract.getItemName(auctionId1));
      setHighestBid((await auctionContract.getHighestBid(auctionId1)).toNumber());
      setAuctionState(await auctionContract.checkAuctionState(auctionId1));
      alert(`Id: ${auctionId1} \nName: ${itemName} \nHighest Bid: ${highestBid} \nAvailable: ${(auctionState?"No":"Yes")}`);
    }
  }

  const placeBid = async () => {
    if (auctionContract) {
      let tx = await auctionContract.placeBid(auctionId2, bidPrice, { value: bidPrice });
      await tx.wait();
      getItemsCount();
    }
  };

  const endAuction = async () => {
    if (auctionContract) {
      let tx = await auctionContract.endAuction(auctionId3);
      await tx.wait();
      getItemsCount();
    }
  };

  const checkAuctionState = async () => {
    if (auctionContract) {
      let state = await auctionContract.checkAuctionState(auctionId4);
      setAuctionState(state);
    }
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this DApp.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (accounts.length === 0) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (itemsCount == undefined) {
      getItemsCount();
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
        <p>Number of Auctions: {itemsCount}</p>
        <div>
          <h4>Create Auction</h4>
          <input type="text" value={itemName} placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} /><br></br>
          <input type="text" value={basePrice} placeholder="Base Price (ETH)" onChange={(e) => setBasePrice(e.target.value)} /><br></br>
          <input type="text" value={duration} placeholder="Duration (seconds)" onChange={(e) => setDuration(e.target.value)} /><br></br>
          <button onClick={createAuction}>Create Auction</button>
        </div>
        <div>
          <h4>Get Auction Details</h4>
          <input type="text" value={auctionId1} placeholder="Auction ID" onChange={(e) => setAuctionId1(e.target.value)} /><br></br>
          <button onClick={() => getAuctionDetails()}>Get Details</button>
        </div>
        <div>
          <h4>Place Bid</h4>
          <input type="text" value={auctionId2} placeholder="Auction ID" onChange={(e) => setAuctionId2(e.target.value)} /><br></br>
          <input type="text" value={bidPrice} placeholder="Bid Price (ETH)" onChange={(e) => setBidPrice(e.target.value)} /><br></br>
          <button onClick={placeBid}>Place Bid</button>
        </div>
        <div>
          <h4>End Auction</h4>
          <input type="text" value={auctionId3} placeholder="Auction ID" onChange={(e) => setAuctionId3(e.target.value)} /><br></br>
          <button onClick={endAuction}>End Auction</button>
        </div>
        <div>
          <h4>Check Auction State</h4>
          <input type="text" value={auctionId4} placeholder="Auction ID" style={{ caretColor: 'rgb(40,120,68)' }} onChange={(e) => setAuctionId4(e.target.value)} /><br></br>
          <button onClick={checkAuctionState}>Check Auction State</button>
          <p>Auction State: {(auctionState?"Unvailable":"Available")}</p>
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
        <h1>Welcome to Decentralized Auction!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          border: 3px solid brown;
          padding: 10px;
          background-color: #fdf1f0;
        }
        h1 {
          display: inline;
          padding: 5px;
          color: red;
        }
      `}</style>
    </main>
  );
}
