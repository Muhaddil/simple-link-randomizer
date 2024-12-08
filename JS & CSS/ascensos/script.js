document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLightMode = body.classList.contains("light-mode");
    themeToggle.textContent = isLightMode ? "🌞" : "🌙";

    document.documentElement.style.setProperty(
      "--background-dark",
      isLightMode ? "#ffffff" : "#121212"
    );
    document.documentElement.style.setProperty(
      "--background-light",
      isLightMode ? "#f0f0f0" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--text-dark",
      isLightMode ? "#333333" : "#b59595"
    );
    document.documentElement.style.setProperty(
      "--text-light",
      isLightMode ? "#000000" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--hover-background",
      isLightMode ? "#e0e0e0" : "#2a2a2a"
    );
    document.documentElement.style.setProperty(
      "--hover-text",
      isLightMode ? "#000000" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--hover-border",
      isLightMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 204, 0, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--accent",
      isLightMode ? "#ff0000" : "#ffcc00"
    );

    updateDynamicBackground();
  });

  updateDynamicBackground();

  function updateDynamicBackground() {
    const background = document.querySelector(".background");
    if (background) {
      const isLightMode = body.classList.contains("light-mode");
      const colorStart = isLightMode ? "#121212" : "#1e1e1e";
      const colorEnd = isLightMode ? "#f0f0f0" : "#121212";

      background.style.background = `radial-gradient(circle at 50% 50%, ${colorStart}, ${colorEnd})`;
    }
  }

  document.addEventListener("mousemove", function (e) {
    const background = document.querySelector(".background");
    if (background) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      background.style.transition = "background 0.3s ease-in-out";

      const isLightMode = body.classList.contains("light-mode");
      const colorStart = isLightMode ? "#121212" : "#1e1e1e";
      const colorEnd = isLightMode ? "#f0f0f0" : "#121212";

      background.style.background = `radial-gradient(circle at ${x * 100}% ${
        y * 100
      }%, ${colorStart}, ${colorEnd})`;
    }
  });

  loadFavorites();

  const favorites = document.querySelectorAll(".favorite-button");
  favorites.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      button.textContent = button.classList.contains("active") ? "❤️" : "⭐";
      const ascensoId = button.closest(".ascenso").dataset.id;
      updateFavoritesInLocalStorage(
        ascensoId,
        button.classList.contains("active")
      );
    });
  });

  const searchInput = document.querySelector(".search-container input");
  const categories = document.querySelectorAll(".category");

  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    categories.forEach((category) => {
      const categoryName = category
        .querySelector("h2")
        .textContent.toLowerCase();
      const ascensos = category.querySelectorAll(".ascenso");
      let categoryMatch = false;

      ascensos.forEach((ascenso) => {
        const name = ascenso.querySelector(".nombre").textContent.toLowerCase();
        const date = ascenso.querySelector("p").textContent.toLowerCase();
        if (
          name.includes(filter) ||
          date.includes(filter) ||
          categoryName.includes(filter)
        ) {
          ascenso.style.display = "flex";
          categoryMatch = true;
        } else {
          ascenso.style.display = "none";
        }
      });

      if (categoryMatch) {
        category.style.display = "block";
      } else {
        category.style.display = "none";
      }
    });
  });

  const filterFavoritesBtn = document.getElementById("filterFavorites");
  filterFavoritesBtn.addEventListener("click", () => {
    const allAscensos = document.querySelectorAll(".ascenso");
    const categories = document.querySelectorAll(".category");

    allAscensos.forEach((ascenso) => {
      const ascensoId = ascenso.dataset.id;
      const isFavorite = getFavoriteStatus(ascensoId);
      ascenso.style.display = isFavorite ? "flex" : "none";
    });

    categories.forEach((category) => {
      const ascensos = category.querySelectorAll(".ascenso");
      let categoryHasVisibleAscensos = false;

      ascensos.forEach((ascenso) => {
        if (ascenso.style.display !== "none") {
          categoryHasVisibleAscensos = true;
        }
      });

      category.style.display = categoryHasVisibleAscensos ? "block" : "none";
    });
  });

  const showAllButton = document.getElementById("showAllButton");
  showAllButton.addEventListener("click", () => {
    const allAscensos = document.querySelectorAll(".ascenso");
    const allCategories = document.querySelectorAll(".category");
    allAscensos.forEach((ascenso) => {
      ascenso.style.display = "flex";
    });
    allCategories.forEach((category) => {
      category.style.display = "block";
    });
  });

  categories.forEach((category) => {
    const header = category.querySelector("h2");
    header.addEventListener("click", function () {
      category.classList.toggle("open");
    });
  });
});

function updateFavoritesInLocalStorage(ascensoId, isFavorite) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (isFavorite) {
    favorites.push(ascensoId);
  } else {
    favorites = favorites.filter((id) => id !== ascensoId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavoriteStatus(ascensoId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(ascensoId);
}

function loadFavorites() {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => {
    const ascensoId = button.closest(".ascenso").dataset.id;
    if (getFavoriteStatus(ascensoId)) {
      button.classList.add("active");
      button.textContent = "❤️";
    }
  });
}
