"use client";

import { useState, useEffect, useRef } from "react";
import audioFile from "@/Assets/perfect_alarm.mp3";
import Image from "next/image";
import img from "@/Assets/giphy.gif";

function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [timeZone, setTimeZone] = useState("pm");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmHour, setAlarmHour] = useState(0);
  const [alarmMin, setAlarmMin] = useState(0);
  const [alarmZone, setAlarmZone] = useState(0);
  // const [AlarmAlert, setAlarmAlert] = useState(false);

  const alarmAudio = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAlarm = () => {
    if (
      alarmHour == currentTime.slice(0, 2) &&
      alarmMin === currentTime.slice(5, 7) &&
      alarmZone === currentTime.slice(8, 10)
    ) {
      alarmAudio.current.play();
      // setAlarmAlert(true);
      setTimeout(() => {
        setAlarmTime(" ");
        setDisable(false);
      }, 20000);
    }
  };

  const getCurrentTime = () => {
    let getHour = new Date().getHours();
    let getMinutes = new Date().getMinutes();
    let time;

    if (getHour > 12) {
      time = `${getHour - 12 < 10 ? `0${getHour - 12}` : getHour - 12} : ${
        getMinutes < 10 ? `0${getMinutes}` : getMinutes
      } pm`;
    } else {
      time = `${getHour} : ${
        getMinutes < 10 ? `0${getMinutes}` : getMinutes
      } am`;
    }
    setCurrentTime(time);
  };

  // const handleStopAlarm = () => {
  //   // alarmAudio.current.pause();
  //   // setAlarmTime(" ");
  //   // setDisable(false);
  //   setAlarmAlert(false);
  // };

  const handleSetAlarm = () => {
    if (!hour || hour < 1 || hour > 12) {
      setError("Please enter a valid hour (1-12).");
      // return;
    } else if (!min || min < 0 || min >= 60) {
      setError("Please enter a valid minute (0-59).");
      return;
    }else if (hour.match(/[a-zA-Z]/)) {
      setError("Hour should be a number.");
      return;
    } else if (min.match(/[a-zA-Z]/)) {
      setError("Minute should be a number.");
      return;
    }else {
      setHour("");
      setMin("");
      setTimeZone("");
      setError("");
      setAlarmTime(`Alarm set for: ${hour}:${min} ${timeZone}`);
      setAlarmHour(hour);
      setAlarmMin(min);
      setAlarmZone(timeZone);
      setDisable(true);
    }
  };
  handleAlarm();

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center flex-col overflow-hidden">
        <div className="h-[65vh] w-[95%] mx-2 md:w-[35vw] px-2 flex justify-center items-center flex-col">
          <div className="currentTime mb-10">
            <h1 className="text-4xl mb-10">Current Time</h1>
            <p className="text-3xl text-center">{currentTime}</p>
          </div>
          <div className="line w-[97%] md:w-[400px] h-1 rounded-full bg-slate-50"></div>
          <div className="alarm mt-10">
            <h1 className="text-4xl mb-5 text-center">Set Alarm</h1>
            <div className="text-center mb-5 font-semibold">{alarmTime}</div>
            <div className="flex justify-center text-black">
              <input
                autoFocus
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    document.querySelector("#input_2").focus();
                  }
                }}
                type="text"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="Enter Hour"
                className="outline-none bg-slate-300 me-3 border-2 border-gray-300 p-2 w-[27vw] md:w-40 rounded-md"
              />
              <input
                id="input_2"
                type="text"
                value={min}
                onChange={(e) => {
                  setMin(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    document.querySelector("button").focus();
                  }
                }}
                placeholder="Enter Minutes"
                className="rounded-md bg-slate-300 outline-none border-2 border-gray-300 p-2 w-[27vw] md:w-40"
              />
              <select
                name="timeZone"
                id="timeZone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="p-2 w-[16vw] md:w-16 h-10 mt-[2px] ms-3 rounded-md outline-none bg-slate-300"
              >
                <option value="pm">pm</option>
                <option value="am">am</option>
              </select>
            </div>
            {error && (
              <p className="text-red-500 text-2xl text-center mt-3">{error}</p>
            )}
            {disable ? (
              <button className="mt-5 bg-blue-500 hover:bg-blue-600 text-black ml-7 md:ml-16 text-2xl w-[250px] h-16 rounded-full">
                Set Alarm
              </button>
            ) : (
              <button
                className="mt-5 bg-blue-500 hover:bg-blue-600 text-black ml-7 md:ml-16 text-2xl w-[250px] h-16 rounded-full"
                onClick={handleSetAlarm}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    document.querySelector("button").click();
                  }
                }}
              >
                Set Alarm
              </button>
            )}
          </div>
        </div>

        <audio ref={alarmAudio} src={audioFile} preload="auto"></audio>
        {/* {AlarmAlert && (
          <div className="w-[50%] h-[60%] flex flex-col justify-center items-center bg-slate-600 absolute rounded-lg">
            <h1 className="text-4xl text-center text-black">Wake Up Dear !</h1>
            <div className="alarmGIF w-[30%] h-[40%] mb-16 ">
              <Image
                src={img}
                width={1000}
                height={1000}
                alt="Picture of the alarm"
              />
            </div>
            <button
              type="button"
              className="w-[20%] h-[10%] bg-red-600 rounded-md hover:bg-red-700 px-2"
              // onClick={handleStopAlarm}
            >
              Stop
            </button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Home;
