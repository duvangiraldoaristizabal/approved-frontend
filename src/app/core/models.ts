export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type RequestType = 'DEPLOYMENT' | 'ACCESS' | 'TECHNICAL_CHANGE' | 'TOOL_ONBOARDING' | 'OTHER';
export interface HistoryEntry { id: string; status: RequestStatus; changedAt: string; changedBy: string; comment: string | null; }
export interface ApprovalRequest { id: string; title: string; description: string; requester: string; approver: string; type: RequestType; status: RequestStatus; createdAt: string; updatedAt: string; history: HistoryEntry[]; }
export type CreateRequest = Pick<ApprovalRequest, 'title' | 'description' | 'requester' | 'approver' | 'type'>;
