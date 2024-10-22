$(document).ready(function () {
    let tapCount = 0; // タップ回数をカウントする変数
    const totalQuestions = 10;

    $('#logo').on('click', function () {
        tapCount++;

        if (tapCount === 5 && localStorage.getItem('answer5') !== null) {
            // 問5が正解済みかつ5回タップされた場合、パスコードを表示
            $('#passcode-display').fadeIn();
        }
    });

    // 各問題のボタンを表示する処理
    for (let i = 1; i <= totalQuestions; i++) {
        const answerKey = `answer${i}`;
        const storedAnswer = localStorage.getItem(answerKey);
        const isAnswered = storedAnswer !== null;

        const buttonLabel = isAnswered ? `問${i}の解答を見直す` : `問${i}の解答を入力する`;
        const buttonIcon = isAnswered ? 'fa-chevron-down' : 'fa-pencil-alt';
        const buttonAction = isAnswered
            ? `toggleAnswerDisplay('answer-display-${i}')`
            : `location.href='question_pages/question${i}.html'`;

        if (i === 1 || localStorage.getItem(`answer${i - 1}`) !== null) {
            $('#question-buttons').append(
                `<div class="mb-3">
                    <button class="btn btn-${isAnswered ? 'success' : 'primary'} review-btn" onclick="${buttonAction}">
                        <i class="fas ${buttonIcon}"></i> ${buttonLabel}
                    </button>
                    ${isAnswered ? `<div class="answer-display" id="answer-display-${i}" style="display: none;">${storedAnswer}</div>` : ''}
                </div>`
            );
        }
    }
});

// 解答の開閉表示の制御
function toggleAnswerDisplay(displayId) {
    const $answerDisplay = $(`#${displayId}`);
    $answerDisplay.slideToggle();
    const $icon = $(`#${displayId}`).prev().find('i');
    $icon.toggleClass('fa-chevron-down fa-chevron-up');
}

// モーダルの開閉を制御する処理
$('#rulesModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget); // モーダルをトリガーしたボタン
    const modal = $(this);
    modal.find('.modal-body').text('ここにルール説明の内容が入ります。');
});
