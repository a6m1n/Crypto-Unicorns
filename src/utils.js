const popupId = "crypto_unicorns_info";
const assetsTable = document.querySelector(
  '.collection--results div[role="grid"]'
);

const fetchUnicornData = (link, callBack) => {
  $.get(link, function (data) {
    var data = $(data);

    const item = data.filter((item) => {
      return data[item].id === "__next";
    })[0];

    const statsMapper = {};

    const statData = item.querySelectorAll(
      ".item--numeric-trait > .NumericTrait--label"
    );

    statData.forEach((DOMstat) => {
      const key = DOMstat.querySelector(".NumericTrait--type").textContent;
      const val = DOMstat.querySelector(
        ".NumericTrait--value"
      ).textContent.split(" ")[0];

      statsMapper[key.toLowerCase()] = val;
    });

    callBack(statsMapper);
  });
};

const getUnicornLink = (hoverEvent) => {
  return hoverEvent.fromElement.parentElement.parentElement.href;
};

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const createTable = (left, top, unicornDetailLink) => {
  const table = document.createElement("div");
  table.id = popupId;

  fetchUnicornData(unicornDetailLink, (data) => {
    chrome.runtime.sendMessage(
      { type: "render_unicorn_data", data },
      function (response) {
        table.innerHTML = response.html;
      }
    );
  });

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
  const elementForCalcLeft = event.srcElement;
  const link = getUnicornLink(event);

  const { left, width } = elementForCalcLeft.getBoundingClientRect();

  const leftWithScreenBorder = calcLeft(left, width);

  const table = createTable(leftWithScreenBorder, event.pageY, link);
  const main = document.querySelector("main#main");
  main.appendChild(table);

  elementForCalcLeft.onmouseleave = (event) => handleLeave(event, table);
};

const addHoverEffect = () => {
  // fired when a mutation occurs

  const unicornList = getAllUnicorns();
  unicornList.forEach((unicorn) => {
    unicorn.onmouseover = handleHover;
  });
};

const onDOMMutation = (mutations, observer) => addHoverEffect();

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
