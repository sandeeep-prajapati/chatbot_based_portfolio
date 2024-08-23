import React from "react";
import img from "../assets/profile.jpg";
import { ReactTyped } from "react-typed";
export default function banner() {
  return (
    <div className="flex">
      <div className=" w-[70%] justify-center content-center items-center justify-center">
        <p className=" p-7 w-100 md:pl-[100px] text-2xl ">
          <b>AI/ML and IOT based Full Stack developer</b> : As a versatile Full
          Stack Developer with expertise in AI/ML and IoT, I thrive in dynamic
          environments where innovation meets technology. With a passion for
          building scalable and efficient solutions, I am eager to join a
          forward-thinking organization that prioritizes continuous learning and
          growth. I am excited to leverage my skills and experience to drive
          meaningful impact, collaborate with like-minded professionals, and
          push the boundaries of what is possible in the tech landscape.
        </p>
      </div>
      <div className="w-[30%]">
        <img className=" p-5 pt-10  rounded-md" src={img}/>
      </div>
    </div>
  );
}
