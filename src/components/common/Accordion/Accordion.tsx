import React, { useState } from 'react';
import './Accordion.css';

interface AccordionItemProps {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: AccordionItemProps[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="accordion-item">
            <button
                className={`accordion-header ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className="question-text">{question}</span>
                <span className={`arrow ${isOpen ? 'rotate' : ''}`}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 3L6.50004 9L12 3" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </span>
            </button>

            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="answer-text">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="accordion-container">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                />
            ))}
        </div>
    );
};
