package websocket

type Hub struct {
	clients    map[*Client]bool
	broadcasts chan []byte
	register   chan *Client
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcasts: make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (hub Hub) run() {
	for {
		select {
		case client := <-hub.register:
			hub.clients[client] = true
		case client := <-hub.unregister:
			if _, ok := hub.clients[client]; ok {
				delete(hub.clients, client)
				close(client.send)
			}
		case msg := <-hub.broadcasts:
			for client := range hub.clients {
				select {
				case client.send <- msg:
					//Message successful
				default:
					close(client.send)
					delete(hub.clients, client)
				}
			}
		}
	}
}
