import Scanner from "./components/Scanner";
import Sidebar from "./components/Sidebar";
import logo from "./assets/scann-x-transparent-logo.svg";

function App() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#30cfd0] to-[#330867] flex items-center justify-center relative">
      <div className="absolute top-8 left-8">
        <img src={logo} alt="Logo" className="w-44" />
      </div>
      <Scanner />
      <Sidebar />
    </main>
  );
}

export default App;
