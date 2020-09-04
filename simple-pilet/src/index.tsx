import * as React from 'react';
import { PiletApi } from 'web-app';
import styled from 'styled-components';

const Tile = styled.div`
  padding: 10px;
  border: 1px solid black;
`;

export function setup(app: PiletApi) {
  app.registerTile(() => (<div>I AM A TILE!</div>));
}
