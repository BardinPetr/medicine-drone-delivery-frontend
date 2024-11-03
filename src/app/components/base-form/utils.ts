export function flattenData(obj: any, result: any = {}): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
      if (getType(obj[key]) === '[object Object]') {
        flattenData(obj[key], result);
      }
    }
  }
  return result;
}

function getType(x: any): string {
  return Object.prototype.toString.call(x)
}
