import Header from "@/components/Header";
import Therapists from "@/components/Therapists";
import Footer from "@/components/Footer";

const TherapistsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Therapists />
      </main>
      <Footer />
    </div>
  );
};

export default TherapistsPage;
