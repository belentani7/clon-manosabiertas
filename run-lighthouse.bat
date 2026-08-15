@echo off
echo Running Lighthouse audit for https://mismanosabiertas.netlify.app/
lighthouse "https://mismanosabiertas.netlify.app/" --output=json --output-path="reports\lighthouse-report-%DATE:~-4,4%-%DATE:~-10,2%-%DATE:~-7,2%-%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%.json" --preset=desktop
echo.
echo Audit complete. Check the reports folder.