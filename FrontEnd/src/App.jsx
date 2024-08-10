import Scanner from "./components/Scanner";
import logo from "./assets/transparent-logo.svg";

function App() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#30cfd0] to-[#330867] flex items-center justify-center relative">
      <div className="absolute top-0 left-16">
        <img src={logo} alt="Logo" className="w-44 h-44" />
      </div>
      <Scanner />
    </main>
  );
}

export default App;
