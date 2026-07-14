import type { RequestStatus, RequestType } from './models';

const STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
};

const TYPE_LABELS: Record<RequestType, string> = {
  DEPLOYMENT: 'Despliegue',
  ACCESS: 'Acceso',
  TECHNICAL_CHANGE: 'Cambio técnico',
  TOOL_ONBOARDING: 'Incorporación de herramienta',
  OTHER: 'Otro',
};

export const statusLabel = (status: RequestStatus): string => STATUS_LABELS[status];
export const typeLabel = (type: RequestType): string => TYPE_LABELS[type];
