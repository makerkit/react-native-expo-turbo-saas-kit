![Expo + Supabase - React Native Starter Kit by MakerKit.dev](apps/expo-app/assets/images/makerkit.webp)

# NEW! Expo + Supabase - React Native Starter Kit by MakerKit.dev

This is a starter kit for React Native applications, mostly useful as a
companion Starter Kit for [MakerKit](https://makerkit.dev), but can be used as a
standalone starter kit.

It uses Expo and Supabase for authentication and database management.

NB: this is an early preview. It likely contains bugs, and the documentation is
still incomplete.

## What's Included

### Core Architecture

- 🏗️ Expo + React Native
- 🎨 NativeWind + Tailwind CSS +
  [React Native Reusable Components](https://rnr-docs.vercel.app/getting-started/introduction/)
- 🔐 Supabase authentication & basic DB
- ✨ Full TypeScript + ESLint + Prettier configuration

### Key Features

- 👤 User authentication flow
- ⚙️ User profile & settings
- 🔒 Protected routes

### Technologies

This starter kit provides core foundations:

- [Expo](https://expo.dev/) - React Native development environment
- [React Native](https://reactnative.dev/) - Cross-platform mobile development
- [Supabase](https://supabase.com/) - Authentication and database management
- [NativeWind](https://nativewind.dev/) - Tailwind CSS for React Native
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Native Reusable Components](https://rnr-docs.vercel.app/getting-started/introduction/) -
  Reusable React Native components
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [ESLint](https://eslint.org/) - Linting and code formatting
- [Prettier](https://prettier.io/) - Code formatting

## Preview

![Sign In](apps/expo-app/assets/images/sign-in.png)
![Sign Up](apps/expo-app/assets/images/sign-up.png)

## Requirements

- Node.js 18.x
- pnpm
- Docker (for Supabase)

## Getting Started

Below are the steps to get started with the starter kit.

### Installation

1. Clone the repository

```bash
git clone https://github.com/makerkit/expo-turbo-saas-kit.git <your-project-name>
```

2. Install dependencies

```bash
cd <your-project-name>
pnpm install
```

3. Create .env file

Using the .env.template file as a template, create a .env file in the `apps/expo-app` directory

First:
```bash
cd apps/expo-app
```

Second:
```bash
cp .env.template .env
```

Replace the `EXPO_PUBLIC_SUPABASE_API_URL` with a proxy if you are testing using a device connected to your computer.

4. Start the development server

```bash
pnpm dev
```

5. Start Supabase

Run the following command to start Supabase:

```
pnpm run supabase:start
```

6. Stop Supabase

Run the following command to stop Supabase:

```
pnpm run supabase:stop
```

## Documentation

The documentation is not yet available. Please check back later.

## Contributing

Contributions for bug fixed are welcome! However, please open an issue first to
discuss your ideas before making a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for more details.

## Support

No support is provided for this kit. Feel free to open an issue if you have any
questions or need help, but there is no guaranteed response time, nor guarantee
a fix.
