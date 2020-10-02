import React from 'react';
import { render } from 'react-dom';
import './i18n';

import { App } from './core/app';
import './core/theme/fonts.css';

// Polyfills for old browsers
import 'core-js';

render(<App />, document.querySelector('#root'));
