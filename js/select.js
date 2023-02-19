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


// テキスト分割
function splitText() {
    const textInput = document.getElementById("text-input").value;
    const maxLengthInput = document.getElementById("max-length-input");
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
        div.appendChild(textarea);

        // 文字数をカウントする関数
        function countTextAreaCharacters() {
            const characters = textarea.value.length;
            document.getElementById(`${textareaId}-characters`).textContent = characters;
        }

        // テキストエリアのイベントにcountTextAreaCharacters関数を登録
        textarea.addEventListener("input", countTextAreaCharacters);

        const countSpan = document.createElement("span");
        countSpan.id = `${textareaId}-characters`;
        countSpan.textContent = `${text.replace(/\;/g, "\n").length}`;
        div.appendChild(countSpan);

        const copyButton = document.createElement("button");
        copyButton.textContent = "コピー";
        copyButton.addEventListener("click", function () {
            textarea.select();
            document.execCommand("copy");
            textarea.classList.add("is-copied");
        });
        div.appendChild(copyButton);
        output.appendChild(div);

    });
}

function handleClick(event) {
    const clickedTextArea = event.target;
    clickedTextArea.classList.add("clicked");
    // その他の処理...
}

// 入力エリアをクリア
function clearInput() {
    document.getElementById("text-input").value = "";
}