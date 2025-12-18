import React from "react";
import Header from "./components/client/Header";
import Footer from "./components/client/Footer";
import { HeaderMenuItems, PageViews } from "./enums/enums";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

export default function Home() {
  const pages: string[] = ["dashboard", "projects", "projectdetail", "profile"];
  const view: number = PageViews.Dashboard;
  const displayedView = React.useCallback(() => {
    switch (view) {
      case PageViews.Project:
        return <Projects />;
      case PageViews.ProjectDetail:
        return <ProjectDetails />;
      case PageViews.Profile:
        return <Profile name="Amélie" lastName="Dupont" email="a.dupont@mail.com" password="azerty" />;
      default:
        return <Dashboard />;
    }
  }, [view]);

  return (
    <main className="flex flex-col bg-white w-1440">
      <Header activeMenu={HeaderMenuItems.Profile} />
      {displayedView()}
      <Footer />
    </main>
  );
}
