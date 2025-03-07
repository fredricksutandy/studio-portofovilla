// Accordion.tsx
import React, { useState } from 'react';

const AccordionRow: React.FC<AccordionRowProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className='py-6 border-b border-secondary'>
      <div className="flex items-start cursor-pointer" onClick={toggleOpen}>
        <div className="relative w-6 h-6 lg:w-8 lg:h-8 mr-3 flex items-center justify-center">
          <div className="w-[2px] h-4 bg-secondary rotate-90" />
          <div className={`absolute w-[2px] h-4 bg-secondary transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
        </div>
        <span className="text-base lg:text-lg text-black font-medium">{question}</span>
      </div>
      <div className={`overflow-hidden transition-all duration-1000 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <p className="pl-0 lg:pl-10 mt-4 text-base lg:text-lg text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionRow;
