'use client'; // This tells Next.js this is a Client Component

import { useEffect, useState } from "react";

export default function WebSocketProvider() {
  useEffect(() => {
    // Using the IP address as discussed to avoid DNS/Postman issues
    const socket = new WebSocket("ws://127.0.0.1:8080/ws");
    (window as any).socket = socket;

    socket.onopen = () => {
      console.log("✅ Connected to Go Backend!");
      socket.send("Hello from Next.js");
    };

    socket.onmessage = (event) => {
      console.log("📩 New message from Go Engine:", event.data);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    return () => socket.close();
  }, []);

  return null; // This component doesn't render anything, it just runs logic
}