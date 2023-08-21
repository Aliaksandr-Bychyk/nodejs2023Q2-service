const getCurrentTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export default getCurrentTime;
