import React, { useEffect, useState } from "react";
import { Footer, Header, Slider } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadFile } from "../utils/fileUpload";
import { useMoralis } from "react-moralis";
import {
  createMainPetitionTable,
  createPetitionTable,
} from "../utils/functions";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";
import { donate } from "../utils/Donate";

const ethers = require("ethers");

const Publish = () => {
  const { account } = useMoralis();
  const [formData, setFormData] = useState();
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data } = useSelector((state) => state);

  useEffect(() => {
    setFormData(data.form);
  }, []);
  // useEffect(() => {
  //   imgPopulator();
  // }, [formData]);
  console.log(formData);

  const createPetition = async () => {
    setLoader(true);
    // let cid = JSON.stringify(await uploadFile(formData.file));
    let cid = JSON.stringify(formData.file);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    // console.log(account);

    let data = {
      addr: account,
      pseudoName: "XYZ",
      title: formData.title,
      description: formData.content,
      tag: formData.topic,
      minimum_signature: Number(formData.signCount),
      current_signature: 0,
      CID_from_lighthouse: cid,
    };

    await createPetitionTable(signer, data);
    setSuccess(true);
    setLoader(false);
  };

  const makeMainPetitionTable = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    createMainPetitionTable(signer);
  };

  return (
    <div>
      {success && (
        <div
          className="absolute w-screen h-[100%] bg-slate-500 flex justify-center items-center -z-1"
          style={{ background: "rgba(0, 0, 0, 0.27)" }}
        >
          <div className="z-1000 w-[450px] h-[430px] text-center bg-white rounded-xl py-14 px-10 flex flex-col justify-between">
            <div>
              <h2 className=" text-[1.5rem] mb-7">
                Thank you for publishing a petition!
              </h2>
              <p className="font-medium">
                Congratulations on Publishing Your Petition - Thank You!
              </p>
            </div>
            <div>
              <button
                onClick={() => setSuccess(true)}
                className="bg-[#2CAE8F] text-white py-2 px-6 w-52 mt-3 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
              >
                Share this Petition
              </button>
              <Link to="/">
                <button
                  onClick={() => setSuccess(true)}
                  className=" text-black border-2 bg-white border-black py-2 px-8 w-52 mt-3 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                >
                  Go to Home
                </button>
              </Link>
            </div>
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
        <div className="z-1 w-screen flex flex-col justify-center items-center gap-8">
          <div className=" flex w-[100%] justify-between items-center py-5 px-[8%] bg-[#DBFFF6]">
            <p className="text-[1.1rem]">
              Almost done! Preview your Petition and make sure everything looks
              good.
            </p>
            <div className=" flex justify-end gap-3">
              <Link to="/start-a-petition">
                <button
                  // onClick={() => makeMainPetitionTable()}
                  className=" text-black border-2 bg-white border-black py-2 px-8 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                >
                  Edit
                </button>
              </Link>
              <button
                onClick={() => createPetition()}
                className="bg-[#2CAE8F] text-white py-2 px-8 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="contentSection mx-[10%] my-[5rem]">
        <div className="headingSection ">
          <h1 className="text-[2.5rem] font-semibold text-center">
            {formData ? formData.title : "Title"}
          </h1>
          <div className="mt-[3rem] w-[850px] mx-auto">
            <p className="text-[#2CAE8F] text-[1rem] ">
              {formData ? formData.topic.toUpperCase() : "TAG"}
            </p>
            {/* <p className="text-[#878181] text-[0.9rem] font-medium">
              September 19, 2022
            </p> */}
          </div>
        </div>
        <div className="flex my-[1rem] justify-center">
          <div className="w-[850px] h-[520px] bg-[#D9D9D9] rounded-xl overflow-hidden -z-10">
            {/* <img src={selectedImage} alt="Image Preview"></img> */}

            <Slider data={formData ? formData.file : ""} />
          </div>
        </div>
        <div className="flex text-[#636363] items-center gap-3 w-[850px] mx-auto mb-5">
          <div className=" h-12 w-12 rounded-full bg-[#D9D9D9]"></div>
          <div className="font-medium">
            <b className="font-bold text-black text-[1.1rem]">Lorem Ipsum</b>{" "}
            started this Petition
          </div>
        </div>
        <div className="infoSection text-[#636363] font-medium leading-loose w-[850px] mx-auto text-justify">
          <p>{formData ? formData.content : "Content"}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Publish;
