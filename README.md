# Nuture Mind

## Overview
NutureMind is a web-based platform designed to detect and assess depression, stress, and anxiety using facial recognition technology and the DASS-21 questionnaire. This project aims to provide users with a convenient and accessible tool to evaluate their mental well-being from the comfort of their own homes.

## Features
Facial Recognition: Utilizes advanced facial recognition algorithms to analyze facial expressions and detect potential signs of depression, stress, and anxiety.
DASS-21 Questionnaire: Offers the widely recognized Depression, Anxiety, and Stress Scale (DASS-21) questionnaire to assess the severity of these conditions.
Comprehensive Assessment: Combines the results of facial analysis and questionnaire responses to provide users with a holistic evaluation of their mental health.
User-Friendly Interface: Provides an intuitive and user-friendly interface, making it easy for individuals to navigate the assessment process.  
Privacy and Security: Ensures the highest level of data privacy and security, implementing robust measures to protect user information.

## Installation
Clone the repository.

### Backend (Nodejs Server)
Install the required dependencies.  
Configure the necessary environment variables, refer the .env.example file.  
Start the application: npm run dev.  
The backend server will start at http://localhost:5000.  

### Flask Server (ML Model)
Install the required dependencies: npm install  
Start the application: python app.py  
The server will start at http://127.0.0.1:8000. 

### Frontend
Install the required dependencies: npm install  
Configure the necessary environment variables, refer the .env.example file.  
Start the application: npm run start  
Access the platform through your web browser at http://localhost:3000.  
Make sure to start your backend and flask server working before starting the frontend.