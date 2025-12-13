
"use client";
import MyButton from "@/components/MyButton";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
      <div className="flex justify-center items-center bg-red-500 h-screen">
        <MyButton label={count.toString()} onClick={handleClick}></MyButton>
      </div>
  );
}
