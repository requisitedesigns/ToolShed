import React from 'react';


function ClipboardCopy (textCopy) {
  return (  
      navigator.clipboard.writeText(textCopy)
  );
}

export default ClipboardCopy;