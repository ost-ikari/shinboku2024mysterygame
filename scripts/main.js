$(document).ready(function () {
    const totalQuestions = 3; // 全体の問題数

    // 各問題のボタン表示
    for (let i = 1; i <= totalQuestions; i++) {
        const answerKey = `answer${i}`;
        const isAnswered = localStorage.getItem(answerKey);

        // 最初の問題、または前の問題が正解していればボタンを表示
        if (i === 1 || localStorage.getItem(`answer${i - 1}`)) {
            const buttonLabel = isAnswered ? `問${i}の解答を見直す` : `問${i}の解答を入力する`;
            const buttonIcon = isAnswered ? 'fa-chevron-down' : 'fa-pencil-alt';
            const buttonAction = isAnswered ? `toggleAnswerDisplay('answer-display-${i}')` : `location.href='question_pages/question${i}.html'`;
            const iconPosition = isAnswered ? 'right' : 'left'; // アイコンの位置を決定

            $('#question-buttons').append(
                `<div class="mb-3">
                    <button class="btn btn-${isAnswered ? 'success' : 'primary'} review-btn" onclick="${buttonAction}">
                        ${iconPosition === 'left' ? `<i class="fas ${buttonIcon}"></i> ` : ''}${buttonLabel}${iconPosition === 'right' ? ` <i class="fas ${buttonIcon}"></i>` : ''}
                    </button>
                    ${isAnswered ? `<div class="answer-display" id="answer-display-${i}" style="display: none;">${localStorage.getItem(answerKey)}</div>` : ''}
                </div>`
            );
        }
    }

    // 最終問題ボタン表示の条件設定
    if (localStorage.getItem('answer3')) {
        window.addEventListener("orientationchange", function() {
            if (window.matchMedia("(orientation: portrait)").matches) { // 縦画面に戻った時
                if ($('#final-question-button').length === 0) {
                    $('#question-buttons').append('<button id="final-question-button" class="btn btn-warning mt-5"><i class="fas fa-flag-checkered"></i> 最終問題に挑戦する</button>');
                }
            }
        });
    }
});

// 解答表示の開閉機能
function toggleAnswerDisplay(displayId) {
    const $answerDisplay = $(`#${displayId}`);
    $answerDisplay.slideToggle();
    const $icon = $(`#${displayId}`).prev().find('i');
    $icon.toggleClass('fa-chevron-down fa-chevron-up');
}
