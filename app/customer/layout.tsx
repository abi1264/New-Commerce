import Footer from './components/shared/Footer';
import Header from './components/shared/Header';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //function defination starts
  return (
    <>
      <div className="flex min-h-screen">
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
