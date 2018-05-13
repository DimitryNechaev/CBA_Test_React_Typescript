import * as React from 'react';
import './App.css';

import DogsReader from './DogsReader';
import Settings from "./settings";

import logo from './logo.svg';

interface IAppState {
  dogUrls: string[];
}


class App extends React.Component<any, IAppState> {
  public state: IAppState = {
    dogUrls: []
  }

  public componentDidMount() {
     this.refresh();
  }

  public callApi = async () => {
    const settings = Settings;
    const dogsReader = new DogsReader(settings.dogsApiUrl);
    const dogUrls = await dogsReader.getUrls(8);

    return dogUrls;
  };

  public refresh = async() => {
    this.setState({ dogUrls: [] });
    this.callApi()
      .then(data => this.setState({ dogUrls: data }))
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.dogUrls.map(url => {
              return (
                <span key={url}>
                  {url}
                </span>
              )
            })}
        </p>
      </div>
    );
  }
}

export default App;
