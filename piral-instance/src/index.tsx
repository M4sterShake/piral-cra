import React, { ComponentState } from 'react';
import ReactDOM from 'react-dom';
import { Piral, SetRoute, createInstance, ErrorComponentsState} from 'piral-core';
import { createDashboardApi, Dashboard } from 'piral-dashboard';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const feedUrl = 'https://feed.piral.io/api/v1/pilet/simple';

export const errors: Partial<ErrorComponentsState> = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back
      </p>
    </div>
  ),
};

export const layout: Partial<ComponentState> = {
  DashboardContainer: ({ children }: any) => (
    <App>
      Dashboard Container
      {children}
    </App>
  )
};

const piralInstance = createInstance({
  state: {
    components: layout,
    errorComponents: errors,
  },
  extendApi: [
    createDashboardApi(),
  ],
  requestPilets() {
    return fetch(feedUrl)
      .then(res => res.json())
      .then(res => res.items);
  }
});

ReactDOM.render(
  <Piral instance={piralInstance}>
    <SetRoute path="/" component={Dashboard} />
  </Piral>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
