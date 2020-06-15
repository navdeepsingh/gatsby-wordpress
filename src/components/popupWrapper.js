import React from 'react';

import PopupWidget from './popup';

const PopupWidgetWrapper = ({ children }) => (
  <>
    {children}
    <PopupWidget />
  </>
);

export default PopupWidgetWrapper;