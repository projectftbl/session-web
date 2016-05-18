import memoize from 'lru-memoize';
import { createValidator, required } from '@ftbl/validation';

export default memoize(10)(createValidator({
  email: [ required() ]
}));
