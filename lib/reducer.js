import authenticate from './ducks/authenticate';  
import session from './ducks/session';  
import forgotten from './ducks/forgotten';  

export default {
  authenticate
, session
, forgotten
};

export { signOnReducer } from './ducks/session';  
