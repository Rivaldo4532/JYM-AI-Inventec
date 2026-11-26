
// JYM AI - Interface Prototype
// Not connected to Inventec production systems.

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // LOGIN
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        const password = document.getElementById("password");
        const toggle = document.getElementById("togglePassword");
        const error = document.getElementById("loginError");

        if (toggle && password) {

            toggle.addEventListener("click", () => {

                const showing = password.type === "text";

                password.type = showing ? "password" : "text";
                toggle.textContent = showing ? "Show" : "Hide";

            });

        }

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const username = document.getElementById("username").value.trim();

            if (username === "admin" && password.value === "Karen2026!") {

                sessionStorage.setItem("jymDemoUser", "admin");

                window.location.href = "dashboard.html";

            } else {

                if (error) {
                    error.textContent = "Incorrect username or password. Please check your credentials.";
                }

            }

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
    // JYM AI - ASSISTANT
    // ==========================================

    const chatForm = document.getElementById("chatForm");

    if (chatForm) {

        const input = document.getElementById("chatInput");
        const response = document.getElementById("chatResponse");

        // Demonstration responses.
        const answer = (question) => {

            const q = question.toLowerCase();

            if (
                q.includes("delay") ||
                q.includes("line") ||
                q.includes("production issue")
            ) {
                return "I can help identify production delays by line, station, or area. Currently, the Dashboard data is illustrative and is not connected to Inventec production systems.";
            }

            if (
                q.includes("packaging") ||
                q.includes("pending") ||
                q.includes("package")
            ) {
                return "I can help review pending packaging activities. The quantity displayed on the Dashboard is for demonstration purposes and does not represent actual Inventec data.";
            }

            if (
                q.includes("shift") ||
                q.includes("production") ||
                q.includes("output")
            ) {
                return "I can help analyze production by shift, line, or station. This version is not connected to SQL Server or HPIMES.";
            }

            if (
                q.includes("quality") ||
                q.includes("defect") ||
                q.includes("rejection")
            ) {
                return "I can help analyze quality indicators, defects, and rejection rates. Access to authorized production data will be required to provide actual results.";
            }

            if (
                q.includes("hello") ||
                q.includes("hi") ||
                q.includes("good morning") ||
                q.includes("good afternoon")
            ) {
                return "Hello! I'm JYM AI, your production intelligence assistant. How can I help you today?";
            }

            return "I'm here to help. You can ask me about production, shifts, lines, quality, or pending packaging activities. Please note that this prototype is not connected to a live AI service or SQL Server.";
        };


        // Safely create chat messages.
        const addMessage = (text, type) => {

            const message = document.createElement("div");

            message.className =
                type === "user" ? "user-message" : "assistant-message";

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


        // Send a question.
        const send = (question) => {

            const clean = question.trim();

            if (!clean) return;

            addMessage(clean, "user");

            input.value = "";

            setTimeout(() => {

                addMessage(answer(clean), "assistant");

            }, 400);

        };


        // Chat form submission.
        chatForm.addEventListener("submit", (event) => {

            event.preventDefault();

            send(input.value);

        });


        // Suggested questions.
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

                mic.title = "Voice recognition is not supported in this browser";

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

                        console.log("Voice recognition is already active.");

                    }

                });

                recognition.onresult = (event) => {

                    input.value = event.results[0][0].transcript;

                    input.focus();

                };

                recognition.onend = () => {

                    mic.classList.remove("listening");
                    mic.textContent = "♩";

                };

                recognition.onerror = () => {

                    addMessage(
                        "Voice recognition failed. Please try again or type your question.",
                        "assistant"
                    );

                };

            }

        }

    }

});
