// テキストエリアに入力された文字数を表示する
window.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById("text-input");
    const length = document.querySelector('.length');

    textInput.addEventListener('input', () => {
        length.textContent = textInput.value.length;
    }, false);

    textInput.addEventListener('drop', (event) => {
        event.preventDefault();

        const data = event.dataTransfer.items[0].getAsFile();

        if (data.type === "text/plain") {
            const reader = new FileReader();
            reader.readAsText(data);
            reader.onload = function () {
                textInput.value = reader.result;
                length.textContent = textInput.value.length;
            };
        } else {
            textInput.value = `ファイル名: ${data.name}\nタイプ: ${data.type}\nサイズ: ${data.size} bytes`;
            length.textContent = textInput.value.length;
        }
    }, false);
});

// ----------------------------------------------------------------------------


// テキスト分割
// テキスト分割イベントを発生させます
function splitText() {
    // 変数名テキストインプットにID名テキストインプットの値を入れる
    const textInput = document.getElementById("text-input").value;
    // 変数名マックスレングスインプットにID名マックスレングスインプットを入れる
    const maxLengthInput = document.getElementById("max-length-input");
    // 変数名マックスレンは
    const maxLen = parseInt(maxLengthInput.value, 10);
    const regexp = new RegExp(`.{1,${maxLen}}[。．！？.]`, "g");
    const splitText = textInput.replace(/\n/g, ";").match(regexp);
    const output = document.getElementById("output");
    const statsOutput = document.getElementById("output-stats");
    output.innerHTML = "";
    statsOutput.innerHTML = `<p> ${splitText.length} 個に分割しました。</p>`;

    splitText.forEach((text, index) => {
        const div = document.createElement("div");
        const textareaId = `textarea${index}`;
        const textarea = document.createElement("textarea");
        textarea.id = textareaId;
        textarea.type = "text";
        textarea.value = text.replace(/\;/g, "\n");
        textarea.classList.add("generated-textarea");
        div.appendChild(textarea);


        // 文字数をカウントする関数
        function countTextAreaCharacters() {
            const characters = textarea.value.length;
            document.getElementById(`${textareaId}-characters`).textContent = `${characters}`;
        }


        // テキストエリアのイベントにcountTextAreaCharacters関数を登録
        textarea.addEventListener("input", countTextAreaCharacters);

        const countSpan = document.createElement("span");
        countSpan.id = `${textareaId}-characters`;
        countSpan.textContent = `${text.replace(/\;/g, "\n").length}文字`;
        div.appendChild(countSpan);

        const copyButton = document.createElement("button");
        copyButton.textContent = "コピー";
        copyButton.addEventListener("click", function () {
            textarea.select();
            document.execCommand("copy");
            textarea.classList.add("clicked");
        });
        div.appendChild(copyButton);
        output.appendChild(div);
    });
}

// 分割する文字数を指定する+-ボタン※デフォルトのスピンボタンを使わないため
// HTMLを読み込む
document.addEventListener('DOMContentLoaded', function () {
    // 変数名ナンバーインプットにID名マックスレングスインプットを入れる
    const numberInput = document.getElementById('max-length-input');
    // 変数名アップボタンにID名マックスレングスインプットアップを入れる
    const upButton = document.getElementById('max-length-input-up');
    // 変数名ダウンボタンにID名マックスレングスインプットダウンを入れる
    const downButton = document.getElementById('max-length-input-down');
    // 変数名アップボタンがクリックされた時変数名ナンバーインプットがステップアップ
    upButton.addEventListener('click', () => numberInput.stepUp());
    // 変数名ダウンボタンがクリックされた時変数名ナンバーインプットがステップダウン
    downButton.addEventListener('click', () => numberInput.stepDown());
});


// 入力エリアをクリア
function clearInput() {
    // IDテキストインプットに入った値をカラにする
    document.getElementById("text-input").value = "";
    // IDインプットキャラクターズのテキストを０文字入力中にする
    document.getElementById("length").textContent = "0";
}