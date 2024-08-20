import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US'));
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US'));
    };

    // Update the time immediately
    updateTime();

    // Set up the interval to update every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
      <div className="logo">
        <span className="font-bold text-xl mx-2 md:mx-8">Todoist</span>
      </div>
      <ul className="flex gap-2 mx-2 md:gap-9 md:mx-9">
        <li>{time} {currentDate}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
