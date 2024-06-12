import React from 'react';

const DivisionLine = () => {
  const lineStyle = {
    width: '100%',
    height: '0.5px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px', padding: '0px 2px' }}>
      <div style={{ ...lineStyle, backgroundColor: "#ddd" }} />
      <div style={{ ...lineStyle, backgroundColor: "#bbb" }} />
      <div style={{ ...lineStyle, backgroundColor: "#999" }} />
      <div style={{ ...lineStyle, backgroundColor: "#fff" }} />
    </div>
  );
}

export default DivisionLine;