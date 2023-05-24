import React, { useEffect, useState } from "react";
import { Card, Footer, Header } from "../components";
import { Link } from "react-router-dom";
import { readData } from "../utils/functions";

import { ethers } from "ethers";

const Home = () => {
  const [petitionData, setPetitionData] = useState();

  useEffect(() => {
    const getPetitionsData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setPetitionData(await readData(signer, "allPetition_80001_6419"));
      // setPetitionData(await readData(signer, "allPetition_3141_194"));
    };
    getPetitionsData();
  }, []);
  console.log(petitionData);

  return (
    <div>
      <Header />
      <div className="HeroSection ">
        <div className="absolute -z-10 w-screen flex  justify-center items-center">
          <img
            src={require("../assets/map.png")}
            className="w-[60%]"
            alt="images"
          ></img>
        </div>
        <div className="z-1 w-screen flex flex-col justify-center items-center gap-8 pt-[5rem]">
          <h1 className="font-bold text-[3rem] text-center">
            The world’s platform for change
          </h1>
          <h2 className="text-[1.2rem]">
            Unite, Amplify, and Make a Difference - Join Our Petition Community
            Today!
          </h2>
          <Link
            to="/start-a-petition"
            className="bg-[#2CAE8F] text-white py-2 px-4 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
          >
            Star a Petition
          </Link>
        </div>
      </div>

      <ul
        id="browse"
        className="flex justify-center items-center gap-20 text-[#878181] bg-white py-5 w-[90%] mx-auto rounded-lg mt-[5rem]"
        style={{ boxShadow: "0px -3px 19px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="cursor-pointer hover:text-black text-center">
          Environmental <br /> Conservation
        </div>
        <div className="h-7 w-[2px] bg-[#878181]"></div>
        <div className="cursor-pointer hover:text-black text-center">
          Gender <br /> Equality
        </div>
        <div className="h-7 w-[2px] bg-[#878181]"></div>
        <div className="cursor-pointer hover:text-black text-center">
          Sustainable
          <br /> Development
        </div>
        <div className="h-7 w-[2px] bg-[#878181]"></div>
        <div className="cursor-pointer hover:text-black text-center">
          Economic
          <br /> Justice
        </div>
      </ul>

      <div className="blogList mx-[10%] my-[6rem] flex flex-wrap justify-center gap-16">
        {petitionData && petitionData.length
          ? petitionData.map((item) => {
              return <Card data={item} key={item.sign_table} />;
            })
          : ""}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
