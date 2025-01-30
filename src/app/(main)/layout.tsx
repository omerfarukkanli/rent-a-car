import Footer from '@/components/footer/Footer';
import '../globals.css';
import Header from '@/components/header/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
