# Collab Doc App

A real-time collaborative document editing application built with Next.js (frontend) and NestJS (backend), utilizing MongoDB as the NoSQL database and orchestrated with Docker Compose.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Running Locally without Docker](#running-locally-without-docker)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Real-Time Collaboration:** Live document editing with updates reflected instantly.
- **Role-Based Access Control:** Manage document ownership and collaborator permissions.
- **Persistent Storage:** Documents and user data stored in MongoDB.
- **Rich Text Editing:** Advanced text formatting and embedding capabilities.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Socket.IO Client
- **Backend:** NestJS, TypeScript, Mongoose, MongoDB, Passport.js, JWT, Socket.IO
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose

## Prerequisites

- **Node.js** (v20.x is recommended for frontend and backend)
- **npm** (v8.x or later) or **Yarn** (v1.22 or later)
- **Docker** and **Docker Compose**
- **Git**

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/collab-doc-app.git
cd collab-doc-app

docker compose up --build
```

### Access the Applications

- Frontend (Next.js): http://localhost:3000
- Backend (NestJS): http://localhost:3001
- MongoDB: Accessible on mongodb://localhost:27017 (use a MongoDB client or Mongo Shell to interact)
