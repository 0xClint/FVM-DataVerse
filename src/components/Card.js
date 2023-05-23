import React from "react";
import { Link } from "react-router-dom";

const Card = ({ width, data }) => {
  return (
    <Link to={`/petitions/${data ? data.sign_table : "1"}`}>
      <div className="Card flex flex-col gap-3">
        <div
          className={`h-[300px] w-[500px] bg-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center`}
        >
          <img
            src={`https://gateway.lighthouse.storage/ipfs/${data.cid[0]}`}
            className="h-[100%]"
          ></img>
        </div>
        <div className={`w-[500px] flex flex-col gap-1`}>
          <p className="text-[#2CAE8F] text-[0.8rem]">
            {data.tag.toUpperCase()}
          </p>
          <h2 className="font-bold">{data.title}</h2>
          {/* <p className="text-[#878181] font-medium">September 19, 2022</p> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
