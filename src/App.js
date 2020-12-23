import './styles/main.css';
import Form from './components/Form';

function App() {
  return (
    <div className="AppBody">
      <div className="HeadlineBlock">
          <img className="AppLogo" src="/icon_logo.png" alt=""></img>
          <h1>Simple React Authorization App</h1>
          <h2>With Validation and sending data to API</h2>
          <div className="AuthorName">Arshak Ishkhanyan</div>
        </div>
      <Form />
    </div>
  );
}

export default App;
