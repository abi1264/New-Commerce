import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import SideBar from './components/shared/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //function defination starts
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
