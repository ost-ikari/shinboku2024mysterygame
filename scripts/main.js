$(document).ready(function() {
    // 現在の問題番号をローカルストレージから取得（デフォルトは1）
    const currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 1;

    // ボタンのテキストを更新
    $('#question-button').text(`問${currentQuestion}の解答を入力する`);

    // ボタンのクリックイベント
    $('#question-button').click(function() {
        window.location.href = `question_pages/question${currentQuestion}.html`;
    });
});
