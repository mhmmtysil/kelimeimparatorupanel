import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      password: string;
      registerDate: Date;
      firstName: string;
      lastName: string;
      profilePhoto: string;
      accessToken: string;
      tokenExpiration: Date;
      isActive: boolean;
      isDelete: boolean;
      lastLoginDate: string;
      lastUpdateDate: string;
      createDate: string;
      validaty: string;
      role: number;
    } & DefaultSession["user"];
  }
}
