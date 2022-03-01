# `components`

This is a folder for keeping components that are meant to be globally reusable throughout the application. This folder should not
include any components that are used only once or more and are related only to one page.

## Naming conventions

When creating new components and folders in `components`, you must retain the following naming conventions:

- The name of the folder should always be lowercase.
- The exported name of the component should correspond to its filename.
- Do not use underscores (`_`) for long names. Use dashes instead (`-`).
- Always create a named export for single components. (e.g. `export const Component = () => // ...`)
- The filename of the component must be `index.tsx` if it represents a group of different components grouped together (e.g. `components/Navbar/index.tsx` for the navigation bar)
