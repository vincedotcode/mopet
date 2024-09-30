import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import RootLayout from '@/app/RootLayout';
const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MoPet - Where Adoption is Valued',
  description: 'At MoPet, we believe in providing loving homes for every pet. Explore adoption opportunities and give pets a second chance at happiness.',
  keywords: 'MoPet, Pet Adoption, Adopt a Pet, Rescue Pets, Pet Care, Animal Shelter',
  openGraph: {
    title: 'MoPet - Adopt, Don’t Shop',
    description: 'Find your perfect pet companion at MoPet. We value pet adoption and believe every animal deserves a loving home.',
    url: 'https://mopet.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoPet - Where Adoption is Valued',
    description: 'Give a pet a second chance at happiness by adopting from MoPet. Your new best friend is waiting for you.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <RootLayout>
        {children}
        </RootLayout>
      
      </body>
    </html>
  );
}
