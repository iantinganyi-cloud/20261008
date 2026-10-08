// 宣告測驗題目陣列，總共包含五道題目
let questions = [
  {
    // 設定第一題題目文字
    question: "在 p5.js 中，哪一個指令可以建立畫布？",

    // 設定第一題的四個選項
    options: ["createCanvas()", "makeCanvas()", "canvas()", "newCanvas()"],

    // 設定正確答案的索引值
    answer: 0
  },

  {
    // 設定第二題題目文字
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？",

    // 設定第二題的四個選項
    options: ["color()", "background()", "fill()", "paint()"],

    // 設定正確答案的索引值
    answer: 1
  },

  {
    // 設定第三題題目文字
    question: "在 p5.js 中，哪一個指令可以畫出圓形？",

    // 設定第三題的四個選項
    options: ["circle()", "ellipse()", "round()", "ball()"],

    // 設定正確答案的索引值
    answer: 1
  },

  {
    // 設定第四題題目文字
    question: "在 p5.js 中，哪一個函式只會執行一次？",

    // 設定第四題的四個選項
    options: ["draw()", "loop()", "setup()", "start()"],

    // 設定正確答案的索引值
    answer: 2
  },

  {
    // 設定第五題題目文字
    question: "在 p5.js 中，哪一個函式會持續重複執行？",

    // 設定第五題的四個選項
    options: ["setup()", "draw()", "repeat()", "run()"],

    // 設定正確答案的索引值
    answer: 1
  }
];

// 宣告目前正在顯示的題目索引值
let currentQuestion = 0;

// 宣告答對的題數
let score = 0;

// 宣告使用者是否已經作答
let answered = false;

// 宣告使用者選擇的選項索引值
let selectedOption = -1;

// 宣告下一題按鈕
let nextButton;

// 宣告重新開始按鈕
let restartButton;

// 宣告選項按鈕陣列
let optionButtons = [];

// 宣告測驗是否已經結束
let quizFinished = false;

// 宣告動畫開始時間
let animationStartTime = 0;

// 宣告目前視窗寬度
let canvasWidth;

// 宣告目前視窗高度
let canvasHeight;


// p5.js 初始化函式，只會執行一次
function setup() {
  // 建立符合視窗大小的全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字對齊方式為水平置中
  textAlign(CENTER, CENTER);

  // 設定使用的文字字型
  textFont("Arial");

  // 儲存目前畫布寬度
  canvasWidth = width;

  // 儲存目前畫布高度
  canvasHeight = height;

  // 建立選項按鈕
  createOptionButtons();

  // 建立下一題按鈕
  createNextButton();

  // 建立重新開始按鈕
  createRestartButton();

  // 更新畫面內容
  updateQuiz();

  // 設定畫布顏色
  background("#f8f9fa");
}


// p5.js 畫面繪製函式，會持續重複執行
function draw() {
  // 設定畫布背景顏色
  background("#f8f9fa");

  // 檢查測驗是否已經結束
  if (quizFinished) {
    // 顯示測驗結果
    drawResultScreen();

    // 結束目前這一次的繪製
    return;
  }

  // 顯示測驗畫面
  drawQuizScreen();

  // 更新選項動畫
  updateOptionAnimation();
}


// 建立四個選擇題按鈕
function createOptionButtons() {
  // 使用迴圈建立四個選項按鈕
  for (let i = 0; i < 4; i++) {
    // 建立一個按鈕
    let button = createButton("");

    // 設定按鈕的滑鼠點擊事件
    button.mousePressed(function() {
      // 呼叫選項選擇函式，並傳入目前選項索引值
      selectOption(i);
    });

    // 設定按鈕的文字大小
    button.style("font-size", "20px");

    // 設定按鈕的文字顏色
    button.style("color", "#073b4c");

    // 設定按鈕的邊框
    button.style("border", "2px solid #118ab2");

    // 設定按鈕的圓角
    button.style("border-radius", "12px");

    // 設定按鈕的游標樣式
    button.style("cursor", "pointer");

    // 設定按鈕的轉場效果
    button.style("transition", "background-color 0.2s");

    // 將按鈕加入按鈕陣列
    optionButtons.push(button);
  }
}


// 建立下一題按鈕
function createNextButton() {
  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕的滑鼠點擊事件
  nextButton.mousePressed(nextQuestion);

  // 設定下一題按鈕的文字大小
  nextButton.style("font-size", "20px");

  // 設定下一題按鈕的文字顏色
  nextButton.style("color", "white");

  // 設定下一題按鈕的背景顏色
  nextButton.style("background-color", "#118ab2");

  // 設定下一題按鈕的內距
  nextButton.style("padding", "12px 35px");

  // 設定下一題按鈕的邊框
  nextButton.style("border", "none");

  // 設定下一題按鈕的圓角
  nextButton.style("border-radius", "10px");

  // 設定下一題按鈕的游標
  nextButton.style("cursor", "pointer");

  // 隱藏下一題按鈕
  nextButton.hide();
}


// 建立重新開始按鈕
function createRestartButton() {
  // 建立重新開始按鈕
  restartButton = createButton("重新開始測驗");

  // 設定重新開始按鈕的滑鼠點擊事件
  restartButton.mousePressed(restartQuiz);

  // 設定重新開始按鈕的文字大小
  restartButton.style("font-size", "20px");

  // 設定重新開始按鈕的文字顏色
  restartButton.style("color", "white");

  // 設定重新開始按鈕的背景顏色
  restartButton.style("background-color", "#118ab2");

  // 設定重新開始按鈕的內距
  restartButton.style("padding", "12px 35px");

  // 設定重新開始按鈕的邊框
  restartButton.style("border", "none");

  // 設定重新開始按鈕的圓角
  restartButton.style("border-radius", "10px");

  // 設定重新開始按鈕的游標
  restartButton.style("cursor", "pointer");

  // 隱藏重新開始按鈕
  restartButton.hide();
}


// 繪製測驗畫面
function drawQuizScreen() {
  // 設定目前題目的資料
  let current = questions[currentQuestion];

  // 設定主要標題文字顏色
  fill("#073b4c");

  // 設定標題文字大小
  textSize(min(36, width * 0.05));

  // 顯示測驗標題
  text("p5.js 簡易指令練習測驗", width / 2, height * 0.10);

  // 設定題數文字大小
  textSize(min(22, width * 0.03));

  // 顯示目前題數
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + questions.length + " 題",
    width / 2,
    height * 0.18
  );

  // 設定題目文字大小
  textSize(min(28, width * 0.035));

  // 設定題目文字顏色
  fill("#073b4c");

  // 顯示題目文字
  text(current.question, width / 2, height * 0.28);

  // 設定提示文字大小
  textSize(min(18, width * 0.025));

  // 設定提示文字顏色
  fill("#6c757d");

  // 尚未作答時顯示作答提示
  if (!answered) {
    text("請選擇一個正確答案", width / 2, height * 0.35);
  } else {
    // 作答後顯示答案提示
    text("答案已顯示，請按下一題", width / 2, height * 0.35);
  }
}


// 更新選項動畫
function updateOptionAnimation() {
  // 逐一處理四個選項
  for (let i = 0; i < optionButtons.length; i++) {
    // 取得目前選項按鈕
    let button = optionButtons[i];

    // 取得按鈕的基本位置
    let baseX = width / 2 - min(300, width * 0.35);

    // 計算按鈕的上下排列位置
    let baseY = height * 0.43 + i * min(70, height * 0.08);

    // 設定動畫的水平位移量
    let moveX = 0;

    // 設定動畫的垂直位移量
    let moveY = 0;

    // 只有答錯之後才執行動畫
    if (answered && selectedOption !== questions[currentQuestion].answer) {
      // 判斷目前選項是否為正確答案
      if (i === questions[currentQuestion].answer) {
        // 使用正弦函式產生上下跳動效果
        moveY = sin((frameCount - animationStartTime) * 0.15) * 10;
      }

      // 判斷目前選項是否為使用者答錯的選項
      if (i === selectedOption) {
        // 使用正弦函式產生左右移動效果
        moveX = sin((frameCount - animationStartTime) * 0.2) * 12;
      }
    }

    // 設定選項按鈕的位置
    button.position(baseX + moveX, baseY + moveY);

    // 設定選項按鈕的寬度
    button.size(min(600, width * 0.70), min(54, height * 0.065));
  }
}


// 更新測驗內容
function updateQuiz() {
  // 取得目前題目資料
  let current = questions[currentQuestion];

  // 重設作答狀態
  answered = false;

  // 重設使用者選項
  selectedOption = -1;

  // 重設動畫開始時間
  animationStartTime = frameCount;

  // 逐一更新四個選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定選項按鈕文字
    optionButtons[i].html(current.options[i]);

    // 設定選項按鈕背景顏色
    optionButtons[i].style("background-color", "#ffffff");

    // 重新啟用選項按鈕
    optionButtons[i].removeAttribute("disabled");

    // 設定選項按鈕位置
    optionButtons[i].position(
      width / 2 - min(300, width * 0.35),
      height * 0.43 + i * min(70, height * 0.08)
    );
  }

  // 隱藏下一題按鈕
  nextButton.hide();

  // 隱藏重新開始按鈕
  restartButton.hide();
}


// 使用者選擇選項
function selectOption(index) {
  // 如果已經作答，就不再接受新的選擇
  if (answered) {
    // 結束函式
    return;
  }

  // 設定目前已經作答
  answered = true;

  // 記錄使用者選擇的選項
  selectedOption = index;

  // 取得目前題目資料
  let current = questions[currentQuestion];

  // 判斷使用者是否答對
  if (index === current.answer) {
    // 答對題數加一
    score++;

    // 將正確選項設定為綠色
    optionButtons[index].style("background-color", "#06d6a0");
  } else {
    // 將正確選項設定為綠色
    optionButtons[current.answer].style("background-color", "#06d6a0");

    // 將錯誤選項設定為粉紅色
    optionButtons[index].style("background-color", "#ffc8dd");
  }

  // 停用所有選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定按鈕為停用狀態
    optionButtons[i].attribute("disabled", "true");
  }

  // 顯示下一題按鈕
  nextButton.show();

  // 設定下一題按鈕的位置
  nextButton.position(width / 2 - 80, height * 0.82);
}


// 顯示下一題
function nextQuestion() {
  // 增加目前題目索引值
  currentQuestion++;

  // 判斷是否已經完成所有題目
  if (currentQuestion >= questions.length) {
    // 設定測驗結束狀態
    quizFinished = true;

    // 隱藏選項按鈕
    for (let i = 0; i < optionButtons.length; i++) {
      // 隱藏目前選項按鈕
      optionButtons[i].hide();
    }

    // 隱藏下一題按鈕
    nextButton.hide();

    // 顯示重新開始按鈕
    restartButton.show();

    // 設定重新開始按鈕的位置
    restartButton.position(width / 2 - 95, height * 0.65);
  } else {
    // 更新下一題內容
    updateQuiz();
  }
}


// 繪製測驗結果畫面
function drawResultScreen() {
  // 設定結果標題文字顏色
  fill("#073b4c");

  // 設定結果標題文字大小
  textSize(min(42, width * 0.06));

  // 顯示測驗完成文字
  text("測驗完成！", width / 2, height * 0.28);

  // 設定成績文字大小
  textSize(min(32, width * 0.045));

  // 計算答對題數百分比
  let percentage = score / questions.length * 100;

  // 顯示答對題數
  text(
    "你答對了 " + score + "／" + questions.length + " 題",
    width / 2,
    height * 0.40
  );

  // 設定百分比文字大小
  textSize(min(25, width * 0.035));

  // 顯示答對百分比
  text("答對率：" + percentage + "%", width / 2, height * 0.49);

  // 設定鼓勵文字大小
  textSize(min(22, width * 0.03));

  // 根據成績顯示不同鼓勵文字
  if (score === questions.length) {
    // 顯示滿分訊息
    text("太棒了！全部答對！", width / 2, height * 0.57);
  } else if (score >= 3) {
    // 顯示良好訊息
    text("表現很好，繼續加油！", width / 2, height * 0.57);
  } else {
    // 顯示鼓勵練習訊息
    text("再多練習幾次就會更熟悉了！", width / 2, height * 0.57);
  }
}


// 重新開始測驗
function restartQuiz() {
  // 將目前題目重設為第一題
  currentQuestion = 0;

  // 將答對題數歸零
  score = 0;

  // 將測驗結束狀態設為否
  quizFinished = false;

  // 顯示所有選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 顯示選項按鈕
    optionButtons[i].show();
  }

  // 更新測驗內容
  updateQuiz();
}


// 當視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 更新畫布寬度
  canvasWidth = width;

  // 更新畫布高度
  canvasHeight = height;

  // 重新設定畫面元件位置
  if (quizFinished) {
    // 設定重新開始按鈕位置
    restartButton.position(width / 2 - 95, height * 0.65);
  } else {
    // 更新測驗按鈕位置
    updateQuiz();
  }
}