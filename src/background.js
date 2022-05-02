function renderHTML() {
  return `
      <div class="header">
        <div class="w-40">Breading points</div>
        <div class="w-60">Stats</div>
      </div>

      <div class="header-data">
        <div class="w-40">8/8</div>

        <div class="icon-wrapper w-60">
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Accuracy.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Attack.png"
            )}" alt="" />
            <div>124</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/AttackSpeed.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Defense.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Magic.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/MoveSpeed.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Speed.png"
            )}" alt="" />
            <div>123</div>
          </div>
          <div>
            <img class="icon-image" src="${chrome.runtime.getURL(
              "media/Vitality.png"
            )}" alt="" />
            <div>123</div>
          </div>
        </div>
      </div>

      <div>Genes</div>

      <div class="flex-table row">
        <div class="flex-row"></div>
        <div class="flex-row purple-color">Major</div>
        <div class="flex-row purple-color">Normal</div>
        <div class="flex-row purple-color">Minor</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Horn</div>
        <div class="flex-row">Yellow rune</div>
        <div class="flex-row green-color">Pink poleno</div>
        <div class="flex-row green-color">Pink poleno</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Mane</div>
        <div class="flex-row">Purple cowl...</div>
        <div class="flex-row">Purple cowl...</div>
        <div class="flex-row">Purple cowl...</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Tail</div>
        <div class="flex-row">Green Wizard</div>
        <div class="flex-row">Green Wizard</div>
        <div class="flex-row">Green Wizard</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Hooves</div>
        <div class="flex-row">Pink Spot</div>
        <div class="flex-row">Pink Spot</div>
        <div class="flex-row">Pink Spot</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Face</div>
        <div class="flex-row">Placid Mask</div>
        <div class="flex-row">Placid Mask</div>
        <div class="flex-row">Placid Mask</div>
      </div>

      <div class="flex-table row">
        <div class="flex-row purple-color">Body</div>
        <div class="flex-row">Pink Stripe</div>
        <div class="flex-row">Pink Stripe</div>
        <div class="flex-row">Pink Stripe</div>
      </div>
  `;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request", request);

  if (request.type === "render_unicorn_data") {
    sendResponse({ html: renderHTML() });
    return true;
  }
});
