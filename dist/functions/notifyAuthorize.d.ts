import Guard from '../index.js';
import type { NotificationType } from '../types/notify.js';
export default function notifyAuthorize(this: Guard, app: string, notificationTypes: NotificationType[], signature: string): Promise<void>;
