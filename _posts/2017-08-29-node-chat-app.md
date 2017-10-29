---
layout: post
title:  "Node Chat App"
date:   2017-08-29 12:01:11 -0600
comments: true
project: false
---

# Another App Hits The Web!

I've been following a course on [Udemy](https://udemy.com) learning Node.js (Node). I've gotten quite a bit of flak for taking an interest in Node because it is a JavaScript runtime, and JavaScript is a [loosely typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing) scripting language. This is not the only reason some developers dislike JavaScript, but it is one of the most common. The course on Udemy walks through different concepts by creating apps that implement them, one of which was a chat application.

# Chat App Using Socket.io

The chat app is one that I was looking forward to because it uses [Socket.io](https://socket.io), a library that uses web sockets to provide real-time events from server to client and vice versa. This allows a client to perform an action like sending a message, and the server can receive that message and push it to all connected clients. This is super powerful, because without this functionality, a single client that sends a request is the only client who receives anything back as a result of it.

I quickly took to this idea when I learned how to use Socket.io, and started implementing features left and right outside of the course scope. Sockets allowed me to notify everyone in the chat if someone had typed some text, if someone joined or left the chat, and obviously if a message was sent.

Eventually the Udemy course got to the point of adding private chat rooms! This was cool becasue prior to that, the app was only one communal chat room. So another feature I've added on top of being able to create your own room, is to view all rooms with users currently connected to them and how many users are connected to each.

# Handling An Event (Node.js code)

{% highlight JavaScript linenos %}
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('tommyIsAwesome', (data, callback) => {
        // Do what happens when the event tommyIsAwesome fires (hint:
        // this is ALWAYS happening... it's weird)

        // Whenever you wish, you can call the callback function, and pass
        // it whatever you want as well. This will fire code that was sent
        // from the emitter of this event
        callback();
    });


    // More code, could be more listeners or emitting
});
{% endhighlight %}

So on the 'connection' event (a built in event with Socket.io), the new socket is sent to the function callback. Inside of here, any number of things can be done with the new socket, including listening to new events, like 'tommyIsAwesome', or 'baconIsGross' (breaking news, this is actually true now!) and they are all handled the same. There are a few things that can change though, and this is the data and callback that is passed to the callback of the event, and the parameters passed to the callback. Okay, if that was confusing, I'll break that down per line from the example I gave above.

The parameters passed in to the callback function when the event 'tommyIsAwesome' is fired (line 8) can change depending on what is needed. By this I mean the data and callback parameters are optional, and the data parameter can be any object, while the callback parameter should be a function.

Also, the parameters that you pass to `callback()` can change (line 15), so line 15 could actually look like this:

`callback('Yeah, I know!');`

This would work, the string 'Yeah, I know!' would be passed to the function that was given to the event handler as the callback. However, you could also do this and it would work:

`callback({ myObjectProperty: 'myObjectValue' });`

These can be handled however necessary on the emitting side of the event.

# Emitting An Event (Node.js code)

So we've now covered handling an event, but how do you emit one? Here is an example using much of the same code as before:

{% highlight JavaScript linenos %}
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    // Handle the event 'tommyIsAwesome' as we did above

    // ...

    // Emit an event when a new socket is connected
    io.emit('update',
        { updatedData: 'New Stuff!' },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                // Handle success!
            }
        }
    );
});

// More code where events can be emitted based on other things happening
{% endhighlight %}

The first thing worth noting here, is we have filled the parameters. The first parameter is the event name `update`, the second is an object `{ updatedData: 'New Stuff!' }`, and the callback takes a single parameter (could be any number of them) that we call `err`.

This event being emitted will be handled anywhere the io object, or a socket connected to the server has code like our first example where it calls the `on` method, like so:

{% highlight JavaScript linenos %}
socket.on('update', (updatedData, callback) => {
    // Handle event
});
{% endhighlight %}

This code would most likely be on the client to handle the update, as it is fired from the server, however it would work to handle it in either place.

# Making It Come To Life

I'm not going to go over every feature I implemented, but we now have the basics of how to use Socket.io to emit and handle events from the client and server alike. Every bit of communication besides the initial HTTP request for the page is done via these sockets in this project. I think that's pretty awesome! I also got a lot more done than the tutorial walked through, because it was so easy to see the potential that this unlocked. Learning how to use sockets was one of the barriers I had as a developer. It was something I had known about, and wanted to use so I could learn it but somehow it kept eluding me. I finally got my feet wet and I'm glad I did!

There is NO persistence with this app! If you are not in the chat room that receives a message when it is sent, you will never see it. There is no history, it's all gone as soon as the client is refreshed. I think this is a cool feature because most chats have some persistence and there's a way to view old messages, not here!

# Closing Remarks

I am loving these small projects, and I think they are instrumental in professional development and learning. It's fun to create something that is usable and practical, and learning new technology along the way is just an amazing bonus. I'd highly recommend giving it a shot, even if programming isn't your thing, try a new project that is more relative to your interests. It's worth it, I promise!

If you'd like to add any features, or just take a look at the full code base for this project, it is hosted [here](https://github.com/grezxune/node-chat-app). The live app is hosted on a Heroku dyno, similar to my [last project](http://tommytreb.com/2017/08/18/image-scraper.html) and it is located [here](http://chat.tommytreb.com).

If you did decide to start a new project, let me know, I'd LOVE to hear about it! Also, if there's something that didn't make sense, or you've got a question please don't hesitate to contact me. I'd be happy to chat!