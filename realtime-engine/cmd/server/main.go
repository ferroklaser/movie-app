package main

import (
	"log"
	"net/http"
	ws "realtime/internal/websocket"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func wsHandler(hub *ws.Hub, w http.ResponseWriter, r *http.Request) {
	log.Println("--- New Handshake Request Received ---")
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Printf("websocket upgrade failed: %v", err)
		http.Error(w, "websocket upgrade failed", http.StatusBadRequest)
		return
	}
	log.Println("Handshake Successful: Connection Upgraded")

	client := &ws.Client{
		Hub:  hub,
		Conn: conn,
		Send: make(chan []byte, 256),
	}

	client.Hub.Register <- client
	log.Println("Client sent to Hub registration")

	go client.WritePump()
	go client.ReadPump()
}

func main() {
	hub := ws.NewHub()

	go hub.Run()

	// define /ws route, when someone visits, run handler
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsHandler(hub, w, r)
	})

	// start the server
	log.Println("Realtime engine starting on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
