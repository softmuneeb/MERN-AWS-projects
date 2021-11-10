import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

export const someFunctionality = async () => {
  console.log('Assalamo Alaikum');

  // pass the link directly
  getLinkPreview('https://serene-mclean-ce533e.netlify.app/').then(data =>
    console.debug(data),
  );
  // pass the link directly
  getLinkPreview('https://www.youtube.com/').then(data => console.debug(data));

  ////////////////////////// OR //////////////////////////

  // pass a pre-fetched response object
  // The passed response object should include, at minimum:
  // {
  //   data: '<!DOCTYPE...><html>...',     // response content
  //   headers: {
  //     ...
  //     // should include content-type
  //     content-type: "text/html; charset=ISO-8859-1",
  //     ...
  //   },
  //   url: 'https://domain.com/'          // resolved url
  // }
  // yourAjaxCall(url, response => {
  //   getPreviewFromContent(response).then(data => console.debug(data));
  // });
};
