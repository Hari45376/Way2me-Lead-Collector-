export enum LeadStatus {
  OK = 'OK',
  NotOK = 'Not OK',
  Afterwards = 'Afterwards',
}

export interface Lead {
  id: number;
  name: string;
  whatsappNumber: string;
  occupation: string;
  notes: string;
  status: LeadStatus;
  afterwardsNotes: string;
  timestamp: Date;
}
