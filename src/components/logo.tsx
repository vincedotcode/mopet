import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string; // Optional className prop
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div className={`text-2xl font-bold flex items-center space-x-2 ${className}`}>
      <Link href="/" className="hover:underline flex items-center">
        <PawPrint 
          className={`h-8 w-8 transition-colors ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        />
        <span className="ml-2">mopet</span>
      </Link>
    </div>
  );
};

export default Logo;
