import linkPreviewGenerator from 'link-preview-generator';

export const someFunctionality = async () => {
  console.log('Assalamo Alaikum');
  const previewData = await linkPreviewGenerator('http://localhost:3000/');
  console.log(previewData);
};
