# Node Chat App

This is a chat app implemented with NodeJS and SocketIO

## Setup and Installtion

1. Set up Snowplow Micro on your local machine. Check [here](https://github.com/snowplow-incubator/snowplow-micro/) for instructions on how to set up Snowplow Micro.

2. Clone the repo with:

```bash
~user: $ git clone git@github.com:adisen/node-chat-app.git
```

3. Install Dependencies

```bash
~user: $ cd node-chat-app
~user: $ npm i
```

4. Start the app

```bash
~user: $ npm run server
```

## Using the App

This app is a full-stack app that allows users to chat in a group. There are two pages.

1. The user enters the user name they want to use in the group and also the name of the group. This can be any name. The user just needs to make sure that they enter the same name as the name of the group where the other people they want to chat with are.  
   **N.B: Group names are case sensitive.**

2. The second page is where the user chats on the group. The list of users on the group is shown on the left side. A user can send a text message and they can also send their location.

_App hosted [Here](https://nameless-peak-41750.herokuapp.com/)_
