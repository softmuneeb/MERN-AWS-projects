export const getWithoutMintTranfers = (events) => {
  return events.filter((event) => event.returnValues.from !== '0x0000000000000000000000000000000000000000');
};
