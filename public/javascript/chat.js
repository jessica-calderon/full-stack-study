socket = io();

socket.emit("new-user", "John");

function makeInboundMessage(text) {
    return $(`<div class="d-flex flex-row justify-content-start">
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
    <div>
      <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;">${text}</p>
    </div>
  </div>`)
}

function makeOutboundMessage(text) {
    return $(`<div class="d-flex flex-row justify-content-end mb-4 pt-1">
    <div>
      <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-purple">${text}</p>
    </div>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
  </div>`)
}



$(() => {
    let chatContainer = $("#chat-container")
    $("#send-button").on("click", (e) => {
        e.preventDefault();
        console.log("ok")
        const message = $("#message-input").val();
        socket.emit("send-chat-message", message);
        let newMessage = makeOutboundMessage(message);
        chatContainer.append(newMessage);
        chatContainer.scrollTop(chatContainer[0].scrollHeight);
        $("#message-input").val("");
    });

    socket.on('chat-message', (messageData) => {
        let newMessage = makeInboundMessage(messageData.message);
        $("#chat-container").append(newMessage);
    });
});