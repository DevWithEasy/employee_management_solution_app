const convertToArray = (obj) => {
  let result = [];
  for (let key in obj) {
    result.push([key, obj[key] || 0]);
  }
  return result;
}

export default convertToArray