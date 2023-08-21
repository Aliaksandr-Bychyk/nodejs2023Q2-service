const correctDisplay = (value: number) => value.toString().padStart(2, '0');
const getCurrentTime = (timestamp?: string) => {
  const date = new Date(timestamp);
  return `${correctDisplay(date.getHours())}:${correctDisplay(
    date.getMinutes(),
  )}:${correctDisplay(date.getSeconds())}`;
};

export default getCurrentTime;
