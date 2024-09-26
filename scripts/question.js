$(document).ready(function() {
    const pageNumber = parseInt(location.pathname.match(/question(\d+)/)[1]);

    // JSONファイルから問題データを取得
    $.getJSON('../questions.json', function(data) {
        const question = data.questions.find(q => q.id === pageNumber);
        $('#question-text').text(question.question);

        // ヒントボタンの機能
        $('#view-hint').click(function() {
            $('#hint').text(question.hint).show();
        });

        // 解答チェック
        $('#submit-answer').click(function() {
            const userAnswer = $('#answer-input').val().trim();
            if (userAnswer === question.answer) {
                $('#result').text('正解です！');
                localStorage.setItem('currentQuestion', pageNumber + 1);
                setTimeout(() => window.location.href = '../index.html', 2000);
            } else {
                $('#result').text('不正解です。もう一度挑戦してください。');
            }
        });
    });
});
