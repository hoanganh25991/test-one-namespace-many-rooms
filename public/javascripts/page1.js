var socket;
window.onload = function(){
    socket = io();
    //use socket directly
    //A send msg to B
    var msg = {
        socketID: socket.id,
        from: "A",
        to: "B",
        date: new Date().getTime().toString()
    };
    socket.emit("B", JSON.stringify(msg));
    //A listen to msg from B
    socket.on("A", function(msgFromB){
        console.log("msgFromB: ", msgFromB);
    });
    //fake msgFromB
    setInterval(function(){
        //B send msg to A
        var msg = {
            socketID: "fake msg from B",
            from: "B",
            to: "A",
            date: new Date().getTime().toString()
        };
        socket.emit("A",JSON.stringify(msg));
    }, 2000);
};