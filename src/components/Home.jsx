import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  DAIMOND_ADDRESS,
  FACETCUT,
  ZEROADDRESS,
} from "../utils/constent/constent.ts";
import { CONTRACT_A_ABI, DAIMOND_CUT_ABI } from "../utils/Abi/diamondCutABI.js";

function ContractInteractionComponent() {
  const [contractInstance, setContractInstance] = useState(null);
  const [getterResult, setGetterResult] = useState("");
  const [setterValue, setSetterValue] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [signer, setSigner] = useState("");
const [isConnected,setIsConnected] = useState(false)
const [isPolygonTestnet, setIsPolygonTestnet] = useState(false);
const [availableNetworks, setAvailableNetworks] = useState([]);
const[address,setAddress] = useState()
const [selectedNetwork, setSelectedNetwork] = useState('');
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
  };
  const connectButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#4285f4',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };
  const dropdownStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    margin: '8px',
    width: '200px',
  };
  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "4px",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    margin: "8px",
    fontSize: "16px",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    margin: "8px",
    width: "200px",
  };
  const loadContract = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const contract = new ethers.Contract(
          DAIMOND_ADDRESS,
          CONTRACT_A_ABI,
          signer
        );
        console.log(contract);
        setContractInstance(contract);
        setAddress(await signer.getAddress())
        // Call a contract function (Example: Get the contract value)
        //   const value = await contract.getContractValue();
        //   setContractValue(value);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Error loading contract:", error);
    }
  };

  const handleGetter = async () => {
    try {  
        // await contractInstance.initialize()
        // await contractInstance.initializeFunc()
      const result = await contractInstance.getNum()
      const formattedResult = ethers.utils.formatUnits(result, 18); // Assuming it's in 18 decimals
      setGetterResult(formattedResult.toString());

    } catch (error) {
      console.error("Error calling getter function:", error);
      console.log(error)
      alert(error?.data?.message || " ")
    }
  };

  const handleSetter = async () => {
    try {
      const tx = await contractInstance.setNum(
        ethers.utils.parseEther(setterValue.toString())
      );
      await tx.wait();
      alert("Transasction Done")
    } catch (error) {
      console.error("Error calling setter function:", error);
      alert(error?.data?.message || " ")
    }
  };

  const handleUpgrade = async () => {
    try {
      const contract = new ethers.Contract(
        DAIMOND_ADDRESS,
        DAIMOND_CUT_ABI,
        signer
      );
      const tx = await contract.diamondCut(FACETCUT, ZEROADDRESS, "0x");
      await tx.wait();
      alert("Transasction Done")
    } catch (error) {
      console.error("Error upgrading contract:", error);
      alert(error?.data?.message || " ")
    }
  };
const initNewContract =  async()=>{
   try {
     const contractA = new ethers.Contract(
         DAIMOND_ADDRESS,
         CONTRACT_A_ABI,
         signer
       );

      const tx1 =  await contractA.initializeFunc();
      tx1.wait()
      alert("Transasction Done")
   } catch (error) {
    alert(error?.data?.message || " ")
    
   }
}
  const handleGetAdmin = async () => {
    try {
      const admin = await contractInstance.getAdmin();
      setAdminAddress(admin);
      
    } catch (error) {
      console.error("Error getting admin address:", error);
      alert(error?.data?.message || " ")
    }
  };

  const handleChangeAdmin = async () => {
    try {
      const tx = await contractInstance.changeAdmin(newAdmin);
      await tx.wait();
      alert("Transasction Done")
    } catch (error) {
      console.error("Error changing admin:", error);
      alert(error?.data?.message || " ")

    }
  };
  async function checkNetwork() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      console.log(network)
      setIsPolygonTestnet(network.chainId === 97);

      const networks = await window.ethereum.request({ method: 'wallet_getEthereumChain' });
      setAvailableNetworks(networks.filter(net => net.chainId !== network.chainId));

    } catch (error) {
      console.error('Error fetching network:', error);
    }
  }


  useEffect(() => {
    checkNetwork();
    // loadContract();
  }, []);


if(!isPolygonTestnet){
  return ( <div style={containerStyle}>
    <h1 style={{ textAlign: "center" }}>Please switch to  BNB Tesnet</h1> 
   
    </div>)
  }
  return (
    <div style={containerStyle}>
        <button style={connectButtonStyle} onClick={loadContract}>
        {isConnected  ? "Connected" : "Connect"}
      </button>

      <h1 style={{ textAlign: "center" }}>Dimond Contract Interactions</h1>
      <h4 style={{ textAlign: "flex" }}> {address ? `connected to: ${address}` : "Connect wallet"}</h4>
      <div style={{ textAlign: "center" }}>
        <button style={buttonStyle} onClick={handleGetter}>
          Get Value
        </button>
        <p>Getter Result: {getterResult}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <button style={buttonStyle} onClick={handleGetAdmin}>
          Get Admin
        </button>
        <p>Admin Address: {adminAddress}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={setterValue}
          onChange={(e) => setSetterValue(e.target.value)}
          placeholder="Enter value"
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleSetter}>
          Set Value
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
      <p>Please call Change Admin after upgrade Contract</p>
        <input
          type="text"
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
          placeholder="Enter new admin address"
          style={inputStyle}
        />
     
        <button style={buttonStyle} onClick={handleChangeAdmin}>
          Change Admin
        </button>
      </div>
      <button style={buttonStyle} onClick={handleUpgrade}>
        Upgrade Contract
      </button>
      <button style={buttonStyle} onClick={initNewContract}>
        init Upgrade Contract 
      </button>
    </div>
  );
}

export default ContractInteractionComponent;
