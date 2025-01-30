import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-black text-gray-300 py-8 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* İletişim Bilgileri */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>İletişim</h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Phone size={18} />
                <span>+90 555 555 55 55</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail size={18} />
                <span>info@rentacar.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin size={18} />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              Hızlı Erişim
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-white transition-colors'
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href='/cars'
                  className='hover:text-white transition-colors'
                >
                  Araçlarımız
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-white transition-colors'
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='hover:text-white transition-colors'
                >
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              Sosyal Medya
            </h3>
            <div className='flex space-x-4'>
              <Link href='#' className='hover:text-white transition-colors'>
                <Facebook size={24} />
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                <Instagram size={24} />
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Rent A Car. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
