import React, { useState } from 'react';

function ToggleButton({ initialStatus, onToggle }) {
  const [isPublished, setIsPublished] = useState(initialStatus);

  const handleToggle = () => {
    setIsPublished(!isPublished); // Toggle state
    onToggle(!isPublished); // Pass the new status to parent component
  };

  return (
    <button onClick={handleToggle}>
      {isPublished ? 'Unpublish' : 'Publish'}
    </button>
  );
}

export default ToggleButton;
