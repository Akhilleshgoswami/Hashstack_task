import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import {
  DAIMOND_ADDRESS,
  FACETCUT,
  ZEROADDRESS,
} from "../utils/constent/constent.ts";
import { CONTRACT_A_ABI, DAIMOND_CUT_ABI } from "../utils/Abi/diamondCutABI.js";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";

function ContractInteractionComponent() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const [contractInstance, setContractInstance] = useState(null);
  const [getterResult, setGetterResult] = useState("");
  const [setterValue, setSetterValue] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [signer, setSigner] = useState("");
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
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
  const  loadContract = async () => {
        const ethersProvider =  new ethers.providers.Web3Provider(walletProvider)
        const signer = await ethersProvider.getSigner()    
        setSigner(signer);
        const contract = new ethers.Contract(
          DAIMOND_ADDRESS,
          CONTRACT_A_ABI,
          signer
        );
        setContractInstance(contract);
  };

  const handleGetter = async () => {
    try {  
      const result = await contractInstance.getNum()
      const formattedResult = ethers.utils.formatUnits(result, 18); // Assuming it's in 18 decimals
      setGetterResult(formattedResult.toString());

    } catch (error) {
      console.error("Error changing admin:", error);
      if (error.code === 'CALL_EXCEPTION') {
        // Transaction reverted
        alert("User is not admin");
      } else {
        // Other error occurred
        alert("An error occurred. Please try again.");
      }
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
      console.error("Error changing admin:", error);
      if (error.code === 'CALL_EXCEPTION') {
        // Transaction reverted
        alert("User is not admin");
      } else {
        // Other error occurred
        alert("An error occurred. Please try again.");
      }
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
      console.error("Error changing admin:", error);
      if (error.code === 'CALL_EXCEPTION') {
        // Transaction reverted
        alert("User is not admin");
      } else {
        // Other error occurred
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleChangeAdmin = async () => {
    try {
      const tx = await contractInstance.changeAdmin(newAdmin);
      await tx.wait();
      alert("Transaction Done");
    } catch (error) {
      console.error("Error changing admin:", error);
      if (error.code === 'CALL_EXCEPTION') {
        // Transaction reverted
        alert("User is not admin");
      } else {
        // Other error occurred
        alert("An error occurred. Please try again.");
      }
    }
    
  };

  useEffect(() => {
  if(isConnected){
    loadContract();
  }

  }, [isConnected]);

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Dimond Contract Interactions</h1>
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
