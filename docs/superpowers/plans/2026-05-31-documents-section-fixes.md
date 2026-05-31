# Documents Section Comprehensive Fixes — 2026-05-31

## Critical Issues (Must Fix)

### 1. Category navigation uses labels as folder IDs [BUG 27]
`DocumentExplorer` calls `navigateToCategory(cat.id, cat.label)` where `cat.id` is `'01-OPD-Registers'`. This is NOT a Google Drive folder ID. ALL file operations fail when a category is selected.

**Fix:** When navigating to a category, look up the actual Drive folder ID from the patient's category folders (returned by `getOrCreatePatientFolder`). Store the Drive UUID, not the label.

### 2. DocumentExplorer never fetches files [BUG 28]
No `useEffect` watches `currentFolderId` to trigger file fetch. File list is always empty unless AI chat fetched first.

**Fix:** Add auto-fetch when `currentFolderId` changes (IN PROGRESS).

### 3. Stale closures in handleGenerateDocument/handleGenerateBulk [BUG 34]
Missing `collectedDemographics`, `setPatientSupabaseId`, `updatePatientDemographics` in dependency arrays.

**Fix:** Add all missing dependencies to useCallback arrays.

### 4. UHID always set to empty string [BUG 35]
`setPatientSupabaseId(linkData.patientId, '')` — empty UHID never corrected.

**Fix:** Fetch UHID from patient record and pass it properly.

### 5. Repeatable sections not handled in document generation [BUG 38]
Prescription medicines (array data) rendered as `[object Object]`.

**Fix:** Handle array data in createDocument/createSpreadsheet.

### 6. chat-action never writes to patient_drive_links [BUG - FIXED]
Drive folder links never persisted. Sidebar can't find patients.

**Fix:** DONE — `handleCreatePatient` now inserts into `patient_drive_links`.

## High Priority Issues

### 7. Duplicate user messages sent to /api/chat [BUG]
User message added to chatMessages AND appended to API request.

**Fix:** Don't append new user message separately — it's already in chatMessages.

### 8. SSE chunk parsing can miss data [BUG]
Line splitting doesn't buffer partial lines across chunks.

**Fix:** Buffer incomplete lines between chunks.

### 9. PatientSidebar double-fetch on mount [BUG]
Two useEffect hooks both trigger fetchPatients().

**Fix:** Remove duplicate useEffect.

### 10. Patient list not refreshed after AI creates patient [BUG]
After handleSaveDemographics, sidebar list is stale.

**Fix:** Expose refreshPatients and call it after patient creation.

### 11. Breadcrumb root click clears patient selection [BUG 30]
navigateToRoot sets selectedPatient: null.

**Fix:** navigateToRoot should only clear folder state, not patient.

### 12. File upload has no target folder when at root [BUG 36]
currentFolderId is null at root — file uploads to nowhere.

**Fix:** Use patient's root Drive folder as fallback.

### 13. EmbeddedEditor Google auth issues [BUG 31/32]
iframe shows login page for service-account documents.

**Fix:** Use Drive API webViewLink instead of constructing URLs manually.

## Medium Priority Issues

### 14. Category name mismatch [BUG 29]
Explorer labels differ from Drive folder names.

### 15. /api/drive/embed is dead code [BUG 31]
Editor constructs URLs directly instead of using the endpoint.

### 16. patient.clinical_id autoFill works by accident [BUG 33]
Relies on index signature escape hatch.

### 17. Search limited to 50 results [BUG 37]
No pagination support.

### 18. update_patient has no field whitelist [SECURITY]
Can overwrite ANY column.

## Supabase Schema Fixes

### 19. Deprecated auth.role() [FIXED - Migration 018]
10 knowledge base policies updated to TO clause.

### 20. SECURITY DEFINER functions [FIXED - Migration 018]
6 functions changed to SECURITY INVOKER.

### 21. patient_drive_links gap [FIXED]
handleCreatePatient now writes to patient_drive_links.

## Execution Order
1. Fix category navigation (BUG 27) + DocumentExplorer fetch (BUG 28)
2. Fix stale closures (BUG 34)
3. Fix duplicate messages + SSE parsing
4. Fix PatientSidebar
5. Fix EmbeddedEditor
6. Fix UHID
7. Fix breadcrumb navigation
8. Fix file upload fallback
9. Fix repeatable sections
10. Apply Supabase migration 018
