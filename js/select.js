let inputLength; // inputLength変数の宣言をDOMContentLoaded外部に移動

// 入力文字数を表示する
window.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById("text-input");
    const length = document.querySelector('.input-text-length');

    textInput.addEventListener('input', () => {
        length.textContent = textInput.value.length;
        inputLength = textInput.value.length;
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
                inputLength = textInput.value.length;
            };
        } else {
            textInput.value = `ファイル名: ${data.name}\nタイプ: ${data.type}\nサイズ: ${data.size} bytes`;
            length.textContent = textInput.value.length;
            inputLength = textInput.value.length;
        }
    }, false);

    // 別のスコープでinputLengthを使う
    function someFunction() {
        console.log(inputLength);
    }
});

// テキスト分割
function splitText() {
    const textInput = document.getElementById("text-input").value;
    const maxLengthInput = document.getElementById("max-length-input");
    const maxLen = parseInt(maxLengthInput.value, 10);
    const regexp = new RegExp(`.{1,${maxLen}}[。．！？.]`, "g");
    const splitText = textInput.replace(/\n/g, "﷐").match(regexp);
    const output = document.getElementById("output");
    const statsOutput = document.getElementById("output-stats");
    const reinputLength = inputLength; // inputLengthを使用
    output.innerHTML = "";
    statsOutput.innerHTML = `<p><span>入力された</span> ${reinputLength} 文字を ${splitText.length} 個<span>のファイル</span>に分割しました。</p>`;



    splitText.forEach((text, index) => {
        const div = document.createElement("div");
        const textareaId = `textarea${index}`;
        const textarea = document.createElement("textarea");
        textarea.id = textareaId;
        textarea.type = "text";
        textarea.value = text.replace(/﷐/g, "\n");
        textarea.classList.add("generated-textarea");
        textarea.readOnly = true; // readOnly属性を追加
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
            // スタイルを変更するコードを追加する
            copyButton.classList.add("button-clicked");

            const message = document.createElement("p");
            message.textContent = "クリップボードにコピーされました";
            message.classList.add("copy-message");
            div.appendChild(message);

            // 2秒後にメッセージを消す
            setTimeout(function () {
                div.removeChild(message);
            }, 2000);
        });
        div.appendChild(copyButton);
        output.appendChild(div);


    });
}


// 分割する文字数を増減する+-ボタン※デフォルトのスピンボタンを使わないため
document.addEventListener('DOMContentLoaded', function () {
    // 変数名ナンバーインプットにID名マックスレングスインプットを入れる
    const numberInput = document.getElementById('max-length-input');
    // 変数名アップボタンにID名マックスレングスインプットアップを入れる
    const upButton = document.getElementById('max-length-input-up');
    // 変数名ダウンボタンにID名マックスレングスインプットダウンを入れる
    const downButton = document.getElementById('max-length-input-down');

    let intervalID; // タイマーIDを格納する変数

    // アップボタンが長押しされた時の処理
    upButton.addEventListener('mousedown', () => {
        numberInput.stepUp();
        intervalID = setInterval(() => {
            numberInput.stepUp();
        }, 100); // 0.1秒ごとにステップアップ
    });
    upButton.addEventListener('touchstart', () => {
        numberInput.stepUp();
        intervalID = setInterval(() => {
            numberInput.stepUp();
        }, 100); // 0.1秒ごとにステップアップ
    });
    // ダウンボタンが長押しされた時の処理
    downButton.addEventListener('mousedown', () => {
        numberInput.stepDown();
        intervalID = setInterval(() => {
            numberInput.stepDown();
        }, 100); // 0.1秒ごとにステップダウン
    });
    downButton.addEventListener('touchstart', () => {
        numberInput.stepDown();
        intervalID = setInterval(() => {
            numberInput.stepDown();
        }, 100); // 0.1秒ごとにステップダウン
    });
    // 長押しを終了した時の処理
    document.addEventListener('mouseup', () => {
        clearInterval(intervalID); // タイマーを解除する
    });
    document.addEventListener('touchend', () => {
        clearInterval(intervalID); // タイマーを解除する
    });

});

// 消去ボタン
function clearInput() {
    // 入力エリア内のテキストを削除
    document.getElementById("text-input").value = "";
    // 入力文字数カウントをリセット
    document.getElementById("input-text-length").textContent = "0";

    // output-stats内の全子要素を削除
    const outputStats = document.getElementById("output-stats");
    while (outputStats.firstChild) {
        outputStats.removeChild(outputStats.firstChild);
    }

    // output内の全子要素を削除
    const output = document.getElementById("output");
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}
