import type { IncomingMessage, ServerResponse } from 'http';
import { handleContactRequest } from '../server/contactHandler';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleContactRequest(req, res);
}
