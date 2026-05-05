package websocket

import "github.com/gorilla/websocket"

type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}

func (client *Client) readPump() {
	defer func() {
		client.hub.unregister <- client
		client.conn.Close()
	}()

	for {
		// server reads message from user
		_, message, err := client.conn.ReadMessage()

		if err != nil {
			break
		}
		client.hub.broadcasts <- message
	}
}

func (client *Client) writePump() {
	defer func() {
		client.conn.Close()
	}()

	for {
		message, ok := <-client.send

		if !ok {
			client.conn.WriteMessage(websocket.CloseMessage, []byte{})
			return
		}

		err := client.conn.WriteMessage(websocket.TextMessage, message)

		if err != nil {
			return
		}
	}
}
