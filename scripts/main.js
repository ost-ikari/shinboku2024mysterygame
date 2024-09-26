$(document).ready(function () {
    const group1Questions = 5; // 問1グループの問題数
    const group2Questions = 5; // 問2グループの問題数
    let group1Completed = true; // 問1グループの解答完了状況

    // 問1グループのボタン表示
    for (let i = 1; i <= group1Questions; i++) {
        const answerKey = `answer1-${i}`;
        const isAnswered = localStorage.getItem(answerKey);

        if (!isAnswered) group1Completed = false;

        // ボタンの動作とアイコンを設定
        const buttonAction = isAnswered
            ? `toggleAnswerDisplay('${answerKey}')`
            : `location.href='question_pages/question1-${i}.html'`;

        const buttonIcon = isAnswered ? 'fa-chevron-down' : 'fa-pencil-alt';

        $('#question-buttons-group1').append(
            `<div class="mb-3">
                <button class="btn btn-${isAnswered ? 'success' : 'primary'} review-btn" onclick="${buttonAction}">
                    <i class="fas ${buttonIcon}"></i> 問1-${i}の${isAnswered ? '解答を見直す' : '解答を入力する'}
                </button>
                ${isAnswered ? `<div class="answer-display" id="answer-display-${answerKey}" style="display: none;">${isAnswered || ''}</div>` : ''}
            </div>`
        );
    }

    // 最初から問1タブを表示
    $('#gameTabs').show();
    $('#tab-group1').show();
    $('#tab-group1').addClass('active');
    $('#group1').addClass('show active');

    // 問1グループが全問正解している場合のみ問2タブを表示
    if (group1Completed) {
        $('#tab-group2').show();

        // 問2グループのボタン表示
        let group2Completed = true; // 問2グループの解答完了状況
        for (let i = 1; i <= group2Questions; i++) {
            const answerKey = `answer2-${i}`;
            const isAnswered = localStorage.getItem(answerKey);

            if (!isAnswered) group2Completed = false;

            const buttonAction = isAnswered
                ? `toggleAnswerDisplay('${answerKey}')`
                : `location.href='question_pages/question2-${i}.html'`;

            const buttonIcon = isAnswered ? 'fa-chevron-down' : 'fa-pencil-alt';

            $('#question-buttons-group2').append(
                `<div class="mb-3">
                    <button class="btn btn-${isAnswered ? 'success' : 'primary'} review-btn" onclick="${buttonAction}">
                        <i class="fas ${buttonIcon}"></i> 問2-${i}の${isAnswered ? '解答を見直す' : '解答を入力する'}
                    </button>
                    ${isAnswered ? `<div class="answer-display" id="answer-display-${answerKey}" style="display: none;">${isAnswered || ''}</div>` : ''}
                </div>`
            );
        }

        // 問2グループが全問正解している場合、スマホが横持ちになったときに最終問題ボタンを表示
        if (group2Completed) {
            window.addEventListener("orientationchange", function() {
                if (window.matchMedia("(orientation: landscape)").matches) {
                    if ($('#final-question-button').length === 0) {
                        $('body').append('<button id="final-question-button" class="btn btn-warning mt-5"><i class="fas fa-flag-checkered"></i> 最終問題に挑戦する</button>');
                    }
                }
            });
        }

        // 問2タブを選択した状態で表示
        $('#tab-group2-link').tab('show');
    }

    // 解答見直しボタンの開閉機能
    $('.review-btn').click(function () {
        const $answerDisplay = $(this).next('.answer-display');
        if ($answerDisplay.length && !$answerDisplay.is(':visible')) {
            $answerDisplay.slideDown();
            const $icon = $(this).find('i');
            $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else if ($answerDisplay.length) {
            $answerDisplay.slideUp();
            const $icon = $(this).find('i');
            $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });
});

// 解答表示の開閉関数
function toggleAnswerDisplay(answerKey) {
    const $answerDisplay = $(`#answer-display-${answerKey}`);
    if ($answerDisplay.length && !$answerDisplay.is(':visible')) {
        $answerDisplay.slideDown();
        const $icon = $(`#answer-display-${answerKey}`).prev().find('i');
        $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else if ($answerDisplay.length) {
        $answerDisplay.slideUp();
        const $icon = $(`#answer-display-${answerKey}`).prev().find('i');
        $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
}
