import React, { useEffect, useState } from "react";
import { Footer, Header, Slider } from "../components";
import { useParams } from "react-router-dom";
import { findData, signPetition } from "../utils/functions";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";
import { Link } from "react-router-dom";
import { donate } from "../utils/Donate";
import { getFilPriceData } from "../utils/Price";

// const ethers = require("ethers");
import { ethers } from "ethers";

const Petitions = () => {
  const params = useParams();
  const [petitionData, setPetitionData] = useState();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [isSign, setSign] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [fil, setFil] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log(params.id);
      setPetitionData(await findData(params.id));
    };
    getData();
  }, []);
  console.log(petitionData);

  const userPetitionSign = async () => {
    if (message) {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      let data = {
        sign_table: petitionData.sign_table,
        addr: petitionData.addr,
        name_of_signer: "XYZ",
        message: message,
        donation_amount: amount.toString(),
        // message: "message",
        // donation_amount: 111,
      };
      await signPetition(signer, data);
      setLoader(false);
      setSuccess(true);
    }
  };

  const donatePetition = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    let addr = petitionData.addr;

    if (addr && amount) {
      await donate(signer, addr, amount);
      console.log("start");
      setTimeout(() => {
        setSign(true);
        console.log("end");
      }, 4000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  };

  const getFilPrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setFil(await getFilPriceData(signer));
  };

  return (
    <div>
      {modal && (
        <div
          className="absolute w-screen h-[200vh] bg-slate-500 flex justify-center items-start -z-1"
          style={{ background: "rgba(0, 0, 0, 0.27)" }}
        >
          <div className="h-[100vh] w-[100%] flex justify-center items-center">
            {isSign ? (
              isSuccess ? (
                <div className="z-1000 w-[450px] text-center  bg-white rounded-xl py-10 px-10 flex flex-col justify-center items-center gap-3">
                  <div className="flex flex-col justify-center items-center">
                    <h2 className=" text-[1.5rem] mb-2">
                      Thank you for signing and supporting our petition!
                    </h2>
                    <p className="font-medium">
                      We greatly appreciate your participation and dedication to
                      the cause.
                    </p>
                  </div>
                  <img
                    src={require("../assets/thankyou.png")}
                    className="h-32 mb-2"
                  ></img>
                  <div>
                    <Link to="/">
                      <button className="bg-[#2CAE8F] text-white py-2 px-6 w-52 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]">
                        Go to Home
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="z-1000 w-[450px] text-center  bg-white rounded-xl py-10 px-10 flex flex-col justify-center items-center gap-3">
                  <div className="flex flex-col justify-center items-center">
                    <h2 className=" text-[1.5rem] mb-2">Sign the Petition</h2>
                    <p className="font-medium w-[70%] ">
                      Your Signature Matters, Take a Stand and Sign the
                      Petition!
                    </p>
                  </div>
                  <img
                    src={require("../assets/PetitionIcon.png")}
                    className="h-32 mb-2"
                  ></img>
                  <div>
                    <textarea
                      type="text"
                      value={message}
                      placeholder="Your message"
                      className="h-24 w-[100%] rounded-md border-[#C2C2C2] font-medium border-2 px-3 py-1 mb-2 text-[0.9rem]"
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => userPetitionSign()}
                      className="bg-[#2CAE8F] text-white py-2 px-6 w-52 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                    >
                      Sign the Petition
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="z-1000 w-[450px]  bg-white rounded-xl py-10 px-10 flex flex-col justify-center items-center gap-3">
                <h2 className=" text-[1.5rem]">Empower Change</h2>
                <p className="font-medium">Donate to Make a Difference!</p>

                <img
                  src={require("../assets/donate.png")}
                  className="w-24"
                ></img>
                <p className="font-medium">You can also Donate if you want.</p>
                <div
                  onClick={() => getFilPrice()}
                  className="font-bold underline cursor-pointer"
                >
                  Get Fil Price{`: ${fil ? fil.toFixed(2) : ""}`}
                </div>

                <div className="flex flex-col justify-center items-center">
                  <p className="text-red-600 h-6 text-[0.8rem]">
                    {error ? "Please enter valid amount" : ""}
                  </p>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-10 w-[100%] rounded-md border-[#C2C2C2] border-2 px-5"
                  ></input>
                  <button
                    onClick={() => donatePetition()}
                    className="bg-[#2CAE8F] text-white py-2 px-6 w-52 mt-3 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                  >
                    Donate
                  </button>

                  <div
                    onClick={() => setSign(true)}
                    className=" underline text-blue-700 mt-2 cursor-pointer"
                  >
                    skip
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {loader && (
        <div
          className="absolute w-screen h-screen bg-slate-500 flex justify-center items-center"
          style={{ background: "rgba(255, 255, 255, 0.65)" }}
        >
          <Lottie
            loop
            animationData={loaderGif}
            play
            style={{
              width: 200,
              height: 200,
            }}
          />
        </div>
      )}
      <Header />
      <div className="HeroSection ">
        <div className="absolute -z-10 w-screen flex  justify-center items-center">
          <img src={require("../assets/map.png")} className="w-[60%]"></img>
        </div>
      </div>
      <div className="contentSection mx-[10%] my-[5rem]">
        <div className="headingSection">
          <h1 className="text-[2.5rem] font-semibold text-center">
            {petitionData ? petitionData.title : "Title"}
          </h1>
          <div className="mt-[3rem]">
            <p className="text-[#2CAE8F] text-[1rem] ">
              {petitionData ? petitionData.tag.toUpperCase() : "TAG"}
            </p>
            {/* <p className="text-[#878181] text-[0.9rem] font-medium">
              September 19, 2022
            </p> */}
          </div>
        </div>
        <div className="flex my-[1rem]">
          <div className="w-[850px] h-[520px] bg-[#D9D9D9] rounded-xl overflow-hidden -z-10">
            <Slider data={petitionData ? petitionData.cid : ""} />
          </div>
          <div className="ml-10 w-[320px]">
            <div className="conutSection text-[1.15rem">
              <p className="text-[1.1rem]">
                <b className="font-bold">
                  {petitionData ? petitionData.cur_sign : "0"} have signed.
                </b>{" "}
                Let’s get to {petitionData ? petitionData.min_sign : "0"}!
              </p>
              <div className="status h-3 mt-2 w-[100%] border-2 borde-[#797979] rounded-md">
                <div className="percentage w-[70%] h-[100%] bg-[#2CAE8F] rounded-md"></div>
              </div>
            </div>
            <p className="my-5 text-[1.1rem] leading-relaxed">
              <b className="font-bold">
                {" "}
                At {petitionData ? petitionData.min_sign : "0"} signatures,
              </b>{" "}
              this petition is more likely to get a reaction from the{" "}
              <b className="font-bold">descision maker!</b>
            </p>
            <div>
              <h2 className="text-[1.5rem] font-bold">Sign this Petition</h2>
              <button
                onClick={() => setModal(true)}
                className="bg-[#2CAE8F] text-white py-2 px-8 w-[100%] mt-3 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
              >
                Sign this Petition
              </button>
              <button className=" text-black border-2 bg-white border-black py-2 px-8 w-[100%] mt-3 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]">
                Share this Petition
              </button>
            </div>
          </div>
        </div>
        <div className="flex text-[#636363] items-center gap-3 mb-5">
          <div className=" h-12 w-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="font-medium">
            <b className="font-bold text-black text-[1.1rem]">Lorem Ipsum</b>{" "}
            started this Petition
          </div>
        </div>
        <div className="infoSection text-[#636363] font-medium leading-loose w-[850px] text-justify">
          <p>{petitionData ? petitionData.description : "Description"}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Petitions;
