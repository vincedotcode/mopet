import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="text-2xl font-bold text-black dark:text-white flex items-center space-x-2">
      <Link href="/" className="hover:underline flex items-center">
       
        <PawPrint 
          className={`h-8 w-8 transition-colors ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        />
        <span className="ml-2">mopet</span> {/* Added spacing between icon and text */}
      </Link>
    </div>
  );
};

export default Logo;
