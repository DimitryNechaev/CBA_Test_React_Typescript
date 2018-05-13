import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import DogsReader from './DogsReader';
import Settings from "./settings";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('3rd party API is still valid', async () => {
  const settings = Settings;
  const dogsReader = new DogsReader(settings.dogsApiUrl, settings.supportedExtensions);
  
  expect.assertions(1);
  await expect(dogsReader.getUrl(10)).resolves.toContain("http");
});