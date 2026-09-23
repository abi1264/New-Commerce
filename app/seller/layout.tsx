import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import SideBar from './components/shared/Sidebar';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="w-full flex flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          {/* <Footer /> */}
          <Footer />
        </div>
      </div>
    </>
  );
}
