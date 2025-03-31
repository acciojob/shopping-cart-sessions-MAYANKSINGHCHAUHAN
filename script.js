document.addEventListener("DOMContentLoaded", function () {
    const fontSizeInput = document.getElementById("fontsize");
    const fontColorInput = document.getElementById("fontcolor");

    function setFontPreferences() {
        const fontSize = getCookie("fontsize") || "16px";
        const fontColor = getCookie("fontcolor") || "#000000";

        document.documentElement.style.setProperty("--fontsize", fontSize);
        document.documentElement.style.setProperty("--fontcolor", fontColor);

        fontSizeInput.value = parseInt(fontSize, 10);
        fontColorInput.value = fontColor;
    }

    function savePreferences(event) {
        event.preventDefault();

        const fontSize = fontSizeInput.value + "px";
        const fontColor = fontColorInput.value;

        document.cookie = `fontsize=${encodeURIComponent(fontSize)}; path=/; max-age=31536000`;
        document.cookie = `fontcolor=${encodeURIComponent(fontColor)}; path=/; max-age=31536000`;

        setFontPreferences();
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    }

    document.getElementById("fontForm").addEventListener("submit", savePreferences);

    setFontPreferences();
});
