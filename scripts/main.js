$(document).ready(function () {
    const maxQuestions = 10;
    const currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 1;

    // ボタンを動的に追加
    for (let i = 1; i <= currentQuestion; i++) {
        $('#question-buttons').append(
            `<button class="btn btn-primary" onclick="location.href='question_pages/question${i}.html'">問${i}の解答を入力する</button>`
        );
    }

    // 次の問題のボタンがある場合はそれも追加
    if (currentQuestion <= maxQuestions) {
        $('#question-buttons').append(
            `<button class="btn btn-secondary" disabled>問${currentQuestion + 1}の解答を入力する</button>`
        );
    }
});
