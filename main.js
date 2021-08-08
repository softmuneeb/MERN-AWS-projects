const init = async () => {
  console.log(new Date() === new Date(Date.now()-3));
  console.log("new Date(): ", new Date());
  console.log("new Date(Date.now()): ", new Date(Date.now()));
};
init();
