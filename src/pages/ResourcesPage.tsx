import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoLibrary from "@/components/VideoLibrary";
import Resources from "@/components/Resources";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <VideoLibrary />
        <Resources />
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
