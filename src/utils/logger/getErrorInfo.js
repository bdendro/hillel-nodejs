function getErrorInfo(err) {
  if (err instanceof Error && err.stack) {
    const root = 'hillel-nodejs';

    const stackLines = err.stack.split('\n');
    const line = stackLines[1] || '';
    const index = line.indexOf(root);
    return index !== -1 ? line.slice(index) : '';
  } else {
    return '';
  }
}

export default getErrorInfo;
