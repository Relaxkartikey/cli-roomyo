import { redirect } from 'next/navigation';

export default async function AdminLoginPage() {
  redirect('/api/payload/admin');
} 