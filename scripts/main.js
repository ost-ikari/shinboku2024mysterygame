$(document).ready(function () {
    const group1Questions = 5; // 問1グループの問題数
    const group2Questions = 5; // 問2グループの問題数
    let group1Completed = true; // 問1グループの解答完了状況

    // ボタンのクリックイベントの設定
    $('#btn-question1-1').click(function () {
        location.href = 'question_pages/question1-1.html';
    });

    // 問1グループが全問正解している場合のみ問2タブを表示
    if (group1Completed) {
        $('#tab-group2').show();

        // 問2グループのボタン表示
        let group2Completed = true; // 問2グループの解答完了状況
        // 問2の各ボタンに同様の処理を追加
        if (group2Completed) {
            window.addEventListener("orientationchange", function () {
                if (window.matchMedia("(orientation: landscape)").matches) {
                    if ($('#final-question-button').length === 0) {
                        $('body').append('<button id="final-question-button" class="btn custom-button mt-5"><i class="fas fa-flag-checkered"></i> 最終問題に挑戦する</button>');
                    }
                }
            });
        }
        $('#tab-group2-link').tab('show');
    }

    // 解答見直しボタンの開閉機能
    $('.review-btn').click(function () {
        const $answerDisplay = $(this).next('.answer-display');
        $answerDisplay.slideToggle(); // 表示・非表示をトグルで切り替え
        const $icon = $(this).find('i');
        $icon.toggleClass('fa-chevron-down fa-chevron-up');
    });
});
