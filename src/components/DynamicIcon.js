// src/components/DynamicIcon.js
import React, { useState, useEffect } from 'react';

const DynamicIcon = ({ iconName }) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        // Dynamically import the icon component based on the iconName
        const { default: Icon } = await import(`react-icons/pi/${iconName}`);
        setIconComponent(<Icon />);
      } catch (error) {
        console.error(`Error importing icon: ${error}`);
      }
    };

    importIcon();
  }, [iconName]);

  return <div>{IconComponent}</div>;
};

export default DynamicIcon;
