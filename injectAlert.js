// type can be low,medium,high,insane
function createAlertElement(type, text) {
  let toxicityInformationDIV = document.createElement("div");
  toxicityInformationDIV.setAttribute("id", "toxicity-alert");

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

function setToxicityInformationHome(element) {
  // These are the classnames that differentiate the comments between the dark themes
  const differentClassnames = ["r-1fmj7o5", "r-jwli3a", "r-18jsvk2"];
  // This one is consistent between themes
  const baseClasename =
    "css-901oao r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0";
  element.querySelectorAll('[role="article"]').forEach((element) => {
    let comments = [];
    for (let diffClass of differentClassnames) {
      comments = element.getElementsByClassName(
        baseClasename + " " + diffClass
      );
      if (comments.length !== 0) {
        break;
      }
    }

    Array.prototype.forEach.call(comments, function (comment) {
      let commentText = comment.innerText || comment.textContent;
      // console.log(commentText);

      let body = { text: [commentText] };
      fetch("https://2701b40c710d.ngrok.io/model/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((body) => {
          if (
            element.parentElement.children[0].getAttribute("id") ===
            "toxicity-alert"
          ) {
            return;
          }
          element.parentElement.prepend(
            createAlertElement("low", "Change this prediction, check console")
          );
          console.log(body.results[0].predictions);
        })
        .catch((e) =>
          //Change this to say error
          console.log(e)
        );
    });
  });
}

function setToxicityInformationProfile(element) {
  const badWords = ["bad", "difficult"];
  element.querySelectorAll('[role="article"]').forEach((element) => {
    let comments = element.getElementsByClassName(
      "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"
    )[4];
    Array.prototype.forEach.call(comments, function (comment) {
      let commentText = comment.innerText || comment.textContent;
      //console.log(commentText);

      if (
        element.parentElement.children[0].getAttribute("id") ===
        "toxicity-alert"
      ) {
        return;
      }

      if (badWords.some((badWord) => commentText.includes(badWord))) {
        element.parentElement.prepend(
          createAlertElement(
            "high",
            "This tweet contains a high level of toxicity"
          )
        );
        comment.setAttribute("style", "display: none;");

        let button = document.createElement("button");
        button.innerHTML = "Show comment";
        button.addEventListener("click", function () {
          comment.removeAttribute("style");
        });

        element.parentElement.prepend(button);
      } else {
        element.parentElement.prepend(
          createAlertElement("low", "This tweet is low on toxicity")
        );
      }
    });
  });
}

// We set the toxicity information for the whole document
setToxicityInformationHome(document);
setToxicityInformationProfile(document);

if (document.querySelector('[aria-labelledby="accessible-list-0"]')) {
  document
    .querySelector('[aria-labelledby="accessible-list-0"]')
    .addEventListener("DOMNodeInserted", function (event) {
      setToxicityInformationHome(event.target);
      setToxicityInformationProfile(event.target);
    });
}

if (document.querySelector('[aria-labelledby="accessible-list-2"]')) {
  document
    .querySelector('[aria-labelledby="accessible-list-2"]')
    .addEventListener("DOMNodeInserted", function (event) {
      setToxicityInformationHome(event.target);
      setToxicityInformationProfile(event.target);
    });
}
