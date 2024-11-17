# Micropost: A Distributed Microblogging Service

## Project Overview

**Micropost** is a fully distributed microblogging platform designed with a focus on key distributed system principles such as data replication, fault tolerance, scalability, and concurrency. The platform allows users to:

- Create posts.
- Follow other users.
- Generate personalized feeds.
- Interact in real-time.

The system ensures high availability, handles concurrent user activity, and supports real-time updates while maintaining data consistency.

---

## Features

### Primary Features

- **User Account Management**: User registration, login, and profile management.
- **Microblogging**: Users can post short messages (like tweets) and follow/unfollow other users.
- **Personalized Feeds**: Displays posts from followed users.
- **Real-time Interactions**: Instant updates for posts, likes, and follows.
- **Search**: Search for users or posts.
- **High Availability**: Fault tolerance and replication for continuous operation.
- **Data Consistency**: Ensures eventual consistency across distributed servers.

---

## System Architecture

The system follows a **microservices architecture**:

- **User Service**: Handles user-related functionality.
- **Post Service**: Manages posts (create, retrieve, delete).
- **Follow Service**: Tracks user relationships (follow/unfollow).
- **Feed Service**: Generates personalized feeds.
- **Search Service**: Provides search functionality.

---

## Distributed System Design

- Operates across **two distributed servers**.
- Supports **client access from either server** with synchronized data updates.
- Implements **load balancing** for scalability and fault tolerance.

---

## Data Storage and Replication

1. **Database**: Uses MongoDB's distributed database for scalability and distributed workloads.
2. **Sharding**: MongoDB sharding distributes data across servers for horizontal scaling.
3. **Replication**: MongoDB Replica Sets maintain multiple data copies for fault tolerance.
4. **Synchronized Updates**: Middleware ensures consistent updates across servers.

---

## Middleware Integration

- **RabbitMQ** is used as the middleware to:
  - Facilitate distributed communication.
  - Synchronize updates between servers.
  - Ensure message acknowledgment and reliable delivery.

---

## Real-time Features

- **WebSockets (via Socket.IO)** enable real-time interactions:
  - Followers receive instant notifications for new posts.
  - Real-time updates for follow/unfollow actions and post interactions.

---

## Installation and Setup

### 1. Install Prerequisites

- **MongoDB** (latest version)
- **RabbitMQ**
- **Node.js** (for microservices)
- **Socket.IO** (for real-time updates)

### 2. Set Up MongoDB

#### Create Data and Log Directories

```bash
mkdir -p /data/db1 /data/db2
mkdir -p /logs
```

#### Start MongoDB Instances

```bash
mongod --port 27017 --dbpath /data/db1 --replSet rs0 --logpath /logs/mongo1.log --logappend --fork
mongod --port 27018 --dbpath /data/db2 --replSet rs0 --logpath /logs/mongo2.log --logappend --fork
```

#### Start MongoDB Instances

```bash
mongod --port 27017 --dbpath /data/db1 --replSet rs0 --logpath /logs/mongo1.log --logappend --fork
mongod --port 27018 --dbpath /data/db2 --replSet rs0 --logpath /logs/mongo2.log --logappend --fork
```

Connect to MongoDB on port 27017:

```bash
mongo --port 27017
```

Initialize Replica Set

```Javascript
rs.initiate({
    _id: "rs0",
    members: [
        { _id: 0, host: "localhost:27017" },
        { _id: 1, host: "localhost:27018" }
    ]
});
```

Check replica set status:

```Javascript
rs.status();
```

### 3. Set Up RabbitMQ

#### Install RabbitMQ

Follow the official RabbitMQ Installation Guide for your OS.

```bash
mkdir -p /data/db1 /data/db2
mkdir -p /logs
```

### Start RabbitMQ

```bash
rabbitmq-server
rabbitmq-plugins enable rabbitmq_management
```

### Real-time Communication

Install WebSocket Dependencies

```
npm install socket.io
```

### Running the Microservices

```
node user-service/index.js
node post-service/index.js
```

### License

```
This project is licensed under the MIT License.
```
