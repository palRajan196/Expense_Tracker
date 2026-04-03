import { useState, useEffect } from "react";

function Shayari() {
  const shayariList = [
    "Mehnat itni khamoshi se karo ki safalta shor macha de.",
  "Haar mat maano mushkilon se, jeet ek din zaroor milegi.",
  "Sapne woh nahi jo sote waqt aate hain, sapne woh hain jo sone nahi dete.",
  "Zindagi mein agar kuch banna hai, toh apne dum par banna hai.",
  "Raat jitni bhi gehri ho, subah utni hi roshan hoti hai.",
  "Apni kismat khud likhni padti hai, yeh koi chitthi nahi jo doosre likh dein.",
  "Jo mehnat se darta hai, wo kabhi safalta nahi paata.",
  "Aaj mushkil hai toh kya hua, kal ka din tumhara hoga.",
  "Gir kar uthna hi zindagi hai, har haar mein jeet chhupi hoti hai.",
  "Khud par bharosa rakhna seekho, duniya tum par bharosa karna seekh jayegi.",
  "Manzil unhi ko milti hai jo raste mein rukte nahi.",
  "Hausla rakho, andhera jitna gehra hoga, roshni utni tez hogi.",
  "Safalta ek din mein nahi milti, par ek din zaroor milti hai.",
  "Khud ko itna strong banao ki mushkilein bhi dar jaayein.",
  "Har choti jeet bhi ek badi jeet ki shuruaat hoti hai.",
  "Waqt se pehle aur kismat se zyada kisi ko kuch nahi milta.",
  "Jo log apni soch badal lete hain, wahi duniya badal dete hain.",
  "Kabhi bhi apne sapno ka peecha karna mat chhodo.",
  "Mehnat ka phal der se milta hai, par meetha hota hai.",
  "Akele chalna seekho, log saath tab aayenge jab tum successful ho jaoge."
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
      <p style={{ fontStyle: "italic", color: "green", textAlign:"center" , marginBottom:"10px"}}>{shayari}</p>
    </>
  );
}

export default Shayari;