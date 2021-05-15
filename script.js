const url = `https://dog.ceo/api/breeds/image/random`;
const send = document.getElementById("send");

const getSrc = async (src) => {
  return new Promise((res, rej) => {
    let html = "";
    for (let i = 0; i < 10; i++) {
      const xhr = new XMLHttpRequest();
      xhr.open("get", `${url}`);
      xhr.onload = () => {
        let html = "";
        const grid = document.getElementById("grid");
        let result = JSON.parse(xhr.response);
        if (xhr.status === 200) {
          res(result);
          let image = result.message;
          html = `<div class="picture">
                  <img src=${image} alt="" />;
                  </div>`;
          grid.innerHTML += html;
        } else {
          rej(false);
        }
      };
      xhr.send();
    }
  });
};

const runLoader = (load) => {
  const loader = document.getElementById("loader");
  const mask = document.querySelector(".mask");
  window.addEventListener("load", () => {
    mask.classList.add("hide");
    setTimeout(() => {
      mask.remove();
    }, 1000);
  });
  let html = `<div class="spinner">
              <div class="head"></div>
              </div>`;
  loader.innerHTML = html;
};
runLoader();
getSrc().catch(console.log);

send.addEventListener("click", () => {
  getSrc().catch(console.log);
  document.location.reload();
});
