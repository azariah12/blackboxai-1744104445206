@echo off
echo Installing dependencies...
npm install

echo Packaging application...
npm run package-win

echo Creating installer...
makensis installer.nsi

echo Build complete! Installer created as GhanaLocationTrackerSetup.exe
pause