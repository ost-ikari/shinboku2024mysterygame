$(document).ready(function () {
    const maxQuestions = 10;
    const currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 1;

    // 問題ボタンの表示制御
    for (let i = 1; i <= maxQuestions; i++) {
        const answerKey = `answer${i}`;
        const isAnswered = localStorage.getItem(answerKey);
        
        if (i < currentQuestion) {
            // 解答済みの問題は見直しボタンに変更
            $('#question-buttons').append(
                `<div class="mb-3">
                    <button class="btn btn-success review-btn" data-question="${i}">問${i}の解答を見直す <i class="fas fa-chevron-down"></i></button>
                    <div class="answer-display" style="display: none;">${isAnswered}</div>
                </div>`
            );
        } else if (i === currentQuestion) {
            // 次の解答入力が必要な問題ボタン
            $('#question-buttons').append(
                `<button class="btn btn-primary mb-3" onclick="location.href='question_pages/question${i}.html'">問${i}の解答を入力する</button>`
            );
        }
    }

    // ボタンの開閉動作
    $('.review-btn').click(function () {
        const $answerDisplay = $(this).next('.answer-display');
        $answerDisplay.slideToggle();

        // 矢印の向きを変更
        const $icon = $(this).find('i');
        $icon.toggleClass('fa-chevron-down fa-chevron-up');
    });
});
