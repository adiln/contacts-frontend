import { helper } from '@ember/component/helper';

export function trim(string) {
  return string[0].replace(/\s/g,'');
};

export default helper(trim);
