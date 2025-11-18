document.addEventListener("DOMContentLoaded", function () {

  function initAutocomplete(input, hiddenInput) {
    const list = document.createElement("div");
    list.classList.add("autocomplete-list", "border", "shadow-sm", "position-absolute", "bg-white", "rounded");
    list.style.zIndex = "1000";
    input.parentNode.appendChild(list);

    let timeout;
    input.addEventListener("input", function () {
      const query = input.value.trim();
      if (timeout) clearTimeout(timeout);
      if (!query) {
        list.innerHTML = "";
        hiddenInput.value = "";
        return;
      }

      timeout = setTimeout(function () {
        fetch("/geo/cities/autocomplete-country?name=" + encodeURIComponent(query))
          .then(res => res.json())
          .then(countries => {
            list.innerHTML = "";
            countries.forEach(c => {
              const item = document.createElement("div");
              item.textContent = c.nome;
              item.classList.add("p-2");
              item.style.cursor = "pointer";
              item.addEventListener("click", function () {
                input.value = c.nome;
                hiddenInput.value = c.id;
                list.innerHTML = "";
              });
              list.appendChild(item);
            });
          }).catch(err => console.error(err));
      }, 300);
    });

    document.addEventListener("click", e => {
      if (e.target !== input) list.innerHTML = "";
    });
  }

  // Autocomplete para criação
  const addInput = document.getElementById("addCityCountryInput");
  const addHidden = document.getElementById("addCityCountryId");
  if (addInput && addHidden) initAutocomplete(addInput, addHidden);

  // Autocomplete para edição
  document.querySelectorAll(".editCityCountryInput").forEach(input => {
    const hiddenId = input.dataset.hiddenId;
    const hiddenInput = document.getElementById(hiddenId);
    if (hiddenInput) initAutocomplete(input, hiddenInput);
  });

});