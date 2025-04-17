export function showFeedback(message, type) {
    const feedbackContainer = document.getElementById("feedback-container");

    feedbackContainer.textContent = message;
    feedbackContainer.classList.add(type);

    setTimeout(() => {
        feedbackContainer.textContent = '';
        feedbackContainer.classList.remove(type);
    }, 5000);
}