import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {App} from "./components/app/app.component";

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App/>);
