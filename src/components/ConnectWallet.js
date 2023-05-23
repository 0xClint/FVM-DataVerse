import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { UserIcon } from "../assets";
import { Link } from "react-router-dom";

const ConnectWallet = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    deactivateWeb3,
    Moralis,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, []);

  useEffect(() => {
    // Moralis
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);
  return (
    <div>
      {account ? (
        <Link to="/profile">
          <div className="cursor-pointer flex justify-center items-center gap-2 bg-white p-[6px] rounded-[15px] rounded-bl-[15px]">
            <div className="w-[40px] h-[40px] bg-[#2CAE8F]  rounded-[50%] flex justify-center items-center">
              <UserIcon className="w-7" />
            </div>
            <p className="">
              {account.slice(0, 7)}...
              {account.slice(account.length - 4)}
            </p>
            {/* <button className="Connect  mx-2"></button> */}
          </div>
        </Link>
      ) : (
        <button
          // className="connect bg-[#2CAE8F] w-full py-2 px-4 font-bold text-white rounded-md hover:bg-[#219f82]"
          className=" text-black border-2 bg-white border-black py-2 px-5 w-[100%] mt-3 rounded-[5px] hover:border-[#878181] hover:text-[#878181]"
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
