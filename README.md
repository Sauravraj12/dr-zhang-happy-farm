# Dr. Zhang's Happy Farm

## Problem Statement

This project addresses the business opportunity of transforming AI-assisted health screening into a practical pet healthcare and longevity platform. The original research direction focused on AI-driven early diabetes prediction and interpretability analysis (XAI). This prototype migrates that technology into the pet healthcare and longevity sector to create a practical business model that is commercially useful and scientifically credible.

The goal is to attract pet owners to provide health and lifestyle data through the "Dr. Zhang's Professional AI Health Check," convert them into free members, unlock a simple report to build trust, and then guide them into a paid membership for deeper breed-aware risk prediction and prevention planning. At the same time, the platform supports precise promotion of functional pet supplements from "Dr. Zhang's Happy Farm," creating a complete loop from health data collection to product recommendation and subscription conversion.

The business model is designed as a freemium ecosystem:

- Free users submit health information and receive a basic screening report.
- The system automatically creates a member profile tied to the owner’s mobile number, email address, or Line ID.
- The basic report attracts pet owners to continue using the platform.
- Paid members unlock deeper AI-driven breed prediction and prevention advice.
- The product recommendation engine connects risk factors such as obesity, metabolic issues, joint problems, and coat health to relevant functional pet products.
- The platform also creates a scientific and marketing foundation for academic papers, conferences, and product credibility.

This system is not just a static website. It is a prototype business loop that simulates the complete customer journey from assessment to report generation, paid upgrade, and product conversion.

## Objective

Build a micro-web prototype system that realizes the complete business process from:

- health check form filling,
- creation of a free member file,
- unlocking of a simple report,
- upgrade to a paid member,
- unlocking of an in-depth breed prediction report,
- and precise recommendation of Happy Farm products.

The prototype should behave like a realistic pet wellness funnel and show how health data can be transformed into commercial value, product sales, and paid membership conversion.

## Core Requirements

### A. Pet health assessment form and automatic membership mechanism

Create a mobile-friendly questionnaire page using React.js / Next.js.

Required features:

- Owner identification fields: owner name, mobile phone, email, and Line ID.
- Any one of these contact fields can be used as a member unique identifier for binding or quick file creation.
- Pet health section includes:
  - pet type: dog or cat
  - breed: such as Corgi, Shiba Inu, Persian cat
  - age
  - body condition score (BCS)
  - dietary habits
- CRM accumulation: after submission, the system must automatically create a free member profile for the owner’s mobile phone number, email address, or Line ID.
- The free member profile should be associated with the pet’s characteristic tags such as breed, pet type, activity level, dietary habit, and BCS.

### B. Two-tiered AI health check report (Freemium mechanism)

#### Tier 1: Free Membership - Simple Health Report

- Unlocked immediately after binding the member ID through phone, email, or Line ID.
- Displays the pet’s current basal metabolic rate (BMR).
- Displays obesity index.
- Displays current health risk score.
- Provides basic health screening results and risk signals.

#### Tier 2: Paid Membership - In-depth Breed Prediction and Prevention Plan

- Includes a paywall / upgrade prompt.
- After upgrade to paid membership, the system should combine the pet’s breed and physiological characteristics.
- The report should provide deeper breed-specific warnings, such as:
  - Corgi risk of intervertebral disc degeneration
  - Persian cat risk of chronic kidney disease or urinary strain
  - specific cat breeds risk of cardiomyopathy
- The platform should provide a veterinarian-level daily prevention plan tailored to the pet’s breed and health status.

### C. Precise Product Recommendation Module

Based on the risk factors identified by the rapid screening, the platform should dynamically recommend related functional pet products from "Dr. Zhang's Happy Farm."

Examples of risk-driven product recommendations include:

- obesity or metabolic issues → low-fat functional formula
- joint or mobility concerns → pet egg roll or mobility-support product
- coat or skin health issues → functional lecithin egg products

Requirements:

- Product recommendations should appear below the report.
- Product cards should describe the intended health benefit.
- Each product should include an "Exclusive Discount Purchase" button.
- Use traffic redirection and click tracking parameters to simulate purchase traffic and conversion tracking.

### D. Academic and Marketing Report Summary (One-page Brief)

Write a one-page abstract that explains how to use the pet health big data accumulated on the platform to produce:

- academic journal papers,
- conference research outputs,
- professional scientific research endorsement,
- and evidence-based marketing support for "Dr. Zhang's Happy Farm."

The brief should explain how the platform can support:

- product credibility,
- scientific research validation,
- premium membership conversion,
- and pet product sales growth.

This summary should demonstrate how data, research, and marketing can be fused into one scientific-business loop.

## Prototype Scope

This project implements a front-end prototype of the system using Next.js and local browser storage to simulate CRM/member creation and premium access logic.

The prototype covers:

- health questionnaire UI,
- free member profile generation,
- free report screen,
- premium unlock paywall logic,
- breed-based risk interpretation,
- product recommendations,
- and an academic summary page.

## Run the Project

From the project folder, run:

```bash
npm install
npm run dev
```

Then open the app in the browser:

```text
http://localhost:3000
```

If port 3000 is occupied, Next.js may use another available port automatically.

## Project Structure

- app/page.tsx — landing page
- app/health-check/page.tsx — pet questionnaire and member creation flow
- app/report/page.tsx — free report and premium upgrade screen
- app/brief/page.tsx — academic/marketing one-page summary
- app/lib/pet-health.ts — membership, CRM, risk, and recommendation logic

## Deliverable Outcome

This prototype demonstrates a complete business loop from:

- health check data input,
- free member acquisition,
- simple report delivery,
- paid member upgrade,
- deep risk prediction,
- product recommendation,
- and evidence-backed marketing content.

It fulfills the intended business model for a pet healthcare and longevity platform while providing a realistic, visually credible micro-web product prototype.
