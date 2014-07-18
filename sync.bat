::@echo off

start /wait cmd /k Call g.bat
::start cmd /k Call server.bat
start "Chrome" chrome --new-window http://edsilv.me
exit