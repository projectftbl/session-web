import memoize from 'lru-memoize';
import { createValidator, required } from '@recipher/validation';

export default memoize(10)(createValidator({
  email: [ required() ]
, password: [ required() ]
}));
