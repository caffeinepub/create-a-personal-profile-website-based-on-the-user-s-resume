# Specification

## Summary
**Goal:** Let the user upload a real profile photo, persist it client-side, and display it as the avatar across the site.

**Planned changes:**
- Extend the persisted profile data model with an optional user photo field (e.g., data URL) saved/loaded via the existing localStorage profile key, maintaining backward compatibility for profiles without a photo.
- Add a profile photo upload control to the Resume Intake dialog (manual entry tab) with immediate preview and an option to remove/clear before submitting.
- Update the hero/avatar rendering to use the uploaded photo when present, otherwise fall back to the existing generated profile illustration, keeping responsive cropping/scaling intact.

**User-visible outcome:** The user can upload, preview, and save a profile photo; the site shows it as their avatar after reloads, and falls back to the existing illustration when no photo is set.
