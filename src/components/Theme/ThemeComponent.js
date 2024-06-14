import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

const ThemeComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme}>Cambiar tema</button>
    </div>
  );
};

export default ThemeComponent;
