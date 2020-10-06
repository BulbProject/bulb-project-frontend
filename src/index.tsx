import React from 'react';
import { render } from 'react-dom';

import { App } from './core/app';
import './core/theme/fonts.css';
import './i18n';

// Polyfills for old browsers
import 'core-js';

render(<App />, document.querySelector('#root'));
