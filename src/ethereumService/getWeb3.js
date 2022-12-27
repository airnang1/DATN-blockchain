import Web3 from "web3";
import { openNotification } from "../utils";

export const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  } else if (window.web3) {
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  } else {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    
    !web3 && openNotification(
      "Warning",
      "Web3 is not supported in this browser. Please switch to a supported browser."
    );
    return web3;
  }
};
