let input;
let slider;
let button;
let select;
let iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  
  slider = createSlider(5, 30, 16); // 創建滑桿，範圍為 5 到 30，初始值為 16
  slider.position(input.x + input.width + 10, 10); // 將滑桿放置在文字框的右側
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放置在滑桿的右側
  button.mousePressed(toggleBounce);
  
  select = createSelect();
  select.position(button.x + button.width + 10, 10); // 將下拉式選單放置在按鈕的右側
  select.option('第一周');
  select.option('第二周');
  select.option('白癡測驗');
  select.changed(updateIframe);

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
}

function draw() {
  background(0); // 設置背景顏色為黑色
  fill(255); // 設置文字顏色為白色
  let inputText = input.value();
  let repeatedText = inputText;
  
  while (textWidth(repeatedText) < width) {
    repeatedText += " " + inputText;
  }

  textAlign(LEFT, TOP);
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  textWrap(WORD);

  let y = 50;
  while (y < height) {
    for (let i = 0; i < repeatedText.length; i++) {
      let char = repeatedText.charAt(i);
      let offsetY = isBouncing ? sin((frameCount + i * 10) * 0.1) * 10 : 0;
      text(char, 10 + textWidth(repeatedText.substring(0, i)), y + offsetY, width - 20);
      if (textWidth(repeatedText.substring(0, i + 1)) > width - 20) {
        y += textAscent() + textDescent();
        i++;
      }
    }
    y += textAscent() + textDescent();
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function updateIframe() {
  let selectedOption = select.value();
  if (selectedOption === '第一周') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selectedOption === '第二周') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selectedOption === '白癡測驗') {
    iframe.attribute('src', 'https://hudson0811.github.io/20250310/');
  }
}

