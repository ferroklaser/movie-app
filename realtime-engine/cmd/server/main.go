package main

import (
	"context"
	"log"
	"net/http"
	ws "realtime/internal/websocket"

	"github.com/gorilla/websocket"
	"github.com/redis/go-redis/v9"
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
	go listenToRedis(hub)

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

func listenToRedis(hub *ws.Hub) {
	ctx := context.Background()

	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	pubsub := rdb.Subscribe(ctx, "movieActivityUpdates")
	defer pubsub.Close()

	for {
		msg, err := pubsub.ReceiveMessage(ctx)

		if err != nil {
			log.Printf("Redis error: %v", err)
			continue
		}

		hub.Broadcasts <- []byte(msg.Payload)
	}
}
