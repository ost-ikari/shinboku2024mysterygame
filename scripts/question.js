$(document).ready(function () {
    const pagePath = window.location.pathname;
    const questionId = pagePath.match(/question(\d+)/)[1];

    $.getJSON('../questions.json', function (data) {
        const question = data.questions.find(q => q.id === questionId);

        if (!question) {
            alert("問題が読み込めませんでした。");
            window.location.href = '../index.html';
            return;
        }

        $('#question-text').text(question.question).show();

        // ヒント表示のためのタイマー処理
        const prevQuestionId = parseInt(questionId) - 1;
        const prevTimestamp = localStorage.getItem(`timestamp_answer${prevQuestionId}`);
        const currentTime = Date.now();
        const elapsedSeconds = prevTimestamp ? (currentTime - prevTimestamp) / 1000 : 0;

        if (question.hints.length > 0 && elapsedSeconds >= question.hint_delay) {
            question.hints.forEach((hint, index) => {
                $('#hints').append(
                    `<button class="btn btn-info mt-2 hint-btn" id="hint-btn-${index}">
                        <i class="fas fa-lightbulb"></i> ヒント${index + 1}
                    </button>
                    <div class="hint-text mt-2" id="hint-text-${index}" style="display: none;">${hint}</div>`
                );

                $(`#hint-btn-${index}`).click(function () {
                    $(`#hint-text-${index}`).toggle();
                });
            });
        }

        $('#submit-answer').click(function () {
            const userAnswer = $('#answer-input').val().trim();
            if (userAnswer === question.answer) {
                localStorage.setItem(`answer${question.id}`, userAnswer);
                localStorage.setItem(`timestamp_answer${question.id}`, Date.now());
                window.location.href = '../question_pages/correct.html';
            } else {
                window.location.href = '../question_pages/incorrect.html';
            }
        });
    }).fail(function () {
        alert("問題データを読み込めませんでした。");
        window.location.href = '../index.html';
    });

    $('body').prepend('<button class="btn btn-secondary back-button" onclick="history.back()"><i class="fas fa-arrow-left"></i> 戻る</button>');

    $('#answer-input').attr('autocomplete', 'off');
});
