import { Grid } from '@mui/material';
// import logo from './logo.svg';
import './App.css';
import { FormBuilder } from './components/form-builder/FormBuilder';
import { MyForm } from './components/my-form/MyForm';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormBuilder></FormBuilder>
        </Grid>
        <Grid item xs={6}>
          <MyForm></MyForm>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
