# Python-Git-Revision

This repository is a personal revision workspace rather than a single production project. It combines Python practice notebooks, data-analysis labs, a Django + React full-stack practice app, Git course exercises, and supporting notes/PDFs used for interview prep and concept review.

The two most substantial areas are:

- `Fast Labs/`: a sequence of lab notebooks covering core Python, file handling, text processing, data analysis, plotting, and introductory ML-style dataset work.
- `Django-Practice/`: a full-stack practice project with a Django REST backend and a React + TypeScript + Vite frontend.

## What This Repo Contains

### 1. `Fast Labs/`
This folder contains multiple Jupyter notebooks and small supporting files used for hands-on lab work.

Topics covered across the labs include:

- basic Python problem solving and syntax exercises
- strings, loops, list comprehensions, random values, and sequence manipulation
- inventory/order-history style notebook work
- file I/O with supporting text files such as `orders.txt`, `spam.txt`, `reg_no.txt`, and `text.txt`
- regular-expression and text-processing practice
- data analysis with `pandas`
- plotting and exploratory analysis
- CSV-based exercises using datasets like:
  - `Titanic-Dataset.csv`
  - `stock_prices.csv`
  - `QS_2025.csv`

Representative files:

- `Fast Labs/lab2.ipynb`
- `Fast Labs/lab3.ipynb`
- `Fast Labs/lab4.ipynb`
- `Fast Labs/lab-5/lab5_inventory.ipynb`
- `Fast Labs/lab-5/lab5_ordersHistory.ipynb`
- `Fast Labs/lab-6/lab6.ipynb`
- `Fast Labs/lab-7/lab7.ipynb`
- `Fast Labs/lab-8/lab8.ipynb`
- `Fast Labs/lab-9/lab9.ipynb`
- `Fast Labs/lab-10/lab10.ipynb`
- `Fast Labs/lab-11/lab11.ipynb`
- `Fast Labs/Solutions.ipynb`

In practice, this folder reads like a progression from beginner-to-intermediate Python labs into more data-oriented notebook work.

### 2. `Django-Practice/`
This is the main application-style section of the repository.

#### Backend: `Django-Practice/Backend/client_portal/`
The backend is a Django project using Django REST Framework, `django-cors-headers`, and PostgreSQL-oriented configuration via environment variables.

Current backend structure and behavior:

- Django project: `client_portal`
- apps:
  - `clients`
  - `schoolManagement`
- dependencies defined in `pyproject.toml`
- environment-driven settings using `python-decouple`
- CORS enabled for the frontend dev server at `http://localhost:5173`

Implemented backend models:

- `Client`
  - name, email, phone, company, company size, industry, website
  - address fields
  - account manager foreign key
  - annual revenue, notes, priority level, active flag
- `School`
- `Student`
- `Teacher`
- `Subject`

Implemented API patterns:

- `clients` app:
  - `GET /api/clients/`
  - `POST /api/clients/`
- `schoolManagement` app via DRF router:
  - `/api/management/schools/`
  - `/api/management/students/`
  - `/api/management/teachers/`
  - `/api/management/subjects/`
- custom actions currently present:
  - `/api/management/schools/ids_only/`
  - `/api/management/subjects/subject_names/`

There is also a `notes.ipynb` file in this folder documenting the author’s learning process around:

- Django project/app structure
- models and migrations
- serializers and DRF views
- React frontend integration
- CORS setup
- Tailwind setup notes

#### Frontend: `Django-Practice/Frontend/react/`
The frontend is a React app built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- `react-hook-form`, `zod`, and Radix/shadcn-style UI components

Current frontend pages/components include:

- a simple landing page with routes into the practice areas
- `ClientPage.tsx`
  - fetches client data from Django
  - posts new client records to the backend
- `management.tsx`
  - dynamic route-based management page
  - builds forms for school, teacher, student, and subject flows
  - calls backend management endpoints
- `ChatBot.tsx`
  - UI-focused mock chat layout with sidebar/navbar components

This part of the repo is clearly a practice integration project for learning how a React frontend communicates with a Django REST backend.

### 3. `Basics - Revision/`
This folder contains revision notebooks and documents focused on fundamentals.

Covered material includes:

- NumPy basics
- Pandas basics
- Matplotlib basics
- markdown usage in Jupyter
- Python strings, lists, sets, dictionaries, and tuples
- database concepts such as schemas, joins, keys, and normalization
- data structures and OOP review
- linked list/BST examples
- extra course/reference notebooks on linear systems and arrays

It also includes several PDFs for interview-style revision and concept review.

### 4. `GItHub Course/`
This appears to be practice work from a Git/GitHub course.

Contents include:

- simple text exercises in `gitone/`
- basic HTML fragments/pages in `gittwo/` and `gitthree/`
- notes in `Notes.txt`

This section is separate from the Python/Django work and functions more like course artifact storage.

### 5. Root-level Notes and PDFs
At the repository root there are additional study/reference assets, including:

- `genai_interview_crash_course.md`
- PDF notes on React/React Router
- machine learning Q&A/reference PDFs

## Suggested Repo Reading Order
If you are trying to understand this repository quickly, this order makes the most sense:

1. `README.md`
2. `Fast Labs/`
3. `Django-Practice/`
4. `Basics - Revision/`
5. `GItHub Course/`

If your focus is the application project specifically, start here instead:

1. `Django-Practice/Backend/client_portal/client_portal/settings.py`
2. `Django-Practice/Backend/client_portal/client_portal/urls.py`
3. `Django-Practice/Backend/client_portal/clients/`
4. `Django-Practice/Backend/client_portal/schoolManagement/`
5. `Django-Practice/Frontend/react/src/App.tsx`
6. `Django-Practice/Frontend/react/src/pages/ClientPage.tsx`
7. `Django-Practice/Frontend/react/src/pages/management.tsx`
8. `Django-Practice/notes.ipynb`

## Running The Django Practice Project
This repo is not normalized into a single setup flow, but the Django practice app can be understood as follows.

### Backend
From `Django-Practice/Backend/client_portal/`:

- install dependencies from `pyproject.toml`
- provide environment variables for:
  - `SECRET_KEY`
  - `POSTGRESQL_NAME`
  - `POSTGRESQL_USER`
  - `POSTGRESQL_PASSWORD`
  - optionally `POSTGRESQL_HOST`
  - optionally `POSTGRESQL_PORT`
- run migrations
- start Django on port `8000`

### Frontend
From `Django-Practice/Frontend/react/`:

- install dependencies with `npm install`
- run the Vite dev server
- frontend expects backend access at `http://localhost:8000`

## Overall Character Of The Repository
The repository is best understood as a combined:

- Python revision notebook collection
- data-analysis lab archive
- Django/React integration practice project
- Git/GitHub course workspace
- interview-prep/reference notes directory

It is broad by design. The README should not frame it as one narrowly scoped app, because the contents are clearly multi-track and study-oriented.
