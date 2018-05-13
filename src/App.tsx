import * as React from 'react';
import { Button, Col, Row } from 'reactstrap';

import DogsReader from './DogsReader';
import Settings from "./settings";

import { DogRow } from "./DogRow";


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
    const dogsReader = new DogsReader(settings.dogsApiUrl, settings.supportedExtensions);
    const dogUrls = await dogsReader.getUrls(8);

    dogUrls.forEach((val: string, idx: number) => { 
      if (!val) {
        dogUrls[idx] = settings.badUrlImage;
      }
    });

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
        <div>
          <DogRow key={0} urls={this.state.dogUrls} rowNumber={0} dogsInRow={4} />
          <DogRow key={1} urls={this.state.dogUrls} rowNumber={1} dogsInRow={4} />
          <Row>
            <Col>
              <Button className="btn btn-info btn-lg btn-block" onClick={this.refresh}>Refresh</Button>
            </Col>
          </Row>
        </div>
      ) 
  }
}

export default App;
