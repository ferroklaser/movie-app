
"use client";
import Form from "@/components/Form";
import MovieList from "@/components/MovieList";
import MyButton from "@/components/MyButton";
import { useState } from "react";

export default function Home() {
  const [isFormVisible, setFormVisible] = useState(false);

  const setFormVisibleOnClick = () => {
    setFormVisible(true);
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        {isFormVisible && <Form isVisible={isFormVisible} setVisible={setFormVisible} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>}
        <MovieList />
      </div>
      <div className="flex justify-end">
         <MyButton style={{ backgroundColor: "#B2BEB5", width: 100, position: 'fixed', right: 5, bottom: 5 }} label="Add" onClick={setFormVisibleOnClick}/>
      </div>
    </div>
  );
}
