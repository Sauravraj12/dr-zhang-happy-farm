# Dr. Zhang's Happy Farm

Dr. Zhang's Happy Farm is an AI-ready pet health and membership platform prototype built with Next.js. It allows pet owners to complete a health assessment, generate a basic health report, view breed-based risk information, explore personalized product recommendations, and access premium health insights through a membership flow.

## What this project does

This project is a front-end prototype for a pet health platform. A user can:

- fill out a health check form for their pet
- create a member profile from owner details
- receive a free basic health report
- upgrade to a paid tier for deeper insights
- see breed-based risk information
- view product recommendations
- read the short academic/marketing brief

## Live demo

You can also check the project online here:

```text
https://petcheckhealth.netlify.app
```

This free deployment lets you view the prototype without running it locally.

## Requirements before running

Make sure you have installed:

- Node.js 18 or newer
- npm (comes with Node.js)

## Step-by-step: run the project

### 1. Open terminal in the project folder

Go to the project folder:

```bash
https://github.com/Sauravraj12/dr-zhang-happy-farm
```

If you are in a different folder, first go there and then run the next commands.

### 2. Install dependencies

Run:

```bash
npm install
```

This will install all required packages for the app.

### 3. Start the app

Run:

```bash
npm run dev
```

### 4. Open the app in the browser

After the server starts, open:

```text
http://localhost:3000
```

If port 3000 is already busy, Next.js will usually choose another available port and show the correct URL in the terminal.

### 5. Stop the app

Press:

```text
Ctrl + C
```

in the terminal to stop the running project.

## Useful commands

### Run production build

```bash
npm run build
```

### Run production server after building

```bash
npm run start
```

## Common problems and fixes

### Problem: "npm is not recognized"

Install Node.js and restart the terminal.

### Problem: project not starting

Make sure you are inside the project folder before running the commands.

### Problem: port already in use

Close the old server or start the app again. Next.js will usually show the new port in the terminal.

### Problem: modules are missing

Run:

```bash
npm install
```

## Project structure

This project is organized in a simple and easy-to-understand structure:

```text
dr-zhang-happy-farm/
├── app/
│   ├── globals.css            # global styling and layout design
│   ├── layout.tsx             # app layout and page wrapper
│   ├── page.tsx               # homepage / landing page
│   ├── health-check/
│   │   └── page.tsx           # pet health form and member creation flow
│   ├── report/
│   │   └── page.tsx           # free report + paid upgrade screen
│   ├── brief/
│   │   └── page.tsx           # academic and marketing brief page
│   └── lib/
│       └── pet-health.ts      # health scoring, membership logic, and recommendations
├── public/                    # static assets and images
├── package.json               # project scripts and dependencies
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # CSS/PostCSS config
├── eslint.config.mjs          # linting rules
├── README.md                  # project documentation
└── .gitignore                 # ignored files for Git
```

### Simple explanation of each folder

- app/ — main website pages
- app/health-check/ — where the user fills the pet health questionnaire
- app/report/ — where the result and premium upgrade page appear
- app/brief/ — where the business/academic summary is shown
- app/lib/ — logic for health calculations and recommendations
- public/ — assets used by the website
- package.json — commands like `npm run dev`, `npm run build`

## Notes

This project is a prototype and uses browser local storage to simulate member records and premium access.

It is made for demo and concept presentation, not for a live production backend.

## Summary

For a first-time user, the full run process is:

```bash
cd "C:\Users\admin\Desktop\project\dr-zhang-happy-farm"
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```
