import "./App.css";
import Header from "./components/HeaderComponent";
import Sidebar from "./components/SideBarComponent";
import Main from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
