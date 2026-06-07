import { getDictionary } from "@/dictionaries/getDictionary";
import ReactionClient from "./ReactionClient";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function ReactionPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ReactionClient dict={dict} />;
}