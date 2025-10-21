import React from 'react';
import { Input, TextArea } from './FormControls';

interface LeadFormProps {
  name: string;
  setName: (value: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({
  name,
  setName,
  whatsappNumber,
  setWhatsappNumber,
  occupation,
  setOccupation,
  notes,
  setNotes,
}) => {
  const handleSendWhatsApp = () => {
    if (!whatsappNumber) {
      alert('Please enter a WhatsApp number.');
      return;
    }
    const message = `Name: ${name}\nOccupation: ${occupation}\nNotes: ${notes}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-white/20 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Lead Information</h2>
      <div className="space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
        <Input label="WhatsApp Number" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="e.g., 919876543210" />
        <Input label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g., Software Engineer" />
        <TextArea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes about the lead..." />
        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Send on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default LeadForm;
