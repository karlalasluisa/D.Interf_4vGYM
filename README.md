# 4vGYMAppDI

# Gym Management App

An Angular-based application designed to manage monitors and activities in a gym setting. This project includes separate interfaces for tablets and laptops, enabling administrators to effectively handle gym operations such as scheduling activities and managing monitors.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Development Guidelines](#development-guidelines)
- [Component Diagram](#component-diagram)
- [Task Management](#task-management)
- [Authors](#authors)

---

## Features

### Activities Management
- Select and navigate between dates.
- Add, edit, or delete activities for fixed time slots.
- Display activity details, including the type of activity and assigned monitors.
- Ensure each activity type meets monitor requirements (e.g., BodyPump requires 2 monitors, Spinning requires 1 monitor).

### Monitors Management
- Carousel view of all monitors.
- Search functionality to quickly find specific monitors.
- Add, edit, or delete monitors directly from the interface.

### Shared Components
- **Header**: Displays the app name and logo.
- **Footer**: Allows switching between "Activities" and "Monitors" sections.

---

## Technologies Used
- **Frontend**: Angular, TypeScript, SCSS.
- **Backend**: Our API: WEB_API//////////////////////////////////////////////////
- **Tools**: Angular Material, Figma (for design reference).

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI (v15 or higher)


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.





Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
