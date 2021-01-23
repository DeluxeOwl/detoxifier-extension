// type can be low,medium,high,insane
function createAlertElement(type, text) {
  let toxicityInformationDIV = document.createElement("div");

  let colorMap = new Map();
  colorMap.set("low", "green");
  colorMap.set("medium", "yellow");
  colorMap.set("high", "red");

  let divClasses = ["p-4", "border-l-4"];

  if (colorMap.has(type)) {
    divClasses.push(
      `bg-${colorMap.get(type)}-100`,
      `border-${colorMap.get(type)}-400`
    );
    toxicityInformationDIV.innerHTML = `
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-${colorMap.get(
          type
        )}-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm text-${colorMap.get(type)}-700">
          ${text}
        </p>
      </div>
    </div>
  `;
  }

  toxicityInformationDIV.classList.add(...divClasses);

  return toxicityInformationDIV;
}

function setToxicityInformation(element) {
  element.querySelectorAll('[role="article"]').forEach((element) => {
    let toxicityInformationDIV = createAlertElement("high", "some text here");

    element.parentElement.prepend(toxicityInformationDIV);
    element.parentElement.prepend(createAlertElement("low", "some here"));
    element.parentElement.prepend(
      createAlertElement("medium", "some more here")
    );
  });
}

// We set the toxicity information for the whole document
setToxicityInformation(document);

// We listen for newly added articles while scrolling twitter
document
  .querySelector('[aria-label="Timeline: Your Home Timeline"]')
  .addEventListener("DOMNodeInserted", function (event) {
    setToxicityInformation(event.target);
  });
