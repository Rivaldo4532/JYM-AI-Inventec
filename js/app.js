
// ==========================================
// JYM AI - INVENTEC PSG
// Interface Demonstration Prototype
// No SQL Server / HPIMES connection
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // LOGIN - DEMONSTRATION MODE
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        const employeeId = document.getElementById("username");
        const error = document.getElementById("loginError");

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const clockNumber = employeeId
                ? employeeId.value.trim()
                : "";

            if (!clockNumber) {

                if (error) {
                    error.textContent = "Please enter your Employee ID.";
                }

                return;
            }

            // Save demonstration session
            sessionStorage.setItem("jymDemoUser", clockNumber);
            sessionStorage.setItem("jymDemoMode", "true");

            if (error) {
                error.textContent = "";
            }

            // Redirect to dashboard (GitHub Pages compatible)
            const basePath = window.location.pathname.substring(
                0,
                window.location.pathname.lastIndexOf("/") + 1
            );

            window.location.assign(basePath + "dashboard.html");

        });

    }


    // ==========================================
    // DASHBOARD - DATE
    // ==========================================

    const date = document.getElementById("todayDate");

    if (date) {

        date.textContent = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date());

    }


    // ==========================================
    // DASHBOARD - EMPLOYEE INFORMATION
    // ==========================================

    const currentEmployee = sessionStorage.getItem("jymDemoUser");

    const userInfo = document.querySelector(".user-info");

    if (currentEmployee && userInfo) {

        const name = userInfo.querySelector("b");
        const role = userInfo.querySelector("small");

        if (name) {
            name.textContent = "Employee " + currentEmployee;
        }

        if (role) {
            role.textContent = "Demo session";
        }

    }


    // ==========================================
    // JYM AI - ASSISTANT
    // ==========================================

    const chatForm = document.getElementById("chatForm");

    if (chatForm) {

        const input = document.getElementById("chatInput");
        const response = document.getElementById("chatResponse");

        // Demonstration responses
        const answer = (question) => {

            const q = question.toLowerCase();

            if (
                q.includes("delay") ||
                q.includes("line") ||
                q.includes("production issue")
            ) {

                return "I can help identify production delays by line, station, or area. However, live production records are not available because SQL Server and HPIMES are not connected.";

            }

            if (
                q.includes("packaging") ||
                q.includes("pending") ||
                q.includes("package")
            ) {

                return "I can help review pending packaging activities. Actual quantities cannot be verified until an authorized production database is connected.";

            }

            if (
                q.includes("shift") ||
                q.includes("production") ||
                q.includes("output")
            ) {

                return "I can help analyze production by shift, line, or station. This prototype currently has no access to live SQL Server or HPIMES records.";

            }

            if (
                q.includes("quality") ||
                q.includes("defect") ||
                q.includes("rejection")
            ) {

                return "I can help analyze quality indicators, defects, and rejection rates. Access to authorized production records is required to provide actual results.";

            }

            if (
                q.includes("hello") ||
                q.includes("hi") ||
                q.includes("good morning") ||
                q.includes("good afternoon")
            ) {

                return "Hello! I'm JYM AI, your production intelligence assistant. How can I help you today?";

            }

            if (
                q.includes("database") ||
                q.includes("sql server") ||
                q.includes("hpimes") ||
                q.includes("connection")
            ) {

                return "The current prototype is not connected to SQL Server, HPIMES, or a backend API. Database integration will be configured in a future development stage.";

            }

            return "I'm here to help you explore production topics, shifts, lines, quality, and packaging. Please note that this prototype is not connected to a live AI service or production database.";

        };


        // ==========================================
        // CHAT MESSAGE CREATION
        // ==========================================

        const addMessage = (text, type) => {

            if (!response) return;

            const message = document.createElement("div");

            message.className =
                type === "user"
                    ? "user-message"
                    : "assistant-message";

            if (type === "assistant") {

                const avatar = document.createElement("div");
                avatar.className = "karen-avatar";
                avatar.textContent = "J";

                const content = document.createElement("div");
                content.className = "assistant-content";

                const heading = document.createElement("b");
                heading.textContent = "JYM AI";

                const small = document.createElement("small");
                small.textContent = " · Just now";

                heading.appendChild(small);

                const paragraph = document.createElement("p");
                paragraph.textContent = text;

                content.appendChild(heading);
                content.appendChild(paragraph);

                message.appendChild(avatar);
                message.appendChild(content);

            } else {

                const paragraph = document.createElement("p");
                paragraph.textContent = text;

                message.appendChild(paragraph);

            }

            response.appendChild(message);

            response.scrollTop = response.scrollHeight;

        };


        // ==========================================
        // SEND MESSAGE
        // ==========================================

        const send = (question) => {

            const clean = question.trim();

            if (!clean) return;

            addMessage(clean, "user");

            if (input) {
                input.value = "";
            }

            setTimeout(() => {

                addMessage(answer(clean), "assistant");

            }, 400);

        };


        // Chat form
        chatForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (input) {
                send(input.value);
            }

        });


        // Suggested questions
        document.querySelectorAll("[data-question]").forEach(button => {

            button.addEventListener("click", () => {

                send(button.dataset.question);

            });

        });


        // ==========================================
        // VOICE RECOGNITION
        // ==========================================

        const mic = document.getElementById("micButton");

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (mic) {

            if (!SpeechRecognition) {

                mic.title =
                    "Voice recognition is not supported in this browser";

                mic.addEventListener("click", () => {

                    addMessage(
                        "Your browser does not support voice recognition. Please type your question instead.",
                        "assistant"
                    );

                });

            } else {

                const recognition = new SpeechRecognition();

                recognition.lang = "en-US";
                recognition.interimResults = false;
                recognition.continuous = false;

                mic.addEventListener("click", () => {

                    try {

                        recognition.start();

                        mic.classList.add("listening");
                        mic.textContent = "●";

                    } catch (error) {

                        console.log(
                            "Voice recognition is already active."
                        );

                    }

                });


                recognition.onresult = (event) => {

                    if (input) {

                        input.value =
                            event.results[0][0].transcript;

                        input.focus();

                    }

                };


                recognition.onend = () => {

                    mic.classList.remove("listening");
                    mic.textContent = "♩";

                };


                recognition.onerror = () => {

                    mic.classList.remove("listening");
                    mic.textContent = "♩";

                    addMessage(
                        "Voice recognition failed. Please try again or type your question.",
                        "assistant"
                    );

                };

            }

        }

    }

});
