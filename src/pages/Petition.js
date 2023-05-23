import React, { useState } from "react";
import { Footer, Header } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../redux/actions";
import { uploadFile } from "../utils/fileUpload";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";

const Petition = () => {
  const [slider, moveSlider] = useState(0);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [maxLimit, setmaxLimit] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [signCount, setSignCount] = useState(5);
  const [loader, setLoader] = useState(false);
  // const { data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(data);

  const optionData = [
    {
      id: 1,
      name: "Environmental Conservation",
    },
    {
      id: 2,
      name: "Human Rights",
    },
    {
      id: 3,
      name: "Social Justice",
    },
    {
      id: 4,
      name: "Public Health",
    },
    {
      id: 5,
      name: "Education Reform",
    },
    {
      id: 6,
      name: "Animal Welfare",
    },
    {
      id: 7,
      name: "Gender Equality",
    },
    {
      id: 8,
      name: "Sustainable Development",
    },
    {
      id: 9,
      name: "Economic Justice",
    },
    {
      id: 10,
      name: "Racial Equity",
    },
  ];

  const activateError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1000);
  };
  console.log(file);

  // *********************************

  const handleFileUpload = async (e) => {
    setLoader(true);
    let cid = await uploadFile(e);
    await setFile([...file, cid]);
    setLoader(false);

    if (file.length > 3) {
      setmaxLimit(true);
    }
    // let tempData = e;
    // setFile([...file, tempData]);
    // setFileShow([...fileShow, e.target.files[0].name]);
  };

  const handleSubmit = async () => {
    console.log(file);
    const data = {
      topic,
      signCount,
      title,
      content,
      file,
    };
    if (data && file) {
      await dispatch(submitForm(data));
      setTimeout(() => {
        navigate("/publish");
      }, 500);
    } else {
      activateError();
    }
  };

  return (
    <div>
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
          <img
            src={require("../assets/map.png")}
            alt="images"
            className="w-[60%]"
          ></img>
        </div>
        <div className="formContainer overflow-hidden">
          <div
            className="formHorizontalLength w-[400vw] h-[120vh] flex"
            style={{
              transform: `translateX(-${slider}vw)`,
              transition: "ease 0.5s",
            }}
          >
            <div className="w-[100vw] h-[100vh]">
              <div className="z-1 w-[700px] mx-auto flex flex-col items-start gap-8 pt-[5rem]">
                <h1 className="font-bold text-[2.7rem] ">
                  What's the topic that best fits your petition?
                </h1>
                <ul className="flex flex-wrap gap-2">
                  {optionData.map(({ id, name }) => {
                    return (
                      <li
                        key={id}
                        onClick={() => setTopic(name)}
                        className={`py-2 px-3 flex justify-center items-center cursor-pointer rounded-md bg-white border-2 border-black hover:border-[#2CAE8F] hover:text-[#2CAE8F]`}
                      >
                        {name}
                      </li>
                    );
                  })}
                </ul>
                <div className="w-[100%]">
                  <input
                    type="text"
                    value={topic}
                    className="h-10 w-[100%] rounded-md border-[#C2C2C2] border-2 px-5"
                    onChange={(e) => {
                      return 0;
                    }}
                  ></input>
                  <p className="text-red-600 mt-2 h-6">
                    {error ? "Please enter valid Topic" : ""}
                  </p>
                </div>
                <div className="w-[100%] flex justify-end gap-3">
                  <Link
                    to="/"
                    className=" text-black border-2 bg-white border-black py-2 px-8 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                  >
                    Back
                  </Link>
                  <button
                    className="bg-[#2CAE8F] text-white py-2 px-8 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                    onClick={() => {
                      topic ? moveSlider(slider + 100) : activateError();
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[100vw] h-[100vh]">
              <div className="z-1 w-[700px] mx-auto flex flex-col items-start gap-8 pt-[5rem]">
                <div>
                  <h1 className="font-bold text-[2.7rem] ">
                    Write your petition title
                  </h1>
                  <h3 className="text-[#5F5F5F]">
                    Tell people what you want to change.
                  </h3>
                </div>
                <div className="w-[100%] flex flex-col gap-1">
                  <h3>Petition title</h3>
                  <div className="w-[100%]">
                    <input
                      type="text"
                      className="h-10 w-[100%] rounded-md border-[#C2C2C2] border-2 px-5"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <p className="text-red-600 mt-2 h-6">
                      {error ? "Please enter valid Title" : ""}
                    </p>
                  </div>
                </div>
                <div className="w-[100%] flex justify-end gap-3">
                  <button
                    className=" text-black border-2 border-black py-2 px-8 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                    onClick={() => moveSlider(slider - 100)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#2CAE8F] text-white py-2 px-8 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                    onClick={() => {
                      title ? moveSlider(slider + 100) : activateError();
                    }}
                  >
                    Continue
                  </button>
                </div>
                <div className="bg-[#DBFFF6] py-8 px-12 leading-relaxed text-[1.1rem] font-medium text-[#5F5F5F] rounded-lg">
                  <h1>Tips</h1>
                  <ul className="list-disc leading-20">
                    <li>Keep it concise</li>
                    <li>
                      Example: "Choose organic, free-range eggs for your
                      restaurants."
                    </li>
                    <li>Highlight the solution</li>
                    <li>
                      Example: "Raise the minimum wage to ₹300 a day for fair
                      compensation."
                    </li>
                    <li>Convey urgency</li>
                    <li>
                      Example: "Urgently approve life-saving medication for my
                      daughter's insurance."
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-[100vw] h-[100vh]">
              <div className="z-1 w-[700px] mx-auto flex flex-col items-start gap-8 pt-[5rem]">
                <div>
                  <h1 className="font-bold text-[2.7rem] ">Tell your story</h1>
                  <h3 className="text-[#5F5F5F]">
                    Start from scratch or use our recommended structure below.
                    You can always edit your petition, even after publishing.
                  </h3>
                </div>
                <div className="w-[100%]">
                  <textarea
                    type="text"
                    value={content}
                    className="h-32 w-[100%] rounded-md border-[#C2C2C2] border-2 px-5 py-3"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <p className="text-red-600 mt-2 h-6">
                    {error ? "Please enter valid Content" : ""}
                  </p>
                </div>
                <div className="w-[100%] flex justify-end gap-3">
                  <button
                    className=" text-black border-2 border-black py-2 px-8 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                    onClick={() => moveSlider(slider - 100)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#2CAE8F] text-white py-2 px-8 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                    onClick={() => {
                      content ? moveSlider(slider + 100) : activateError();
                    }}
                  >
                    Continue
                  </button>
                </div>
                <div className="bg-[#DBFFF6] w-[100%] py-8 px-12 leading-relaxed text-[1.1rem] font-medium text-[#5F5F5F] rounded-lg">
                  <h1>Tips</h1>
                  <p>Tips for Writing Effective Petitions:</p>
                  <div className="mt-2">
                    <p>Paragraph 1: Address the Impact:</p>
                    <p>
                      Clearly describe the real-life impact of the problem on
                      individuals or communities. Provide specific examples and
                      personal stories to make it relatable.
                    </p>
                  </div>
                  <div className="mt-2">
                    <p>Paragraph 2: Highlight the Significance:</p>
                    <p>
                      Explain the consequences and implications of the issue at
                      hand. Emphasize what will be gained or lost if the
                      situation remains unchanged. Use factual evidence and data
                      to support your claims.
                    </p>
                  </div>
                  {/* <div className="mt-2">
                    <p>Paragraph 3: Urgency for Action:</p>
                    <p>
                      Stress the importance of taking immediate action. Explain
                      why the current moment is crucial for addressing the
                      problem. Highlight any time-sensitive factors or emerging
                      trends that make action necessary.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="w-[100vw] h-[100vh]">
              <div className="z-1 w-[700px] mx-auto flex flex-col items-start gap-5 pt-[5rem]">
                <div>
                  <h1 className="font-bold text-[2.7rem] ">Add an image</h1>
                  <h3 className="text-[#5F5F5F]">
                    Petitions with a photo get six times more signatures than
                    petitions without a photo.
                  </h3>
                </div>
                <div className="w-[100%] flex flex-col  gap-2">
                  <h3>
                    Add Photo | Image sizes of at least 1200 x 675 pixels will
                    look good on all screens
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {file
                      ? file.map((item) => {
                          console.log(item);
                          return (
                            <div
                              key={item}
                              className="w-52 h-10 border-2 border-[#646464] rounded-md bg-white"
                            >
                              file
                            </div>
                          );
                        })
                      : "empty"}
                    {!maxLimit && (
                      <input
                        type="file"
                        className=" border-2 border-[#646464] w-56 rounded-md bg-white"
                        onChange={(e) => handleFileUpload(e)}
                      />
                    )}
                  </div>
                  <p className="text-red-600 h-6">
                    {error ? "Please choose media file to upload" : ""}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-[2.5rem] ">
                    Minimum Signatures required
                  </h1>
                  <input
                    type="number"
                    value={signCount}
                    className="h-10 w-[50%] rounded-md border-[#C2C2C2] border-2 px-5 "
                    onChange={(e) => setSignCount(e.target.value)}
                  ></input>
                </div>

                <div className="w-[100%] flex justify-end gap-3">
                  <button
                    className=" text-black border-2 border-black py-2 px-8 rounded-[5px] text-[1.1rem] hover:border-[#878181] hover:text-[#878181]"
                    onClick={() => moveSlider(slider - 100)}
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#2CAE8F] text-white py-2 px-8 rounded-[5px] text-[1.1rem] hover:bg-[#1F9B7E]"
                    onClick={() => handleSubmit()}
                  >
                    Save and Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Petition;
