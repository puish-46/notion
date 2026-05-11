@echo off
set DIR=%~dp0
start cmd /k "cd /d %DIR%..\frontend && npm run dev"
start cmd /k "cd /d %DIR%..\backend && nodemon server.js"
