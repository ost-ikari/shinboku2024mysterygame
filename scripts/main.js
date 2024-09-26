$(document).ready(function () {
    const group1Questions = 5; // 問1グループの問題数
    const group2Questions = 5; // 問2グループの問題数
    let group1Completed = true; // 問1グループの解答完了状況

    // 問1グループのボタン表示
    for (let i = 1; i <= group1Questions; i++) {
        const answerKey = `answer1-${i}`;
        const isAnswered = localStorage.getItem(answerKey);

        if (!isAnswered) group1Completed = false;

        // 正解済みの場合のみ解答表示枠と矢印アイコンを表示
        const buttonAction = isAnswered
            ? `toggleAnswerDisplay('${answerKey}')`
            : `location.href='question_pages/question1-${i}.html'`;

        const buttonIcon = isAnswered ? 'fa-chevron-down' : 'fa-pencil-alt';

        $('#question-buttons-group1').append(
            `<div class="mb-3">
                <button class="btn btn-${isAnswered ? 'success' : 'primary'} review-btn" onclick="${buttonAction}">
                    問1-${i}の${isAnswered ? '解答を見直す <i class="fas ${buttonIcon}"></i>' : '解答を入力する <i class="fas fa-pencil-alt"></i>'}
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
                        問2-${i}の${isAnswered ? '解答を見直す <i class="fas ${buttonIcon}"></i>' : '解答を入力する <i class="fas fa-pencil-alt"></i>'}
                    </button>
                    ${isAnswered ? `<div class="answer-display" id="answer-display-${answerKey}" style="display: none;">${isAnswered || ''}</div>` : ''}
                </div>`
            );
        }

        // 問2グループが全問正解している場合、スマホの上下反転で最終問題ボタンを表示
        if (group2Completed) {
            window.addEventListener("deviceorientation", function(event) {
                if (Math.abs(event.beta) > 150) { // デバイスがほぼ上下逆さの場合
                    if ($('#final-question-button').length === 0) {
                        $('body').append('<button id="final-question-button" class="btn btn-warning mt-5">最終問題に挑戦する <i class="fas fa-flag-checkered"></i></button>');
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
        $answerDisplay.slideToggle();

        // 矢印の向きを変更
        const $icon = $(this).find('i');
        $icon.toggleClass('fa-chevron-down fa-chevron-up');
    });
});

// 解答表示の開閉関数
function toggleAnswerDisplay(answerKey) {
    const $answerDisplay = $(`#answer-display-${answerKey}`);
    $answerDisplay.slideToggle();

    // 矢印の向きを変更
    const $icon = $(`#answer-display-${answerKey}`).prev().find('i');
    $icon.toggleClass('fa-chevron-down fa-chevron-up');
}
