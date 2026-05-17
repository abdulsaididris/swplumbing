$files = Get-ChildItem -Path . -Filter *.html -Recurse
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $newContent = $content.Replace("â€”", "—").Replace("â€“", "–").Replace("â€™", "’").Replace("â€œ", "“").Replace("â€ ", "”")
    if ($content -cne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.Name)"
    }
}
