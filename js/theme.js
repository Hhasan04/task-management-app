const THEME_STORAGE_KEY = "theme";

const updateThemeButtonText = (themeToggleButton) => {
  if (document.body.classList.contains("dark-mode")) {
    themeToggleButton.textContent = "Light Mode";
    return;
  }

  themeToggleButton.textContent = "Dark Mode";
};

export const initializeTheme = (themeToggleButton) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  updateThemeButtonText(themeToggleButton);
};

export const toggleTheme = (themeToggleButton) => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  }

  updateThemeButtonText(themeToggleButton);
};