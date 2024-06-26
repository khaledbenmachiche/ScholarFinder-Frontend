## Project Overview
An intuitive web platform allowing users to browse and discover scientific articles with ease. Users can filter results, view article details, including full-text in text and PDF formats, and save their favorite articles. Administrators can manage moderators and initiate uploads of scientific articles from PDF files. Subsequently, moderators can verify and correct information extracted from the PDF articles.

# Getting Started
## Folder structure
**components** : Reusable React components

**context** : React context providers for global state

**hooks** : Custom React hooks

**pages** : React components representing different pages

**services** : Modules for interacting with external services or APIs

**types** : TypeScript definition files

**utils** : General utility functions

## Prerequisites

* Node.js
* npm
  
## Installation
1-Clone the repository.

```bash
git clone https://github.com/khaledbenmachiche/tp_igl_frontend
cd tp_igl_frontend
```
2-Install dependencies.

```bash
npm install
```

3-Start the development server.

```bash
npm run dev
```


## Docker Support
### Prerequisites
  **Docker**

### Usage 

To run the application using Docker, follow these steps:
1- Build the Docker image.
  ```bash
  docker build -t tp_igl_frontend .
  ```
2- Run the Docker container.
  ```bash
  docker run -dp 8080:8080 tp_igl_frontend
  ```

## Functional Testing
For functional testing, Selenium is used :
  ```bash
  python3 selenium-test.py
  ```

## Contributing


1- Create a new branch for your feature or bug fix.

```bash
git checkout -b feature/my-feature
```
2- Make your changes and commit them with a clear message.

```bash
git commit -m "Add new feature"
```
3- Push your branch to the repository.

```bash
git push origin feature/my-feature
```
4- Create a pull request to the main branch of the repository.

