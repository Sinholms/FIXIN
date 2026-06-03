$ErrorActionPreference = 'Stop'

$androidSdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
$jbr = 'C:\Program Files\Android\Android Studio\jbr'

if (-not (Test-Path $androidSdk)) {
  throw "Android SDK not found at $androidSdk"
}

if (-not (Test-Path $jbr)) {
  throw "Android Studio Java runtime not found at $jbr"
}

$env:ANDROID_HOME = $androidSdk
$env:ANDROID_SDK_ROOT = $androidSdk
$env:JAVA_HOME = $jbr

npm run cap:sync
Push-Location android
try {
  .\gradlew.bat assembleDebug
}
finally {
  Pop-Location
}

Write-Host "APK ready: android\app\build\outputs\apk\debug\app-debug.apk"
