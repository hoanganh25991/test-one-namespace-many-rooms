var socket;
window.onload = function(){
    socket = io();
    //use socket directly
    //A send msg to D
    var msg = {
        socketID: socket.id,
        from: "A",
        to: "D",
        date: new Date().getTime().toString()
    };
    socket.emit("D", JSON.stringify(msg));
    //A listen to msg from D
    socket.on("A", function(msgFromD){
        console.log("msgFromD: ", msgFromD);
    });
    //fake msgFromD
    setInterval(function(){
        //D send msg to A
        var msg = {
            socketID: "fake msg from D",
            from: "D",
            to: "A",
            date: new Date().getTime().toString()
        };
        socket.emit("A",JSON.stringify(msg));
    }, 2000);
};