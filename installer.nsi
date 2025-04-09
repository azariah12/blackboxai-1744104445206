!include MUI2.nsh
!include nsDialogs.nsh

Name "Ghana Location Tracker"
OutFile "GhanaLocationTrackerSetup.exe"
InstallDir "$PROGRAMFILES\GhanaLocationTracker"
RequestExecutionLevel admin

!define MUI_ICON "icon.ico"
!define MUI_UNICON "icon.ico"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "Main Application"
  SetOutPath $INSTDIR
  File /r "dist\GhanaLocationTracker-win32-x64\*.*"
  
  CreateDirectory "$SMPROGRAMS\Ghana Location Tracker"
  CreateShortCut "$SMPROGRAMS\Ghana Location Tracker\Ghana Location Tracker.lnk" "$INSTDIR\GhanaLocationTracker.exe"
  CreateShortCut "$DESKTOP\Ghana Location Tracker.lnk" "$INSTDIR\GhanaLocationTracker.exe"
  
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\GhanaLocationTracker" \
                   "DisplayName" "Ghana Location Tracker"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\GhanaLocationTracker" \
                   "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

Section "Uninstall"
  RMDir /r "$INSTDIR"
  RMDir /r "$SMPROGRAMS\Ghana Location Tracker"
  Delete "$DESKTOP\Ghana Location Tracker.lnk"
  
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\GhanaLocationTracker"
SectionEnd