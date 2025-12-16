import Chip from "./components/client/Chip";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Chip text="Mes tâches" url="https://www.google.fr" width={217} height={50} active={false} image={{ url: "/images/task_check.svg", alt: "IA star image" }} />
        <Chip text="Kanban" url="" width={217} height={50} active={true} image={{ url: "/images/calendar.svg", alt: "IA star image" }} />
        <Chip text="Mes projets" url="" width={217} height={50} active={false} image={{ url: "/images/project.svg", alt: "IA star image" }} />
      </main>
    </div>
  );
}
