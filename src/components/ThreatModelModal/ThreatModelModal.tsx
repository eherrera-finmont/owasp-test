import React from 'react';

interface ThreatModelModalProps {
  onClose: () => void;
}

const ThreatModelModal: React.FC<ThreatModelModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Threat Model</h2>
        <p>
          Threat modeling is a systematic approach to identifying and mitigating security risks in software applications.
          It involves identifying potential threats, assessing their potential impact, and implementing countermeasures to mitigate them.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ThreatModelModal;
