# 4vGYMAppDI

# Gym Management App

An Angular-based application designed to manage monitors and activities in a gym setting. This project includes separate interfaces for tablets and laptops, enabling administrators to effectively handle gym operations such as scheduling activities and managing monitors.

---

## Table of Contents

1. [Features](#features)
    - [Activities Management](#activities-management)
    - [Monitors Management](#monitors-management)
    - [Shared Components](#shared-components)
    - [About the Folder structure](#about-the-folder-structure) 
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
    - [Angular Project Setup](#angular-project-setup)
    - [Symfony + Angular Integration Guide](#symfony--angular-integration-guide)
4. [Development Guidelines](#development-guidelines)
    - [Development Server](#development-server)
    - [Code Scaffolding](#code-scaffolding)
    - [Building](#building)
5. [Additional Features Implemented](#additional-features-implemented)
    - [Loading Activities for a Day](#loading-activities-for-a-day)
    - [Optimized Design for Activities](#optimized-design-for-activities-monitor-section)
    - [Email Redirection for Monitors](#email-redirection-for-monitors)
    - [Monitor Card Images](#monitor-card-images)
6. [Component Diagram](#component-diagram)
7. [Task Management](#task-management)
8. [Authors](#authors)

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
- **Backend**: Our API: WEB_4vGYM
- **Tools**: Angular Material, Figma (for design reference).

---

## About the Folder structure

We have structured the folders so that components are always placed within the components that call them (similar to how they are used in HTML). This way, we maintain a clear structure regarding the relationships between components and services.

## Setup and Installation

### Angular Project Setup

#### Prerequisites
- Node.js (v16 or higher)
- Angular CLI (v15 or higher)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

---

## Symfony + Angular Integration Guide

This guide explains how to set up and launch the Symfony project and synchronize it with an Angular project. Follow each step carefully to configure and run both projects successfully.

### Prerequisites
- **Git**: [Download here](https://git-scm.com/)
- **Node.js and npm** (required for Angular): [Download here](https://nodejs.org/)
- **Composer** (required for Symfony): [Download here](https://getcomposer.org/)
- **PHP** (version 8.1 or later): [Download here](https://www.php.net/)
- **MySQL** or another database supported by Symfony.

### Install Symfony Dependencies
Run:
```
bash
composer install
```

### Install Dependencies
Use Composer to install the project's dependencies:
```
composer install
```

**Configure Environment Variables**
Create or edit the .env file in the project root directory.
Ensure the database connection is correctly set up:

**Create the Database**
Run the following command to create the database:
```
php bin/console doctrine:database:create
```


**Run Migrations**
Apply the migrations to configure the required tables:
```
php bin/console doctrine:migrations:migrate
```

**Start the Symfony Server**
Use the Symfony CLI or PHP built-in server to start the project:
```
symfony serve
```

Now it's ready tu be used by this angular proyect.


# Additional Features Implemented

In addition to the requested tasks, we have added the following features:

---

## Loading Activities for a Day

To avoid errors caused by overloading `GET` requests (e.g., when switching days too quickly) and to prevent the app from appearing unresponsive, we have implemented a **loading screen**:
- The loading screen appears when the `GET` request starts.
- It automatically closes once all data is received, and the activities are rendered.

---

## Optimized Design for Activities (Monitor Section)

To improve the design of the activities in the **monitor section**, we have:
- Created a **scrollable div** that activates when its width is exceeded.
- Made the scrollbar visible **only on hover**, to avoid covering the monitor names unnecessarily.

---

## Email Redirection for Monitors

We added functionality to the **monitor cards** in the activities section:
- Clicking on a monitor opens a **new blank tab with a prefilled email**.
- The email includes:
  - The recipient's Gmail address (the monitor's Gmail, if valid).
  - A subject (type of activity and date).
  - A body text with:
    - A greeting including the monitor's name.
    - A sample entry as an example.

This functionality enhances the use of additional monitor properties.

---

## Monitor Card Images

We assumed that **monitor cards include their photos**. To ensure a better user experience:
- If the monitor's image is valid (it opens and displays properly), it will appear on the card.
- If the image is invalid or causes an error, a **default image** will be displayed instead.

---
## Component Diagram
components
├── activities
│   ├── calendar
│   ├── table-activities
│   │   └── activity
│   │       ├── monitor-simple
│   │       └── buttonsComponents
│   │           ├── create-activity
│   │           └── edit-activity
├── monitors
│   ├── carousel
│   │   ├── monitor
│   │   ├── form-monitor
│   │   └── modal-forms


## Task Management
Para organizar y dar seguimiento a las tareas de este proyecto, utilizamos el sistema de **Kanban** de GitHub. Este tablero nos permitió dividir el trabajo en diferentes etapas, como "Por Hacer", "En Proceso" y "Completado", asegurando un flujo de trabajo eficiente.

### Herramientas utilizadas:
- **Angular**: Para el desarrollo del frontend de la aplicación de gimnasio.
- **Symfony**: Para construir la API que alimenta la aplicación.
- **Bootstrap**: Incorporado en el diseño para asegurar una interfaz amigable y responsiva.

El tablero Kanban nos ayudó a gestionar la implementación de características clave, como:
1. Desarrollo de vistas y componentes en Angular.
2. Integración de APIs para sincronizar el frontend y el backend.
3. Diseño responsivo usando Bootstrap.

## Authors
- **Iker Ibero**: Desarrollo de frontend, backend y la integración con las APIs.  
- **Karla Lasluisa**: Desarrollo de frontend, backend y la integración con las APIs.  

Agradecemos tu interés en este proyecto. Si deseas colaborar, no dudes en enviar tus ideas o sugerencias a través de GitHub Issues o revisando nuestra [Guía de Contribución](CONTRIBUTING.md).

