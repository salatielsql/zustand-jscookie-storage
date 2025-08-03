# Zustand JS Cookie Storage 🐻 🍪

A Zustand plugin to persist state to cookies using the battle-tested [js-cookie](https://github.com/js-cookie/js-cookie) library. Perfect for sharing state between Server-Side and Client-Side applications.

## Installation

```bash
npm install js-cookie zustand-jscookie-storage
# or
yarn add js-cookie zustand-jscookie-storage
# or
pnpm add js-cookie zustand-jscookie-storage
```

## Usage

### Basic Setup

Create a Zustand store with cookie persistence:

```typescript
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Import the lib
import { CookieStorage } from "zustand-jscookie-storage";

// Create cookie storage instance
const cookieStorage = new CookieStorage();

// Create your store with persistence
export const useCookieStore = create()(
  persist(
    (set) => ({
      // Your state here
    }),
    {
      name: "my-cookie-store", // Cookie name
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
```

### Custom Cookie Attributes

You can customize cookie attributes like expiration, security settings, and more:

```typescript
import { CookieStorage } from "zustand-jscookie-storage";

// Custom cookie attributes
const cookieStorage = new CookieStorage({
  expires: 7, // 7 days
  secure: true,
  sameSite: "strict",
  path: "/",
  domain: ".example.com",
});
```

### Default Cookie Attributes

If no attributes are provided, the following secure defaults are used:

- `expires`: 30 days
- `httpOnly`: false (required for client-side access)
- `path`: '/'
- `sameSite`: 'strict'
- `secure`: true

To see the list of all attributes refer to [js-cookie docs](https://github.com/js-cookie/js-cookie?tab=readme-ov-file#cookie-attributes)

## Alternatives

- [zustand-cookie-storage](https://github.com/nanotexnolagiya/zustand-cookie-storage)

## License

MIT
