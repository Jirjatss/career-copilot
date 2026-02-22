# Career Copilot Chatbot

Career Copilot is an AI-powered career assistant designed to help users navigate their professional journey. It combines a responsive landing page with an intelligent chatbot to provide guidance on careers, interviews, CV reviews, and HR policies.

## Features

- **AI Chat Assistant**:
  - **Career Mode**: Get advice on career paths and skill development.
  - **Interview Mode**: Practice with mock interview questions.
  - **CV Review Mode**: Upload your CV for AI-driven feedback.
  - **HR Policies Mode**: Ask questions about company policies.
- **Landing Page**:
  - **Job Vacancies**: Browse the latest job opportunities with a responsive slider.
  - **Events**: Stay updated with upcoming career fairs and webinars.
  - **News**: Read the latest industry news.
  - **Testimonials**: See success stories from other users.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for smooth animations.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd career-copilot-chatbot
    ```

2.  **Setup Client:**

    Navigate to the client directory and install dependencies:

    ```bash
    cd client
    npm install
    ```

    Create a `.env.local` file in the `client` directory with your API URL:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

3.  **Setup Server:**

    Navigate to the server directory and install dependencies:

    ```bash
    cd ../server
    npm install
    ```

### Running the App

1.  **Start the Backend:**

    ```bash
    cd server
    npm start
    ```

2.  **Start the Frontend:**

    ```bash
    cd client
    npm run dev
    ```

3.  Open your browser and navigate to the frontend URL (typically `http://localhost:3000` or `http://localhost:3001`).

## License

This project is licensed under the MIT License.
