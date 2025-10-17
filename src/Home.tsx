import React from "react";
import Navbar from "./components/Navbar";
import InputCnt from "./components/InputCnt";
import List from "./components/List";
import Tabs from "./components/Tabs";

const Home = () => {
  const [bgThemes, setBgThemes] = React.useState({
    from: "#314755",
    to: "#26a0da",
  });
  const [welcomeMessage, setWelcomeMessage] = React.useState("Good Morning");

  const timeBgChanger = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
      setBgThemes({
        from: "#FF9A8B",
        to: "#FF6A88",
      });
      setWelcomeMessage("Sabahınız Xeyir");
    } else if (hours >= 12 && hours < 17) {
      setBgThemes({
        from: "#36D1DC",
        to: "#5B86E5",
      });
      setWelcomeMessage("Günortanız Xeyir");
    } else if (hours >= 17 && hours < 21) {
      setBgThemes({
        from: "#FF6B6B", // Coral red
        to: "#FFE66D", // Soft yellow
      });
      setWelcomeMessage("Axşamınız Xeyir");
    } else {
      setBgThemes({
        from: "#0F2027", // Dark blue
        to: "#203A43", // Medium blue
      });
      setWelcomeMessage("Gecəniz Xeyir");
    }
  };

  React.useEffect(() => {
    timeBgChanger();

    const interval = setInterval(timeBgChanger, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${bgThemes.from}, ${bgThemes.to})`,
      }}
      className={`flex flex-col items-center  h-screen  w-full  `}
    >
      <Navbar message={welcomeMessage} />
      <div className="max-h-full flex flex-col max-w-5xl w-full mx-auto p-2 gap-2">
        <InputCnt />
        <Tabs />
        <List />
      </div>
    </div>
  );
};

export default Home;
