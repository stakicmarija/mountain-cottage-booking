# Mountain Cottage Booking System

This project is a full-stack web application developed for the course **Programming Internet Applications (PIA)** at the Faculty of Electrical Engineering, University of Belgrade.

The system represents a platform for renting mountain cottages in Serbia, supporting three types of users: tourists, cottage owners, and administrators.

---

## Project Overview

The application enables users to browse, manage, and reserve mountain cottages through a responsive web interface.

Main goals of the project include:

* user authentication and authorization
* cottage search and filtering
* reservation management
* role-based system behavior
* statistical reporting
* responsive web design

The project follows the official course specification.

---

## User Roles

### Tourist

After logging in, the tourist can:

* view and update profile information
* search and filter cottages
* view cottage details (gallery, services, map, ratings)
* create reservations through a multi-step form
* cancel upcoming reservations
* leave ratings and comments for completed stays
* view active and past reservations

---

### Cottage Owner

After logging in, the owner can:

* manage personal profile
* review incoming reservation requests
* accept or reject reservations (with comment)
* view reservations in calendar form (FullCalendar)
* manage own cottages (add, edit, delete)
* upload cottage images
* import cottage data from JSON
* view statistics:

  * reservations per month (bar chart)
  * weekend vs weekday ratio (pie chart)

---

### Administrator

The administrator has extended privileges:

* manage all users (add, edit, delete, deactivate)
* approve or reject registration requests
* monitor all cottages
* temporarily block poorly rated cottages
* view system statistics

---

## Key Functionalities

* Secure login system
* Registration approval workflow
* Password validation with regex
* Profile image upload with validation
* Advanced cottage search and sorting
* Interactive map display
* Multi-step reservation workflow
* Reservation calendar view
* Ratings and comments system
* Responsive UI
* Server-side validation

---

## Technology Stack

* Frontend: Angular 18
* Backend: Node.js + Express
* Database: MongoDB
* Charts: Chart libraries
* Calendar: FullCalendar
* Styling: CSS

---

## Project Structure

```text
pia projekat/
├── frontend/
├── backend_Node/
├── database/
└── users.txt
```

---

## Notes

* The database is initialized independently from the application, as required by the specification.
* The application is designed to handle invalid input robustly.
* The UI is responsive and tested across multiple browsers.

---

## Course Information

* Course: Programming Internet Applications (PIA)
* Faculty: School of Electrical Engineering, University of Belgrade
* Academic year: 2024/2025
* Project type: Individual coursework

---

## Disclaimer

This project was developed for educational purposes as part of university coursework.
