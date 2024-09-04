import { OPTIONS } from '@/app/api/auth/[...nextauth]/route';
import { LoginResponseType } from '@/types/login';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

async function getServer(): Promise<LoginResponseType | null> {
  return await getServerSession(OPTIONS);
}

async function getClient(): Promise<LoginResponseType | null> {
  const session = await getSession();

  return session?.user ?? null;
}

export async function getAuth(isServerSide: boolean): Promise<LoginResponseType | null> {
  return isServerSide ? await getServer() : getClient();
}
