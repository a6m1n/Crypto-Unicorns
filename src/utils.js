const popupId = "crypto_unicorns_info";

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const createTable = (left, top) => {
  const table = document.createElement("div");
  table.id = popupId;

  chrome.runtime.sendMessage(
    { type: "render_unicorn_data" },
    function (response) {
      table.innerHTML = response.html;
    }
  );

  table.style.cssText = `
    left: ${left}px;
    top: ${top}px;
  `;

  return table;
};

const getAllUnicorns = () => {
  return document.querySelectorAll(
    '.collection--results div[role="grid"] > div div[width="60%"] a.AssetCardFooter--collection-name'
  );
};

const handleLeave = (event, element) => {
  element.remove();
};

const calcLeft = (left, width) => {
  const defaultWith = 400;

  if (screen.width > defaultWith + left) {
    return left + width;
  }

  return left - defaultWith;
};

const handleHover = (event) => {
  const elementForCalcLeft = event.path[0];

  const { left, width } = elementForCalcLeft.getBoundingClientRect();

  const leftWithScreenBorder = calcLeft(left, width);

  const table = createTable(leftWithScreenBorder, event.pageY);
  const main = document.querySelector("main#main");
  main.appendChild(table);

  elementForCalcLeft.onmouseleave = (event) => handleLeave(event, table);
};

function addHoverEffect() {
  // fired when a mutation occurs

  const unicornList = getAllUnicorns();
  unicornList.forEach((unicorn) => {
    unicorn.onmouseover = handleHover;
  });
}

const onDOMMutation = (mutations, observer) => addHoverEffect();
