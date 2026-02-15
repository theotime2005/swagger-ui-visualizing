# OpenAPI/Swagger Editor & Viewer

A modern, accessible web application for editing and visualizing OpenAPI (Swagger) specifications. Built with React, TypeScript, and Tailwind CSS.

## Features

- **File Loading**: Supports Drag & Drop and file selection for `.json`, `.yaml`, and `.yml` files.
- **Automatic Conversion**: Automatically converts uploaded YAML files to JSON for editing.
- **Live Editing**: Uses Monaco Editor (VS Code core) for a professional JSON editing experience.
- **Real-time Preview**: Integrates Swagger UI to render the specification instantly as you type.
- **Accessibility**: Designed with ARIA labels, focus management, and semantic HTML for broad accessibility.
- **Responsive Design**: Split-view layout that adapts to mobile (stacked) and desktop (side-by-side) screens.

## Technical Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Editor**: `@monaco-editor/react`
- **Viewer**: `swagger-ui-react`
- **Icons**: `lucide-react`
- **Parsing**: `js-yaml`

## Setup & Local Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm start
    ```
    The application will launch at `http://localhost:3000` (or similar).

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Deployment to GitHub Pages

This project can be easily deployed to GitHub Pages using GitHub Actions.

### Prerequisite

Ensure your `package.json` has the `homepage` field set to your GitHub Pages URL:

```json
"homepage": "https://<username>.github.io/<repository-name>"
```

### Method 1: GitHub Actions (Recommended)

1.  Create a file at `.github/workflows/deploy.yml`:

    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches: [ main ]

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          
          - name: Setup Node
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              cache: 'npm'

          - name: Install Dependencies
            run: npm ci

          - name: Build
            run: npm run build

          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: ./build # Or ./dist depending on your bundler

      deploy:
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        needs: build
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

2.  Go to your GitHub Repository **Settings** > **Pages**.
3.  Under **Build and deployment**, select **Source** as **GitHub Actions**.
4.  Push your code to `main`. The action will automatically build and deploy.

### Method 2: Manual Deployment (`gh-pages`)

1.  Install the `gh-pages` package:
    ```bash
    npm install --save-dev gh-pages
    ```
2.  Add these scripts to `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
    ```
3.  Run `npm run deploy`.

## Usage Guide

1.  **Launch the App**: Open the web application in your browser.
2.  **Load a Spec**: Click "Load File" or drag a `swagger.yaml` or `openapi.json` file into the drop zone.
3.  **Edit**: Modify the JSON structure in the left (or top) pane. The editor provides basic validation.
4.  **View**: Observe the changes reflected immediately in the Swagger UI panel on the right (or bottom).
5.  **Export**: Click "Export JSON" in the header to save your modified specification.
