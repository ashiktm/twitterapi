# TypeScript Migration Plan

This document outlines the step-by-step plan to migrate the `twitterapi-1` project from Node.js (JavaScript, ES Modules) to a fully typed TypeScript ecosystem.

## Phase 1: Environment & Configuration
### 1. Install Dependencies
We'll need TypeScript itself, a runtime to execute it during development, and type definitions for our existing packages.
```bash
npm install -D typescript tsx @types/node @types/express @types/mongoose @types/cors @types/bcrypt @types/jsonwebtoken @types/passport-jwt @types/swagger-ui-express @types/cookie-parser
```
*(Note: We use `tsx` (TypeScript Execute) instead of `ts-node` or `nodemon` because it natively handles ES Modules and TypeScript instantly without complex setup.)*

### 2. Initialize TypeScript Configuration
Generate a `tsconfig.json` file to dictate how TypeScript compiles our code.
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

### 3. Update `package.json` Scripts
Modify the start script to use `tsx` instead of `nodemon`, and add a build script.
```json
"scripts": {
  "start": "tsx watch src/index.ts",
  "build": "tsc",
  "serve": "node dist/index.js",
  "swagger": "tsx swagger.ts",
  "prestart": "npm run swagger"
}
```

---

## Phase 2: Renaming & Restructuring
1. Rename all files inside `src/` to `.ts`.
   - `src/index.js` -> `src/index.ts`
   - `src/models/*.js` -> `src/models/*.ts`
   - `src/controller/*.js` -> `src/controller/*.ts`
   - etc.
2. Rename `swagger.js` to `swagger.ts`.

---

## Phase 3: Typing the Application Code
### 1. Fix Imports
In Node.js ES Modules (which you are currently 
using via `"type": "module"`), imports require the `.js` extension (e.g., `import auth from './auth.js'`). In TypeScript using NodeNext resolution, this remains the same! We actually **keep** the `.js` extension in our local imports even when the file is `.ts`. 

### 2. Add Express Types (Controllers)
Every controller function needs to have its `req` and `res` beautifully typed.
```typescript
import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  // ...
};
```

### 3. Type Custom Interfaces (Middleware & Auth)
Since `Passport.js` injects the user into `req.user`, we must extend the core Express `Request` interface globally so TypeScript doesn't throw errors when we do `req.user._id`.

Inside a new file `src/types/express/index.d.ts`:
```typescript
import { IUser } from '../../models/user.js'; // The interface we'll make

declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      user?: User;
    }
  }
}
```

### 4. Mongoose Models & Schemas
Mongoose pairs wonderfully with TypeScript, but it requires creating an interface for each Schema.

**Example `user.ts`:**
```typescript
import mongoose, { Document, Model } from "mongoose";

// 1. Create the Interface
export interface IUser extends Document {
  email: string;
  password?: string;
  username?: string;
  bio?: string;
  profilePicture?: string;
  tweets: mongoose.Types.ObjectId[];
  comparePassword(password: string): boolean;
  genJWT(): string;
}

// 2. Define Schema with the Interface
const userSchema = new mongoose.Schema<IUser>({
  // ...
});

// 3. Export Model typed with Interface
const User = mongoose.model<IUser>("User", userSchema);
export default User;
```

### 5. Repositories and Services
Update classes to include parameter and return types:
```typescript
// Inside tweetRepository.ts
async getTweet(id: string): Promise<any> {
    // ...
}
```

---

## Phase 4: Zod Schema Validation & OpenAPI Generation
Because we are utilizing TypeScript, we will replace `swagger-autogen` with total Zod integration to ensure our API docs are structurally guaranteed to be correct.

### 1. Install Zod Documentation Packages
```bash
npm install zod @asteasolutions/zod-to-openapi
```

### 2. Define Shared Zod Schemas
Create a file `src/schemas/user-schemas.ts`. This acts as the single source of truth for Validation, Types, and Documentation.
```typescript
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const userLoginSchema = z.object({
  email: z.string().email().openapi({ description: "User email address" }),
  password: z.string().min(6).openapi({ example: "password123" }),
});

// Automatically generate TypeScript Types from Zod
export type UserLoginBody = z.infer<typeof userLoginSchema>;
```

### 3. Create Validation Middleware
Build a strongly-typed Express middleware in `src/middleware/validate.ts` that safely validates incoming requests against the given Zod schema and generates a 400 error if it fails.

### 4. Build the OpenAPI Registry
In `src/config/openapi.ts`, gather all the route's defined Zod schemas, register the paths, and generate the final `swagger-output.json` entirely programmatically based on the types you've written.

---

4. Test a production build with `npm run build` -> This generates pure JavaScript out to the `dist/` folder.

---

## Phase 6: Industry Standard Directory Structure
Once migrated to TypeScript, it is best practice to group files logically. For a mature, feature-driven Express + TypeScript API, the "Domain/Feature-Driven" architecture is highly recommended over the classic "MVC layered" approach.

### Feature-Driven (Domain) Architecture
Instead of scattering all controllers in one folder and all models in another folder, group files by the feature they belong to so adding or removing a feature is highly contained.

```text
src/
├── config/                  // Universal app configuration
│   ├── env.ts               // Zod validation for process.env
│   ├── database.ts          // Mongoose connection setup
│   └── openapi.ts           // Zod-to-OpenApi registry
│
├── middleware/              // Global reusable Express middleware
│   ├── auth.ts              // Passport logic
│   ├── errorHandler.ts      // Global catch-all error handling
│   └── validateRequest.ts   // Zod request validator
│
├── modules/                 // The meat of the app (Feature/Domain folders) 
│   ├── user/                // ---> EVERYTHING User related
│   │   ├── user.model.ts    // Mongoose schema + Types
│   │   ├── user.schema.ts   // Zod validation schemas
│   │   ├── user.service.ts  // Business logic
│   │   ├── user.routes.ts   // Endpoints mapping directly to service
│   │   └── user.test.ts     // Unit/Integration tests
│   │
│   ├── tweet/               // ---> EVERYTHING Tweet related
│   │   ├── tweet.model.ts 
│   │   ├── tweet.schema.ts
│   │   ├── tweet.service.ts
│   │   └── tweet.routes.ts
│   │
│   └── hashtag/             // ---> EVERYTHING Hashtag related
│       └── ...
│
├── types/                   // Global TypeScript type extensions
│   └── express.d.ts         // e.g., Extending req.user
│
├── app.ts                   // Express app initialization (Middleware, Routing bind)
└── server.ts                // The main entry point (app.listen + DB connection)
```

**Why this structure?**
- **Scalability:** When you have 50 features, you don't want to sift through a single file with 50 routes, or a folder with 50 controllers. 
- **Separation of Concerns:** `server.ts` handles the bare metal (listening to ports). `app.ts` handles the application logic (middleware, attaching routers).
- **Zod Centralization:** Each domain (like `user/`) has its own `.schema.ts` file that holds all Zod schemas related to Users, preventing massive 500-line global validation files.
