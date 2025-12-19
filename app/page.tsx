import React from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { HeaderMenuItems, PageViews } from "@/app/enums/enums";
import Profile from "@/app/pages/Profile";
import Dashboard from "@/app/pages/Dashboard";
import Projects from "@/app/pages/Projects";
import ProjectDetails from "@/app/pages/ProjectDetails";

export default function Home() {
  const pages: string[] = ["dashboard", "projects", "projectdetail", "profile"];
  const view: number = PageViews.Projects;
  const displayedView = React.useCallback(() => {
    switch (view) {
      case PageViews.Projects:
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
      <Header activeMenu={HeaderMenuItems.Projects} />
      {displayedView()}
      <Footer />
    </main>
  );
}
