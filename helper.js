export const handleCode = async func => {
  try {
    await func();
  } catch (e) {
    console.log('whoops: ', (e + '').substring(0, 100));
  }
};
