import linkPreviewGenerator from 'link-preview-generator';

export const someFunctionality = async () => {
  console.log('Assalamo Alaikum');
  const previewData = await linkPreviewGenerator('https://serene-mclean-ce533e.netlify.app/');
  console.log(previewData);
};
