

exports.roomSocket = {
    test:(data,io,socket)=>{
        console.log(data);
        io.emit('eong',data);
    }
}