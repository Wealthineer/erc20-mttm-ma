import './App.css';
import { useState } from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import MTTMMA from'./artifacts/contracts/MttmMaToken.sol/MttmMaToken.json'

const greeterAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const mttmmaAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"

function App() {

  //store greeting in local state
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  //request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  //call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet();
        console.log('data: ', data)
      } catch(err) {
        console.log('Error: ', err)
      }
    }
  }

  async function getBalance(){
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  //call the smart contract and send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function sendCoins() {
    if (!userAccount) return
    if (!amount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function mint() {
    if (!userAccount) return
    if (!amount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.mint(userAccount, amount);
      await transaction.wait();
    }
  }

  async function burn() {
    if (!amount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.burn(amount);
      await transaction.wait();
    }
  }

  async function grantMinter() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.grantMinter(userAccount);
      await transaction.wait();
    }
  }

  async function revokeMinter() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.revokeMinter(userAccount);
      await transaction.wait();
    }
  }
  async function grantBurner() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.grantBurner(userAccount);
      await transaction.wait();
    }
  }

  async function revokeBurner() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.revokeBurner(userAccount);
      await transaction.wait();
    }
  }


  async function grantAdmin() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.grantAdmin(userAccount);
      await transaction.wait();
    }
  }

  async function revokeAdmin() {
    if (!userAccount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mttmmaAddress, MTTMMA.abi, signer);
      const transaction = await contract.revokeAdmin(userAccount);
      await transaction.wait();
    }
  }


  return (
      <div className="App">
        <header className="App-header">
          <button onClick={requestAccount}>Connect</button>
          <button onClick={fetchGreeting}>Fetch Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
          <br />
          <button onClick={getBalance}>Get Balance</button>
          <button onClick={sendCoins}>Send Coins</button>
          <button onClick={mint}>Mint to Address</button>
          <button onClick={burn}>Burn your tokens</button>
          <button onClick={grantMinter}>Grant role minter</button>
          <button onClick={revokeMinter}>Revoke role minter</button>
          <button onClick={grantBurner}>Grant role burner</button>
          <button onClick={revokeBurner}>Revoke role burner</button>
          <button onClick={grantAdmin}>Grant role admin</button>
          <button onClick={revokeAdmin}>Revoke role admin</button>
          <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
          <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        </header>
      </div>
  );
}

export default App;
