
"use client";
import Form from "@/components/Form";
import MyButton from "@/components/MyButton";

export default function Home() {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center items-center h-screen">
        <Form />
      </div>
      <div className="flex justify-end">
         <MyButton style={{ backgroundColor: "#B2BEB5", width: 100, position: 'fixed', right: 5, bottom: 5 }} label="Add"/>
      </div>
    </div>
  );
}
