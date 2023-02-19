// ドロップを許可
function allowDrop(event) {
    event.preventDefault();
}
// ドロップか入力された時
function dropTextOrFile(event) {
    event.preventDefault();
    // ID"text-input"を取得
    const textInput = document.getElementById("text-input");
    // ファイルオブジェクト取得
    const data = event.dataTransfer.items[0].getAsFile();
    // もしテキストファイルなら
    if (data.type === "text/plain") {
        const reader = new FileReader();
        reader.readAsText(data);
        reader.onload = function () {
            textInput.value = reader.result;
            countCharacters(); // テキストの変更を反映して文字数を再カウント
        };
        // 違ったら
    } else {
        textInput.value = `ファイル名: ${data.name}\nタイプ: ${data.type}\nサイズ: ${data.size} bytes`;
    }
}

// 文字数をカウントする関数
function countCharacters() {
    const textInput = document.getElementById("text-input");
    const inputCharacters = document.getElementById("input-characters");
    inputCharacters.textContent = textInput.value.length;
}

// 初期表示時に文字数をカウントする
countCharacters();

// 入力エリアのイベントにcountCharacters関数を登録
const textInput = document.getElementById("text-input");
textInput.addEventListener("input", countCharacters);