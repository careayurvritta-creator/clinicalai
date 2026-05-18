# Parse WHO CSV - Improved Version to capture all ~3497 terms

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
$seenIds = @{}

$lines = $content -split "`n"
$inIndexSection = $false
$currentCategory = ""

foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    # Detect start of index section
    if ($line -match "^,,,Index") {
        $inIndexSection = $true
        continue
    }
    
    # Parse CSV line
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
    
    # Skip header/footer lines
    if ($cols[0] -match "^WHO|^ISBN|^Some|^Suggest|^Sales|^Third|^General|^Design|^Department|^World|^Avenue") { continue }
    if ($cols[0] -match "^[0-9]+,WHO international") { continue }
    
    if ($inIndexSection) {
        # Index format: Sanskrit, Term ID, Sanskrit term
        # Check if line has ITA code in any column
        $itaCol = -1
        for ($i = 0; $i -lt $cols.Count; $i++) {
            if ($cols[$i] -match '^ITA-') {
                $itaCol = $i
                break
            }
        }
        
        if ($itaCol -ge 0) {
            $termId = $cols[$itaCol].Trim()
            
            if ($termId -and -not $seenIds.ContainsKey($termId)) {
                $seenIds[$termId] = $true
                
                # Extract category from ID
                $categoryNum = ($termId -split '\.')[0] -replace 'ITA-', ''
                $category = $categoryMap[$categoryNum]
                if (-not $category) { $category = "Category $categoryNum" }
                
                # Get description from columns before ITA
                $english = ""
                for ($i = 0; $i -lt $itaCol; $i++) {
                    if ($cols[$i] -and $cols[$i] -ne "" -and $cols[$i] -notmatch "^[0-9]+$") {
                        $english = $cols[$i]
                        break
                    }
                }
                
                # Get Sanskrit from column after ITA
                $sanskritIAST = ""
                $sanskritDevanagari = ""
                if ($itaCol + 1 -lt $cols.Count) {
                    $sanskritDevanagari = $cols[$itaCol + 1]
                }
                
                # Try to find description from nearby columns or use ID
                if (-not $english) {
                    $english = $termId -replace 'ITA-', ''
                }
                
                $term = @{
                    id = $termId
                    english = $english
                    definition = "WHO standard terminology"
                    sanskritIAST = $sanskritIAST
                    sanskritDevanagari = $sanskritDevanagari
                    category = $category
                }
                $terms += $term
                
                if (-not $categoriesMap.Contains($category)) {
                    $categoriesMap[$category] = @()
                }
                $categoriesMap[$category] += $term
            }
        }
    }
    else {
        # Main format: ITA code in first column
        $firstCol = $cols[0].Trim()
        
        if ($firstCol -match '^ITA-') {
            $termId = $firstCol
            
            if (-not $seenIds.ContainsKey($termId)) {
                $seenIds[$termId] = $true
                
                $categoryNum = ($termId -split '\.')[0] -replace 'ITA-', ''
                $category = $categoryMap[$categoryNum]
                if (-not $category) { $category = "Category $categoryNum" }
                
                $english = if ($cols.Count -gt 1) { $cols[1].Trim() } else { "" }
                $definition = if ($cols.Count -gt 2) { $cols[2].Trim() } else { "" }
                $sanskritIAST = if ($cols.Count -gt 3) { $cols[3].Trim() } else { "" }
                $sanskritDevanagari = if ($cols.Count -gt 4) { $cols[4].Trim() } else { "" }
                
                $term = @{
                    id = $termId
                    english = $english
                    definition = $definition
                    sanskritIAST = $sanskritIAST
                    sanskritDevanagari = $sanskritDevanagari
                    category = $category
                }
                $terms += $term
                
                if (-not $categoriesMap.Contains($category)) {
                    $categoriesMap[$category] = @()
                }
                $categoriesMap[$category] += $term
            }
        }
    }
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

$data | ConvertTo-Json -Depth 10 | Set-Content $OutputPath -Encoding UTF8

Write-Host "Parsed $($data.metadata.totalTerms) terms in $($data.metadata.totalCategories) categories"
Write-Host "Saved to $OutputPath"

Write-Host "`nCategory Summary:"
foreach ($cat in $categories) {
    Write-Host "  $($cat.name): $($cat.terms.Count) terms"
}