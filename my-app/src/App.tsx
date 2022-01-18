import { Provider } from "react-redux";
import "./App.css";
import NasaImage from "./pages/NasaImage";
import { store } from "./reduxToolkit/store";

function App() {
  return (
    <div className="App">
      <span>hello</span>
      <Provider store={store}>
        <NasaImage />
      </Provider>
    </div>
  );
}

export default App;
