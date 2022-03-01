# `lib`

This is a folder for keeping utilities, UI helpers and more.

## Naming conventions

When creating new scripts and folders in `lib`, you must retain the following naming conventions:

- The name of the folder should always be lowercase.
- Keep the name of the folders short and easy-to-understand.
- The exported name of the component should correspond to its filename.
- Do not use underscores (`_`) for long names. Use dashes instead (`-`).
- The filename of the component must not be `index.tsx` if it represents a group of different components grouped together (e.g. `lib/ui/Seo.tsx` for the navigation bar). Consider using naming exports.
