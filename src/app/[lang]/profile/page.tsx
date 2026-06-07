// Путь: src/app/[lang]/profile/page.tsx
import { getDictionary } from "@/dictionaries/getDictionary";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage({ params }: { params: Promise<{ lang: 'en' | 'ru' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProfileClient dict={dict} />;
}