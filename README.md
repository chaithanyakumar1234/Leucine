Developed a full-stack web application where users can register, log in, and request access to different software based on their role. The backend is built using Node.js with Express, and it connects to 

a PostgreSQL database using TypeORM. It supports three types of users: Employees, Managers, and Admins. When a new user signs up, they are assigned the Employee role by default. All passwords are securely stored 
using bcrypt, and user sessions are managed using JWT tokens for authentication.

Admins have a dedicated page to add new software and define access levels (like Read, Write, Admin). Employees can request access to any software and mention their reason. These requests are stored and marked as 
"Pending". Managers can log in and see a list of pending requests, and they have the ability to approve or reject them.

The frontend is created using React with TypeScript and Vite, with each role getting redirected to its respective dashboard after login. Pages include sign-up, login, create software (admin), 
request access (employee), and pending requests (manager). API calls to the backend are managed using Axios, and routing is handled via React Router. We also included token decoding to automatically 
redirect users based on their role.

Finally, we added setup instructions, a .env config, and tips for deploying the app on services like Railway or Netlify, making the system secure, role-aware, and production-ready.
