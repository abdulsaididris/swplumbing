$files = Get-ChildItem -Path '.' -Recurse -Filter '*.html' -ErrorAction SilentlyContinue
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    
    # Remove onclick from mobile-menu-btn
    $c = $c -replace 'onclick="this\.nextElementSibling\.style\.display=this\.nextElementSibling\.style\.display===''flex''\?''none'':''flex''"', ''
    
    # Remove inline script from index.html
    $c = $c -replace '(?s)<script>\s*document\.getElementById\(''y''\).*?</script>', ''
    
    # Calculate path depth to assets
    $scriptPath = if ($f.DirectoryName -match '(locations|blog)$') { "../assets/js/main.js" } else { "assets/js/main.js" }
    
    # Check if script tag is already there
    if ($c -notmatch "src=`"$scriptPath`"") {
        $c = $c -replace '</body>', "<script src=`"$scriptPath`"></script>`r`n</body>"
    }
    
    Set-Content $f.FullName $c -Encoding UTF8
    Write-Host "Fixed scripts in $($f.Name)"
}
