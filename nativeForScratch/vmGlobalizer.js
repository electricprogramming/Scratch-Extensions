// This is not an extension, it just globalizes the Scratch VM so it can be accessed in the console.
(function(){
  try {
    window.vm = (node => {
      node = document.querySelector('div[class*=stage-header_stage-header-wrapper]');
      node = node[Object.keys(node).find(key => (key = String(key), key.startsWith('__reactInternal') || key.startsWith('__reactFiber')))].return.return.return;
      node = node.stateNode?.props?.vm || node.return?.updateQueue?.stores?.[0]?.value?.vm;
      if (!node) alert('Could not find VM.'); console.error('VM Globalizer could not find VM.')
      return node;
    })();
  } catch(e) {
    console.error('VM Globalizer could not find VM.',e)
    alert('Could not find VM. See console for more details.')
  }
})();
