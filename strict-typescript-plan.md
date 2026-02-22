# The Golden Rules of TypeScript Migration (Phase 2)

Currently, the project compiles successfully, but we are using a temporary "escape hatch" by setting `"noImplicitAny": false` in our `tsconfig.json` and manually typing some service variables as `any`.

To achieve true "Industry Standard" type safety (often called "Strict Mode"), we need to follow the Golden Rules of TypeScript. Here is the step-by-step plan to get there:

## 1. Eliminate the `any` Keyword completely
The `any` keyword disables TypeScript's compiler. Our goal is to never use it.
- **Objective:** Turn `"noImplicitAny": true` back on in `tsconfig.json`.
- **Action:** Go through every file and remove any explicit or implicit `any`.

## 2. Leverage TypeScript Generics `<T>` for the Base Repository
Right now, `CrudRepository` accepts `(model: any)`. If we use Generics, the repository can automatically understand what Mongoose model it is dealing with.

```typescript
// BAD:
class CrudRepository {
    model: any;
}

// GOLDEN RULE (Generics):
import { Model, Document } from 'mongoose';

class CrudRepository<T extends Document> {
    model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    
    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }
}
```
This forces `tweetRepository` to automatically know it returns a `Tweet` interface without us explicitly typing it every time!

## 3. Connect Zod Schemas to the Controllers (DTOs)
Right now, controllers do this:
```typescript
let data = req.body; // TS sees this as 'any'
await tweetService.create(data);
```
We need to bind the amazing Zod schemas we made in Phase 4 directly to the `Request` payload.

```typescript
// GOLDEN RULE (Typed Requests):
import { CreateTweetBody } from './tweet.schema.js';

export const createTweet = async (req: Request<{}, {}, CreateTweetBody>, res: Response) => {
    // req.body is now strictly typed! If you type `req.body.`, VSCode will autocomplete `content`!
    const data = req.body; 
}
```

## 4. Return Types for Services
Every function in the `modules/*/*.service.ts` files should have an explicit return type so we know exactly what is coming out of the database before we send it to the user.
```typescript
async getTweet(id: string): Promise<ITweet | null> {
    return await this.tweetRepository.get(id);
}
```

## 5. Standardized Error Handling
Throwing raw objects like `throw { message: "no user found" }` is bad practice in TypeScript because the `catch (error)` block doesn't know what properties the error has. 
- **Action:** Create customized AppError classes that extend the native `Error` class, or stick to throwing native `new Error("message")`.

---

## Action Plan to Execute:
If you give me the green light, I will systematically execute this plan by:
1. Creating the remaining Schema Interfaces for Tweets, Comments, Likes, and Hashtags (similar to what we did for `IUser`).
2. Refactoring `CrudRepository` to use strict TypeScript Generics.
3. Hooking up the `z.infer<>` DTOs (Data Transfer Objects) to the `req.body` in all controllers.
4. Turning `"noImplicitAny": true` back on and verifying the build still passes flawlessly.
