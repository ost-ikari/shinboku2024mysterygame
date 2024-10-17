$(document).ready(function () {
    const pagePath = window.location.pathname;
    const questionId = pagePath.match(/question(\d+)/)[1]; // URLから問題IDを取得

    // JSONから問題データを取得
    $.getJSON('../questions.json', function (data) {
        const question = data.questions.find(q => q.id === questionId);

        if (!question) {
            alert("問題が読み込めませんでした。");
            window.location.href = '../index.html';
            return;
        }

        // 問題文の表示
        $('#question-text').text(question.question).show();

        // ヒント表示の制御
        const prevQuestionId = (parseInt(questionId) - 1).toString();
        const prevTimestamp = localStorage.getItem(`timestamp_answer${prevQuestionId}`);
        const currentTime = Date.now();
        const elapsedSeconds = prevTimestamp ? (currentTime - prevTimestamp) / 1000 : 0;

        if (question.hints.length > 0 && elapsedSeconds >= question.hint_delay) {
            question.hints.forEach((hint, index) => {
                $('#hints').append(
                    `<button class="btn btn-info hint-btn" id="hint-btn-${index}">
                        <i class="fas fa-lightbulb"></i> ヒント${index + 1}をみる
                    </button>
                    <div class="hint-text" id="hint-text-${index}" style="display: none;">${hint}</div>`
                );

                $(`#hint-btn-${index}`).click(function () {
                    $(`#hint-text-${index}`).slideToggle();
                });
            });
        }

        // 解答送信の処理
        $('#submit-answer').click(function () {
            const userAnswer = $('#answer-input').val().trim();

            if (userAnswer === question.answer) {
                // 正解した問題IDと解答をlocalStorageに保存
                localStorage.setItem(`answer${question.id}`, userAnswer);
                localStorage.setItem(`timestamp_answer${question.id}`, Date.now());
                localStorage.setItem('lastAnsweredQuestion', question.id); // 正しいIDの保存

                window.location.href = '../question_pages/correct.html'; // 正解ページに遷移
            } else {
                window.location.href = '../question_pages/incorrect.html'; // 不正解ページに遷移
            }
        });
    }).fail(function () {
        alert("問題データを読み込めませんでした。");
        window.location.href = '../index.html';
    });

    $('body').prepend('<button class="btn btn-secondary back-button" onclick="history.back()"><i class="fas fa-arrow-left"></i> 戻る</button>');

    $('#answer-input').attr('autocomplete', 'off');
});
