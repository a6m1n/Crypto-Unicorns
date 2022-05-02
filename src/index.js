const assetsTable = document.querySelector(
  '.collection--results div[role="grid"]'
);

// TODO: Create on hover

const createDOMchecker = () => {
  // checks when the dom changes

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  const handleDOMMutation = debounce(onDOMMutation);

  var observer = new MutationObserver(handleDOMMutation);

  observer.observe(assetsTable, {
    subtree: true,
    childList: true,
  });
};

function run() {
  createDOMchecker();
  addHoverEffect()
}

run();
