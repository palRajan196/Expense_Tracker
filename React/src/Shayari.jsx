import { useState, useEffect } from "react";

function Shayari() {
  const shayariList = [
    "Mehnat itni khamoshi se karo ki safalta shor macha de.",
    "Khud par vishwas rakho, manzil zaroor milegi.",
    "Sapne woh hain jo sone nahi dete.",
    "Har din ek nayi shuruaat hai.",
    "Kabhi haar mat maano.",
  ];
  const today = new Date();
  const [shayari, setShayari] = useState("");

  // unique number for each day
 

  useEffect(() => {
    const index =
      Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
      shayariList.length;

    setShayari(shayariList[index]);
  }, []);

  return (
    <>
      <p style={{ fontStyle: "italic", color: "green", textAlign:"center" , marginBottom:"10px"}}>💬 {shayari}</p>
    </>
  );
}

export default Shayari;