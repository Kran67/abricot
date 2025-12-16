import Button from "./components/client/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Button text="Se connecter" url="https://www.google.fr" disabled={false} width={217} height={50} />
        <Button text="Se connecter" url="" disabled={true} width={217} height={50} />
        <Button text="IA" url="" disabled={false} width={94} height={50} color="orange" image={{ url: "/images/star.svg", alt: "IA star image" }} />
      </main>
    </div>
  );
}
