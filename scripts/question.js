$(document).ready(function () {
    const pageNumber = parseInt(location.pathname.match(/question(\d+)/)[1]);

    // JSONファイルから問題データを取得
    $.getJSON('../questions.json', function (data) {
        const question = data.questions.find(q => q.id === pageNumber);
        $('#question-text').text(question.question);

        // ヒントボタンの機能
        $('#view-hint').click(function () {
            $('#hint').text(question.hint).show();
        });

        // 解答チェック
        $('#submit-answer').click(function () {
            const userAnswer = $('#answer-input').val().trim();
            if (userAnswer === question.answer) {
                // 解答をローカルストレージに保存
                localStorage.setItem(`answer${pageNumber}`, userAnswer);
                localStorage.setItem('currentQuestion', Math.max(pageNumber + 1, parseInt(localStorage.getItem('currentQuestion')) || 1));
                window.location.href = '../question_pages/correct.html';
            } else {
                window.location.href = '../question_pages/incorrect.html';
            }
        });
    });
});
