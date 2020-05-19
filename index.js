// Подключение всех модулей к программе
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(request,response){
    response.sendFile(__dirname + '/index.html');
});

//Массив со всеми подключениями
var connections = [];
//Функция, которая срабатывает при подключении к странице
io.sockets.on('connection',function(socket){
        console.log("Подключен новый пользователь!");
        //Добавление пользователя в массив 
        connections.push(socket);
        //Функция, которая срабатывает при отключении от страницы
        socket.on('disconnect',function(data){
        console.log("Пользователь отключился");
        //Удаление пользователя из массива
        connections.splice(connections.indexOf(socket),1);

    });
    //Функция, которая обрабатывает сообщение от пользователя
    socket.on('send message',function(data){
        //Создание события 'receive message' для клиента
        io.emit('receive message', { message: data.message, //Само сообщение
                                user: data.user, //Ник пользователя
                                color: data.color}); //Цвет пользователя
        
    });
});
http.listen(3000, function() {
    console.log('listening on *:3000');
  });