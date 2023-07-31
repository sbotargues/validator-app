@echo off

REM Backend
cd ./backend
npm install
start npm run dev

REM Frontend
cd ../frontend
npm install
start npm run start
