$(document).ready(function () {
    const pagePath = window.location.pathname;
    const questionId = pagePath.match(/question(\d+)/)[1];

    // JSONファイルから問題データを取得
    $.getJSON('../questions.json', function (data) {
        const question = data.questions.find(q => q.id === questionId);

        if (!question) {
            alert("問題が読み込めませんでした。");
            window.location.href = '../index.html';
            return;
        }

        // 問題文の設定
        $('#question-text').text(question.question).show();

        // ヒントボタンの機能
        $('#view-hint').click(function () {
            $('#hint').text(question.hint).show();
        });

        // 解答チェック
        $('#submit-answer').click(function () {
            const userAnswer = $('#answer-input').val().trim();
            if (userAnswer === question.answer) {
                // 解答をローカルストレージに保存
                localStorage.setItem(`answer${question.id}`, userAnswer);
                window.location.href = '../question_pages/correct.html';
            } else {
                window.location.href = '../question_pages/incorrect.html';
            }
        });
    }).fail(function() {
        alert("問題データを読み込めませんでした。");
        window.location.href = '../index.html';
    });

    // 前のページへ戻るボタンの挿入
    $('body').prepend('<button class="btn btn-secondary back-button" onclick="history.back()"><i class="fas fa-arrow-left"></i> 戻る</button>');

    // オートコンプリート無効化
    $('#answer-input').attr('autocomplete', 'off');
});
