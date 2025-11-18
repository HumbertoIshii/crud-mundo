// public/js/admin/countries.js
document.addEventListener("DOMContentLoaded", () => {
  const btnLookup = document.getElementById("btnLookupCountry");
  const nameInput = document.getElementById("addCountryName");
  const popInput = document.getElementById("addPopulation");
  const langInput = document.getElementById("addLanguage");
  const curInput = document.getElementById("addCurrency");
  const siglaInput = document.getElementById("addSigla");
  const bandeiraInput = document.getElementById("addBandeira");
  const flagImg = document.getElementById("addFlagImg");

  if (!btnLookup || !nameInput) return;

  btnLookup.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Digite o nome do país para buscar.");
      return;
    }

    btnLookup.disabled = true;
    btnLookup.innerText = "Buscando...";

    try {
      const res = await fetch(`/geo/countries/lookup?name=${encodeURIComponent(name)}`);
      if (!res.ok) {
        if (res.status === 404) {
          alert("País não encontrado na REST Countries.");
        } else {
          alert("Erro ao buscar país.");
        }
        return;
      }

      const data = await res.json();
      if (!data.found) {
        alert("País não encontrado.");
        return;
      }

      popInput.value = data.population || "";
      langInput.value = (data.languages && data.languages.join(", ")) || "";
      curInput.value = (data.currencies && data.currencies.join(", ")) || "";
      siglaInput.value = data.iso2 || "";
      bandeiraInput.value = data.flagUrl || "";

      if (data.flagUrl) {
        flagImg.src = data.flagUrl;
        flagImg.style.display = "";
      } else {
        flagImg.style.display = "none";
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar país.");
    } finally {
      btnLookup.disabled = false;
      btnLookup.innerText = "Buscar";
    }
  });
});