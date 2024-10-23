import "./styles.css";
import { useState } from "react";
import { PrevButton, NextButton } from "./buttonHover";
// import building from "../public/building-icon.svg";
import Icon from "./asset/asset1.jsx";

export default function ListingAd({
  pic,
  title,
  address,
  subprice_label,
  project_type,
  year,
  ownership_type,
  availabilities_label,
  description,
  psf_min,
  psf_max,
}) {
  const [showDes, setShowDes] = useState(false);
  const [revealedNumbers, setRevealedNumbers] = useState({});
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const newpsf_min = psf_min.toLocaleString();
  const newpsf_max = psf_max.toLocaleString();
  const image = [
    pic,
    "https://www.perennialholdings.com/images/properties/sg/Forett/Forett-1.jpg",
    "https://esingaporeproperty.sg/wp-content/uploads/2018/03/Forett-Bukit-Timah-Sky-Terrace.jpg",
  ];
  const sentencesArray = description
    .split("\n")
    .map((sentence) => sentence.trim());
  const value08 = sentencesArray.slice(0, 9);
  const phoneNumbers = [];
  value08.forEach((sentence) => {
    const matches = sentence.match(/(\d{4}\s\d{4}|\d{8})/g);
    if (matches) {
      phoneNumbers.push(...matches);
    }
  });
  console.log("Found phone numbers:", phoneNumbers);
  // const findIndexFor83456789 = (array) => {
  //   const index = array.findIndex((sentence) => sentence.includes("83456789"));
  //   return index >= 0
  //     ? { start: index, end: index + "83456789".length - 1 }
  //     : null; // Return null if not found
  // };
  // const findIndexFor82345678 = (array) => {
  //   const index = array.findIndex((sentence) => sentence.includes("8234 5678"));
  //   return index >= 0
  //     ? { start: index, end: index + "8234 5678".length - 1 }
  //     : null; // Return null if not found
  // };
  // const indexOf83456789 = findIndexFor83456789(sentencesArray);
  // const indexOf82345678 = findIndexFor82345678(sentencesArray);
  // console.log("Index for 83456789:", indexOf83456789);
  // console.log("Index for 8234 5678:", indexOf82345678);
  const mask = (text) => {
    return text.replace(/(\d{4})\s?(\d{4})/g, (match, p1, p2) => {
      return p1 + (match.includes(" ") ? " XXXX" : "XXXX");
    });
  };

  const desc = description
    .replace(/bus\s*\n\s*station/g, "bus station")
    .replace(
      /(Please call Alex B \(\s*\) @ 8234\s?\d{4})/g,
      "$1 (CEA No: R0123456) or the owner (83456789)"
    )
    .replace(/\.\s*\n/g, ".\n")
    .trim();
  const sentences = desc.split("\n").map((sentence) => {
    return mask(sentence);
  });
  const handleReveal = (maskedSentence) => {
    phoneNumbers.forEach((phoneNumber) => {
      const maskedNumber = phoneNumber.replace(/\d{4}$/, "XXXX");
      if (maskedSentence.includes(maskedNumber)) {
        const lastFourDigits = phoneNumber.slice(-4);
        const realNumber = maskedSentence.replace(/XXXX/g, lastFourDigits);
        setRevealedNumbers((prev) => ({
          ...prev,
          [maskedSentence]: realNumber,
        }));
      }
    });
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === image.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="App">
      {/* pic start */}
      <div
        className="mainpic"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="icon">
          <Icon width="100px" height="100px" />
        </div>
        <img className="Pic" src={image[currentIndex]} alt="Listing" />
        {hovered && (
          <>
            <PrevButton onClick={handlePrev} />
            <NextButton onClick={handleNext} />
          </>
        )}
      </div>
      {/* pic end */}
      {/* content start */}
      <div className="mainContent">
        {/* detail structure (title,icon,address) start*/}
        <div className="detail">
          {/* <icon width="100" height="100" /> */}
          {/* <img src=building alt="" srcset="" /> */}
          {/* <img
            src={`${process.env.PUBLIC_URL}/building-icon.svg`}
            width="100"
            height="100"
          /> */}
          <img src="/building-icon.svg" className="building" />
          <div className="ket">
            <h1>{title}</h1>
            <p className="address">{address}</p>
          </div>
          <div className="sum">
            <p className="type">
              {project_type} .{year} .{ownership_type}
            </p>
            <p className="available">{availabilities_label}</p>
          </div>
        </div>
        {/* detail structure (title,icon,address) end*/}
        {/* price structure (psf,price tag) start*/}
        <div className="price">
          {/* <div id="display">{pricedis}</div> */}
          <p className="display">
            ${newpsf_min} - ${newpsf_max} psf
          </p>
          <p className="priceDet">{subprice_label}</p>
        </div>
        {/* price structure (psf,price tag) end*/}
      </div>
      {/* content end */}
      {/* sum structure (type + available) start*/}
      {/* <button>See description</button> */}
      {/* <p className="description">{description}</p> */}
      {/* <div className="dsctn">
        {sentences.map((sentence, index) => (
          <p key={index} className="description">
            {sentence}
          </p>
        ))}
      </div> */}
      {/* sum structure (type + available) end*/}
      <button className="seedes" onClick={() => setShowDes(!showDes)}>
        {showDes ? "Hide description" : "See description"}
      </button>
      {showDes && (
        <div className="dsctn">
          {sentences.map((sentence, index) => (
            <p key={index} className="description">
              {revealedNumbers[sentence] || sentence}{" "}
              {!revealedNumbers[sentence] && sentence.includes("XXXX") && (
                <span
                  onClick={() => {
                    phoneNumbers.forEach((phoneNumber) => {
                      const maskedNumber = phoneNumber.replace(
                        /\d{4}$/,
                        "XXXX"
                      );
                      if (sentence.includes(maskedNumber)) {
                        const lastFourDigits = phoneNumber.slice(-4);
                        const realNumber = sentence.replace(
                          /XXXX/g,
                          lastFourDigits
                        );
                        setRevealedNumbers((prev) => ({
                          ...prev,
                          [sentence]: realNumber,
                        }));
                      }
                    });
                  }}
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                    marginLeft: "5px",
                  }}
                >
                  (Click to Reveal)
                </span>
              )}
              {revealedNumbers[sentence] && (
                <span
                  onClick={() => {
                    setRevealedNumbers((prev) => ({
                      ...prev,
                      [sentence]: null,
                    }));
                  }}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    textDecoration: "underline",
                    marginLeft: "5px",
                  }}
                >
                  (Click to Mask)
                </span>
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
