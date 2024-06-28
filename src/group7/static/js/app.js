document.addEventListener("DOMContentLoaded", function () {
    const colors = {
        navbar: "#EBD9FC",
        background: "#F2EBFB",
        textPrimary: "#FBFAFF",
        textSecondary: "#6b5598",
        buttonText: "#6b5598",
        buttonHover: "#6b5598",
        mainCard: "#D4BBFC",
        cards: "#F2EBFB",
        button: "#EBD9FC",
        green: "#70e000",
        yellow: "#f9a620",
        gray: "#cfdbd5",
        wordleDefault: "#9985b445",
        correct: "#70e000",
        incorrect: "#D4BBFC",
    };

    const navbar = document.getElementById("navbar");
    navbar.innerHTML = "Learning through gaming";

    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = `
        <div class="box">
            <div class="grid-container">
                <div class="grid-item">
                    <div class="typography">Choose a game to play</div>
                </div>
                <div class="grid-item">
                    <div class="image-button" onclick="showWordle()">
                        <span class="image-src"></span>
                        <span class="image-backdrop"></span>
                        <span class="image">
                            <span class="typography">Wordle</span>
                        </span>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-button" onclick="showHangman()>
                        <span class="image-src" ></span>
                        <span class="image-backdrop"></span>
                        <span class="image">
                            <span class="typography">Hangman</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const gameId = null;

    window.showWordle = function () {
        document.getElementById("home").style.display = "none";
        document.getElementById("wordle").style.display = "block";

        renderWordleTable();
        renderWordleKeyboard();

        fetch("/group7/nwl")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                gameId = data;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const wordleDiv = document.getElementById("wordle");
    wordleDiv.innerHTML = `
        <div class="wordle">
            <div class="wordle-title">Wordle</div>
            <div id="wordle-table" class="wordle-table"></div>
            <div id="wordle-keyboard" class="wordle-keyboard"></div>
        </div>
    `;

    const WORD_LENGTH = 5;
    const MAX_ATTEMPTS = 6;


    const initialKeyboard = "QWERTYUIOPASDFGHJKLZXCVBNM"
        .split("")
        .reduce((acc, letter) => {
            acc[letter] = colors.wordleDefault;
            return acc;
        }, {});

    let guesses = Array(MAX_ATTEMPTS).fill("");
    let currentGuess = "";
    let attempt = 0;
    let keyboard = { ...initialKeyboard };
    let resultMap = Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(""));

    function handleKeyPress(letter) {
        if (currentGuess.length < WORD_LENGTH) {
            currentGuess += letter;
            guesses[attempt] = currentGuess;
            renderWordleTable();
        }
    }

    function handleBackspace() {
        currentGuess = currentGuess.slice(0, -1);
        guesses[attempt] = currentGuess;
        renderWordleTable();
    }

    function handleSubmit() {
        if (currentGuess.length === WORD_LENGTH) {
            const data = {
                id: gameId,
                guess: currentGuess,
            };
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            fetch("/group7/wlplay", fetchOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json(); // Assuming the API returns JSON
                })
                .then((data) => {
                    // Handle API response if needed
                    console.log("API response:", data);
                })
                .catch((error) => {
                    console.error("Error sending data to API:", error);
                });
        }

        const result = ["correct", "present", "notIn", "notIn", "notIn"];
        resultMap[attempt] = result;

        result.forEach((status, index) => {
            const letter = currentGuess[index];
            if (status === "correct") {
                keyboard[letter] = colors.green;
            } else if (status === "present") {
                keyboard[letter] = colors.yellow;
            } else if (status === "notIn") {
                keyboard[letter] = colors.gray;
            }
        });

        attempt++;
        currentGuess = "";
        renderWordleTable();
        renderWordleKeyboard();
    }

    function renderWordleTable() {
        const wordleTable = document.getElementById("wordle-table");
        wordleTable.innerHTML = guesses
            .map(
                (guess, index) => `
            <div class="wordle-row">
                ${Array.from({ length: WORD_LENGTH })
                    .map(
                        (_, i) => `
                    <div class="wordle-cell" style="background-color: ${getColor(
                        index,
                        i
                    )}">
                        ${guess[i] ? guess[i] : ""}
                    </div>
                `
                    )
                    .join("")}
            </div>
        `
            )
            .join("");
    }

    function getColor(row, col) {
        if (row < attempt) {
            const status = resultMap[row][col];
            if (status === "correct") return colors.green;
            if (status === "present") return colors.yellow;
            return colors.gray;
        }
        return colors.wordleDefault;
    }

    function renderWordleKeyboard() {
        const wordleKeyboard = document.getElementById("wordle-keyboard");
        wordleKeyboard.innerHTML = "";
        const keyboardLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

        keyboardLayout.forEach((row) => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";
            row.split("").forEach((key) => {
                const button = document.createElement("button");
                button.className = "keyboard-button";
                button.textContent = key;
                button.style.backgroundColor =
                    keyboard[key] || colors.wordleDefault;
                button.onclick = () => handleKeyPress(key);
                rowDiv.appendChild(button);
            });
            wordleKeyboard.appendChild(rowDiv);
        });

        const controlsDiv = document.createElement("div");
        controlsDiv.className = "control-buttons";

        const backspaceButton = document.createElement("button");
        backspaceButton.className = "control-button";
        backspaceButton.textContent = "Backspace";
        backspaceButton.onclick = handleBackspace;
        controlsDiv.appendChild(backspaceButton);

        const submitButton = document.createElement("button");
        submitButton.className = "control-button";
        submitButton.textContent = "Submit";
        submitButton.onclick = handleSubmit;
        controlsDiv.appendChild(submitButton);

        wordleKeyboard.appendChild(controlsDiv);
    }

   
    


    // window.showWordle = function () {
    //     document.getElementById("home").style.display = "none";
    //     document.getElementById("wordle").style.display = "block";

    //     renderWordleTable();
    //     renderWordleKeyboard();

    //     fetch("/group7/nwl")
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             gameId = data;
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // };




});
