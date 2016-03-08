var socket;
window.onload = function(){
    socket = io();
    //use socket directly
    setInterval(function(){
        //A send msg to C
        var msg = {
            socketID: socket.id,
            from: "A",
            to: "C",
            date: new Date().getSeconds().toString()
        };
        socket.emit("C", JSON.stringify(msg));
    }, 5000);
    //A listen to msg from C
    socket.on("A", function(msgFromC){
        console.log("msgFromC: ", msgFromC);
    });
    //fake msgFromC
    setInterval(function(){
        //C send msg to A
        var msg = {
            socketID: "fake msg from C",
            from: "C",
            to: "A",
            date: new Date().getSeconds().toString()
        };
        socket.emit("A",JSON.stringify(msg));
    }, 5000);
};