# 🏗️ Modern Angular Micro-Frontend Monorepo Workspace

An enterprise-grade, micro-frontend monorepo workspace built using **Angular v19**, **Standalone APIs** (No NgModules), **TypeScript Configurations**, **Tailwind CSS v3**, and **Webpack 5 Module Federation**.

---

## 🧭 Architecture Overview

This monorepo handles state sharing, reusable UI components, and decoupled builds across the network:
*   **Host Shell (`shell`):** The orchestrator layout container. It manages global authentication/session states and handles dynamic lazy routing mapping lookups.
*   **Profile MFE (`profile-mfe`):** An independent standalone feature micro-frontend that exposes raw TypeScript routes.
*   **Shared Assets Library (`shared-assets`):** A shared workspace package (`@shared-assets`) exporting a real-time reactive state engine via **Angular Signals** and shared Tailwind UI elements.

---

## 🛠️ Step-by-Step Workspace Setup Breakdown

### 1. Initialize a Clean Monorepo Workspace
Create a multi-project workspace without a default application to keep your micro-frontends cleanly separated.
```bash
npx ng new modern-mfe-workspace --create-application=false
cd modern-mfe-workspace
```

### 2. Generate Standalone Applications
Generate two independent applications using the modern standalone flags.
```bash
npx ng generate application shell --routing --style=scss --standalone
npx ng generate application profile-mfe --routing --style=scss --standalone
```

### 3. Apply Webpack Module Federation
Add the module federation schematics to shift your builders from the native application builder over to an extensible Webpack 5 custom configuration matrix.
```bash
npx ng add @angular-architects/module-federation --project=shell --port=4200 --type=host
npx ng add @angular-architects/module-federation --project=profile-mfe --port=4201 --type=remote
```

### 4. Setup Your Shared Assets Core Library
Generate a shared workspace library project to house common services and reusable buttons.
```bash
npx ng generate library shared-assets
```

---

## 📦 Critical Code Configuration Files

### 💻 Environment Configurations
Automate environment ports so you never have to manually edit file configurations when switching between Local Dev and Production Previews:

**`projects/shell/src/environments/environment.development.ts` (Dev Mode File):**
```typescript
export const environment = {
  production: false,
  profileMfeUrl: 'http://localhost:4201/remoteEntry.js'
};
```

**`projects/shell/src/environments/environment.ts` (Prod Mode File):**
```typescript
export const environment = {
  production: true,
  profileMfeUrl: 'http://localhost:8081/remoteEntry.js'
};
```

### 🛣️ Shell Navigation Routing Engine
**`projects/shell/src/app/app.routes.ts`:**
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.profileMfeUrl,
        exposedModule: './Routes'
      }).then(m => m.PROFILE_ROUTES)
  }
];
```

### 🎨 Tailwind CSS v3 Configuration File
**`tailwind.config.js` (Root Directory File):**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/shell/src/**/*.{html,ts}",
    "./projects/profile-mfe/src/**/*.{html,ts}",
    "./projects/shared-assets/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🏎️ Running Local Development

### 1. Build Shared Assets (Mandatory First Step)
Before spinning up the development live watch servers, compile the shared assets library once so the compiler indexes your `@shared-assets` shortcut paths:
```bash
npx ng build shared-assets
```

### 2. Launch Local Dev Mode (Ports 4200/4201)
Run your Shell and Remote applications concurrently with a single command string. This automatically targets your `environment.development.ts` scripts:
```bash
# Force clear active network port configurations from memory
kill -9 (lsof -t -i:4200) (lsof -t -i:4201) 2>/dev/null

# Clean build caches and launch your local watch environments
rm -rf .angular
npm run start:all
```
*   **Host Shell Core Domain:** `http://localhost:4200`
*   **Remote MFE Port:** `http://localhost:4201`

---

## 🚀 Compiling and Verifying Production

### 1. Execute Production Compilation Script
Compile and minify your multi-project workspace into distribution static bundles:
```bash
npm run build:all
```
Your compiled outputs populate under `dist/shell` and `dist/profile-mfe`.

### 2. Preview the Production Build Locally (Ports 8080/8081)
To test how your final production bundles operate inside static cloud servers, spin up your local preview web servers concurrently:
```bash
# Force clear previous production preview ports
kill -9 (lsof -t -i:8080) (lsof -t -i:8081) 2>/dev/null

# Boot the preview infrastructure
npm run preview:all
```
Open **`http://localhost:8080`** in your browser. Navigating to `/profile` and hitting refresh (**F5**) functions cleanly thanks to our automated proxy fallback rules.

---

## 🐳 Containerization with Docker & Nginx

We use isolated production **Nginx** web servers to bundle individual assets, map cross-origin permissions (`CORS`), and handle deep-route routing re-writes securely back to `index.html`.

### Docker Architecture Configuration Files (Root Level)

**`Dockerfile.shell`:**
```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps 
COPY . .
RUN npx ng build shared-assets --configuration production
RUN npx ng build shell --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/shell /usr/share/nginx/html
COPY nginx.shell.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`Dockerfile.profile`:**
```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps 
COPY . .
RUN npx ng build shared-assets --configuration production
RUN npx ng build profile-mfe --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/profile-mfe /usr/share/nginx/html
COPY nginx.profile.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Launch and Stop the Container Stack
Ensure your Mac **Docker Desktop Application Dashboard** is active in the background, then run:
```bash
# Build custom images and spin up containers in the background
docker compose up --build

# Stop the containers and release network ports completely
docker compose down
```
*   **Docker Host Container URL:** `http://localhost:8080`
*   **Docker Remote Container URL:** `http://localhost:8081`

---

## ⚙️ Automated GitHub Actions CI/CD Pipeline

Every time you execute a `git push` or open a Pull Request against your repository's `main` branch, an automated integration flow triggers in the cloud runner.

**Workflow Location:** `.github/workflows/ci-cd-pipeline.yml`

### Pipeline Capabilities Handled Natively:
1.  **Node.js 24 Execution:** Upgrades pipeline scripts to run on native modern engine nodes.
2.  **Strict Peer Dependency Bypassing:** Appends `--legacy-peer-deps` to bypass dependency warnings on strict server environments.
3.  **Cross-Platform Path Validation:** Evaluates package files directly under parent build scopes.
4.  **Docker Syntax Validation:** Automatically compiles your custom Nginx Dockerfiles inside the cloud runner to verify image stability before cloud deployment.

---

## 🛠️ Complete Workspace Script Master Registry
Your final **`package.json`** scripts block contains all the automation wires that keep this ecosystem operational:

```json
"scripts": {
  "ng": "ng",
  "start:shell": "npx ng serve shell",
  "start:profile": "npx ng serve profile-mfe",
  "start:all": "concurrently \"npm run start:shell\" \"npm run start:profile\"",
  
  "build:shared": "npx ng build shared-assets --configuration production",
  "build:shell": "npx ng build shell --configuration production",
  "build:profile": "npx ng build profile-mfe --configuration production",
  "build:all": "npm run build:shared && npm run build:shell && npm run build:profile",

  "preview:shell": "npx http-server dist/shell -p 8080 --proxy http://localhost:8080/index.html",
  "preview:profile": "npx http-server dist/profile-mfe -p 8081 --cors",
  "preview:all": "concurrently \"npm run preview:shell\" \"npm run preview:profile\""
}
```
