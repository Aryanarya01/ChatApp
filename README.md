Small features to implement....
# working ->  chat opened recieve msg problem
# 💬 ZenChat

ZenChat is a full-stack real-time messaging application built with **Next.js, Node.js, Express, Socket.IO, MongoDB, and Tailwind CSS**.

It provides a smooth real-time communication experience with private messaging, group conversations, online status, typing indicators, unread message tracking, image sharing, and real-time message read receipts.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Logout functionality
- Profile management
- Profile picture upload

### 💬 Real-Time Messaging
- One-to-one conversations
- Real-time messages using Socket.IO
- Persistent messages with MongoDB
- Text and image messages
- Automatic message scrolling

### 👥 Group Chat
- Create groups
- Rename groups
- Add members
- Remove members
- Leave groups
- Group admin management

### ⚡ Real-Time Features
- Online / offline user status
- Typing indicators
- Real-time unread message count
- Real-time read receipts
- Instant message delivery

### 🎨 UI
- Modern dark UI
- Responsive chat interface
- User search
- Profile modal
- Group information modal
- Message status indicators

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- TypeScript
- Socket.IO
- JWT
- bcryptjs

### Database & Services
- MongoDB
- Mongoose
- Cloudinary

---

## 🏗️ Architecture

```text
                ┌─────────────────┐
                │    Next.js UI   │
                │   React + TS    │
                └────────┬────────┘
                         │
                    HTTP / Socket.IO
                         │
                ┌────────▼────────┐
                │  Express Server │
                │   + Socket.IO   │
                └───────┬─────────┘
                        │
                ┌───────▼─────────┐
                │     MongoDB     │
                │     Database    │
                └─────────────────┘
                        
                ┌─────────────────┐
                │    Cloudinary   │
                │  Image Storage  │
                └─────────────────┘
