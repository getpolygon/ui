# `modules`

This is a folder for keeping components that are used in single or multiple related pages. Components in this folder
are often not meant to be reusable globally, and must only be used in specific pages.

## Naming conventions

When creating new components and folders in `modules`, you must retain the following naming conventions:

- The name of the folder should always be lowercase.
- The exported name of the component should correspond to its filename.
- The filename of the component must be `index.tsx` if it represents a group of different components grouped together (e.g. `modules/nav/index.tsx` for the navigation bar)
