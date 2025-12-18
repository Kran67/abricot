import Header from "./components/client/Header";
import Footer from "./components/client/Footer";
import { HeaderMenuItems, PageViews } from "./enums/enums";
import Profile from "./pages/Profile";

export default function Home() {
  const view = PageViews.Profile;

  return (
    <main className="flex flex-col bg-white w-1440">
      <Header activeMenu={HeaderMenuItems.Profile} />
      {view === PageViews.Profile ?
        <Profile name="Amélie" lastName="Dupont" email="a.dupont@mail.com" password="azerty" />
        : <></>
      }
      <Footer />
    </main>
  );
}
