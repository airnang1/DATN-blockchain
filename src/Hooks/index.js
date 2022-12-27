/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../Store/Reducer/authReducer";
import { ethSelector, initCallAbi } from "../Store/Reducer/ethReducer";
var Web3 = require("web3");

export default function useDeployContractToTruffle() {
  const ether = useSelector(ethSelector);
  const auth = useSelector(authSelector);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const init = useCallback(
    async (artifact) => {
      dispatch(
        initCallAbi({
          data: {
            ...ether,
            loaded: true,
          },
        })
      );
      if (artifact?.myMarketplace) {
        const web3 = await loadWeb3();
        if (web3) {
          const accounts = await web3.eth.requestAccounts();
          const networkID = await web3.eth.net.getId();

          const { abi: myMarketplaceAbi } = artifact.myMarketplace;

          let myMarketplaceInstance;

          try {
            myMarketplaceInstance = new web3.eth.Contract(
              myMarketplaceAbi,
              artifact.myMarketplace.networks[networkID]?.address
            );

            dispatch(
              initCallAbi({
                data: {
                  artifact,
                  // web3,
                  accounts,
                  networkID,
                  contracts: { myMarketplaceInstance },
                  loaded: false,
                },
              })
            );
          } catch (err) {
            console.log({ err });
          }
        }
      }
    },
    [dispatch, ether]
  );

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(ether.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, ether.artifact]);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const myMarketplace = require("../contracts/Marketplace.json");
        const artifact = { myMarketplace };
        init(artifact);
      } catch (err) {
        console.log({ err });
      }
    };
    tryInit();
  }, [user, token]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      return (window.web3 = new Web3(window.ethereum));
    } else if (window.web3) {
      return (window.web3 = new Web3(window.web3.currentProvider));
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return null;
    }
  };
  if (auth.user?.loginDomain !== "cryptoWallet") {
    message.warning("Bạn chưa đăng nhập bằng ví điện tử của mình!");
    return null;
  }
  return null;
}
