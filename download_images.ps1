$targetDir = "."
$imgDir = "$targetDir\images"
if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Force -Path $imgDir | Out-Null }

$dataJsFile = "$targetDir\js\data.js"
$sliderJsFile = "$targetDir\js\slider.js"

# Update data.js
$dataContent = Get-Content $dataJsFile -Raw -Encoding UTF8
$matches = [regex]::Matches($dataContent, 'image:\s*"([^"]+)"')
$imgCount = 1
foreach ($match in $matches) {
    $url = $match.Groups[1].Value
    if ($url -like "http*") {
        $ext = ".jpg"
        if ($url -like "*.png*") { $ext = ".png" }
        elseif ($url -like "*.jpeg*") { $ext = ".jpeg" }
        
        $fileName = "product_$imgCount$ext"
        $localPath = "$imgDir\$fileName"
        
        Write-Host "Downloading $url to $fileName..."
        Invoke-WebRequest -Uri $url -OutFile $localPath
        
        $dataContent = $dataContent.Replace($url, "images/$fileName")
        $imgCount++
    }
}
Set-Content -Path $dataJsFile -Value $dataContent -Encoding UTF8

# Update slider.js
$sliderContent = Get-Content $sliderJsFile -Raw -Encoding UTF8
$matches = [regex]::Matches($sliderContent, 'image:\s*"([^"]+)"')
$imgCount = 1
foreach ($match in $matches) {
    $url = $match.Groups[1].Value
    if ($url -like "http*") {
        $ext = ".jpg"
        $fileName = "banner_$imgCount$ext"
        $localPath = "$imgDir\$fileName"
        
        Write-Host "Downloading banner $url to $fileName..."
        Invoke-WebRequest -Uri $url -OutFile $localPath
        
        $sliderContent = $sliderContent.Replace($url, "images/$fileName")
        $imgCount++
    }
}
Set-Content -Path $sliderJsFile -Value $sliderContent -Encoding UTF8

Write-Host "All images downloaded and code updated!"
