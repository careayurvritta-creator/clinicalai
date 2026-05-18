# Parse WHO CSV - PowerShell Script

$CSVPath = Join-Path $PSScriptRoot "..\WHO international standard terminologies on ayurveda.csv"
$OutputPath = Join-Path $PSScriptRoot "..\src\lib\ayurknowledge\who-terminology.json"

Write-Host "Reading WHO CSV..."

$content = Get-Content $CSVPath -Raw

$categoryMap = @{
    "1" = "Background Concepts"
    "2" = "Core Concepts"
    "3" = "Anatomical Structures"
    "4" = "Physiological Processes"
    "5" = "Morbidity and Diagnostic Terms"
    "6" = "Materials"
    "7" = "Therapeutic Interventions and Techniques"
    "8" = "Research and Education"
    "9" = "Clinical Specialities"
}

$terms = @()
$categoriesMap = @{}
$currentId = ""
$currentEnglish = ""
$currentDefinition = ""
$currentSanskritIAST = ""
$currentSanskritDevanagari = ""
$currentCategory = ""
$lineNum = 0

$lines = $content -split "`n"

foreach ($line in $lines) {
    $lineNum++
    
    # Skip empty lines
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    # Parse CSV line manually
    $cols = @()
    $current = ""
    $inQuotes = $false
    
    for ($i = 0; $i -lt $line.Length; $i++) {
        $char = $line[$i]
        if ($char -eq '"') {
            $inQuotes = !$inQuotes
        } elseif ($char -eq ',' -and !$inQuotes) {
            $cols += $current.Trim()
            $current = ""
        } else {
            $current += $char
        }
    }
    $cols += $current.Trim()
    
    if ($cols.Count -lt 2) { continue }
    
    $firstCol = $cols[0].Trim()
    $secondCol = if ($cols.Count -gt 1) { $cols[1].Trim() } else { "" }
    $thirdCol = if ($cols.Count -gt 2) { $cols[2].Trim() } else { "" }
    $fourthCol = if ($cols.Count -gt 3) { $cols[3].Trim() } else { "" }
    $fifthCol = if ($cols.Count -gt 4) { $cols[4].Trim() } else { "" }
    
    # Check if this is a new term entry (starts with ITA-)
    if ($firstCol -match '^ITA-') {
        # Save previous term
        if ($currentId -and $currentEnglish) {
            $term = @{
                id = $currentId
                english = $currentEnglish
                definition = $currentDefinition.Trim()
                sanskritIAST = $currentSanskritIAST
                sanskritDevanagari = $currentSanskritDevanagari
                category = $currentCategory
            }
            $terms += $term
            
            if (-not $categoriesMap.Contains($currentCategory)) {
                $categoriesMap[$currentCategory] = @()
            }
            $categoriesMap[$currentCategory] += $term
        }
        
        # Start new term
        $currentId = $firstCol
        $currentEnglish = $secondCol
        $currentDefinition = $thirdCol
        $currentSanskritIAST = $fourthCol
        $currentSanskritDevanagari = $fifthCol
        
        # Extract category from ID
        $categoryNum = ($currentId -split '\.')[0] -replace 'ITA-', ''
        $currentCategory = $categoryMap[$categoryNum]
        if (-not $currentCategory) { $currentCategory = "Category $categoryNum" }
    }
    elseif ($firstCol -eq "" -and $secondCol -eq "" -and $thirdCol -ne "") {
        # Continuation of previous definition
        $currentDefinition += " " + $thirdCol
    }
}

# Don't forget last term
if ($currentId -and $currentEnglish) {
    $term = @{
        id = $currentId
        english = $currentEnglish
        definition = $currentDefinition.Trim()
        sanskritIAST = $currentSanskritIAST
        sanskritDevanagari = $currentSanskritDevanagari
        category = $currentCategory
    }
    $terms += $term
    if (-not $categoriesMap.Contains($currentCategory)) {
        $categoriesMap[$currentCategory] = @()
    }
    $categoriesMap[$currentCategory] += $term
}

# Build categories array
$categories = @()
foreach ($catName in $categoriesMap.Keys | Sort-Object) {
    $categories += @{
        id = $catName.ToLower().replace(' ', '-')
        name = $catName
        terms = $categoriesMap[$catName]
    }
}

# Build index
$termsIndex = @{}
foreach ($term in $terms) {
    $termsIndex[$term.id] = $term
}

# Create final JSON
$data = @{
    metadata = @{
        title = "WHO International Standard Terminologies on Ayurveda"
        isbn = "978-92-4-006493-5"
        source = "World Health Organization"
        license = "CC BY-NC-SA 3.0 IGO"
        totalTerms = $terms.Count
        totalCategories = $categories.Count
    }
    categories = $categories
    termsIndex = $termsIndex
}

# Save to JSON
$data | ConvertTo-Json -Depth 10 | Set-Content $OutputPath -Encoding UTF8

Write-Host "Parsed $($data.metadata.totalTerms) terms in $($data.metadata.totalCategories) categories"
Write-Host "Saved to $OutputPath"

# Print category summary
Write-Host "`nCategory Summary:"
foreach ($cat in $categories) {
    Write-Host "  $($cat.name): $($cat.terms.Count) terms"
}