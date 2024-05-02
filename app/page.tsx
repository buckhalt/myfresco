import { redirect } from 'next/navigation';
import { api } from '~/trpc/server';

export default async function Home() {
  await api.appSettings.requireAppNotExpired();
  redirect('/dashboard');
}
