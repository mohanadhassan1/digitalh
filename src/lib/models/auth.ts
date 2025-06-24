import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "user";
  }
}

export type LoginFormData = {
  email: string;
  password: string;
};

export type UserSession = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image?: string;
};