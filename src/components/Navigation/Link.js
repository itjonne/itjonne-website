import React from 'react';

export const Link = ({name, link, icon}) => {
  const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  return(
    <div className="icon-link">
      {icon}  
      <p onClick={() => openInNewTab(link)}>{name}</p>
    </div>
  )
}