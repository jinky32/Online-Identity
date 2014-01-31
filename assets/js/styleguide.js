console.log('test')
if(parent && parent.cl_nav.iframeLoaded) {
	console.log('ready');
  parent.cl_nav.iframeLoaded($('#cl-content').html());
}