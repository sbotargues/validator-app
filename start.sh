#!/bin/bash

# Backend
cd ./backend
npm install
npm run dev &

# Waiting for backend to be ready
wait

# Frontend
cd ../frontend
npm install
npm run start

