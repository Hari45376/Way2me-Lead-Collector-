import React, { useState } from 'react';
import { Lead, LeadStatus } from './types';
import Header from './components/Header';
import LeadForm from './components/LeadForm';
import StatusPanel from './components/StatusPanel';

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [currentWhatsappNumber, setCurrentWhatsappNumber] = useState('');
  const [currentOccupation, setCurrentOccupation] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);


  const resetForm = () => {
    setCurrentName('');
    setCurrentWhatsappNumber('');
    setCurrentOccupation('');
    setCurrentNotes('');
  };

  const handleSaveLead = (status: LeadStatus, afterwardsNotes: string) => {
    if (!currentName || !currentWhatsappNumber) {
      alert('Please fill in at least the Name and WhatsApp Number.');
      return;
    }

    const newLead: Lead = {
      id: Date.now(),
      name: currentName,
      whatsappNumber: currentWhatsappNumber,
      occupation: currentOccupation,
      notes: currentNotes,
      status,
      afterwardsNotes,
      timestamp: new Date(),
    };

    setLeads(prevLeads => [...prevLeads, newLead]);
    resetForm();
  };
  
  const downloadPDF = () => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filteredLeads = leads.filter(lead => {
        const leadDate = new Date(lead.timestamp);
        return leadDate >= start && leadDate <= end;
    });

    if (filteredLeads.length === 0) {
      alert(`No leads found between ${startDate} and ${endDate}.`);
      return;
    }
    
    const reportTitle = `Leads Report from ${startDate} to ${endDate}`;
    const headers = ["ID", "Timestamp", "Name", "WhatsApp", "Occupation", "Notes", "Status", "Afterwards Notes"];
    
    const getStatusCellStyle = (status: LeadStatus) => {
      switch (status) {
        case LeadStatus.OK:
          return 'style="background-color: #d4edda; color: #155724; font-weight: bold;"';
        case LeadStatus.NotOK:
          return 'style="background-color: #f8d7da; color: #721c24; font-weight: bold;"';
        case LeadStatus.Afterwards:
          return 'style="background-color: #cce5ff; color: #004085; font-weight: bold;"';
        default:
          return '';
      }
    };

    const tableRows = filteredLeads.map(lead => `
      <tr>
        <td>${lead.id}</td>
        <td>${lead.timestamp.toLocaleString()}</td>
        <td>${lead.name}</td>
        <td>${lead.whatsappNumber}</td>
        <td>${lead.occupation}</td>
        <td>${lead.notes}</td>
        <td ${getStatusCellStyle(lead.status)}>${lead.status}</td>
        <td>${lead.afterwardsNotes}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #333; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; word-break: break-word; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${reportTitle}</h1>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      alert("Could not open print window. Please check your browser's popup settings.");
    }
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 via-green-900 to-gray-900 p-4 sm:p-8 font-sans text-gray-200 flex flex-col items-center">
      <Header 
        leadCount={leads.length} 
        onDownload={downloadPDF}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />
      <main className="w-full max-w-7xl mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <LeadForm
            name={currentName}
            setName={setCurrentName}
            whatsappNumber={currentWhatsappNumber}
            setWhatsappNumber={setCurrentWhatsappNumber}
            occupation={currentOccupation}
            setOccupation={setCurrentOccupation}
            notes={currentNotes}
            setNotes={setCurrentNotes}
          />
        </div>
        <div className="lg:col-span-2">
          <StatusPanel onSave={handleSaveLead} />
        </div>
      </main>
    </div>
  );
};

export default App;