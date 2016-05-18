import { UPDATE } from '../ducks/session';

export default {
  'user:update': user => ({ type: UPDATE, payload: { user }})
};