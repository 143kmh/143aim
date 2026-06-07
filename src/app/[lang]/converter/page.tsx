import { getDictionary } from "@/dictionaries/getDictionary";
import ConverterClient from "./ConverterClient";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function ConverterPage({ params }: Props) {
  // Сервер загружает словарь один раз до рендера
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Передаем готовый словарь в наш умный клиентский компонент
  return <ConverterClient dict={dict} />;
}