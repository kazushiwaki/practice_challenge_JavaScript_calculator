$(document).ready(function(){
  // 定義 > 変数
  let currentInput = []; // 現在の入力内容
  let natural_number_button = $(".btn_num"); // 1~9のボタン入力
  let operator_button = $(".btn_operator"); // 算術演算子（＋,-,*,/）のボタン入力
  let clear_button = $(".btn_clear"); // 「AC」の入力
  let zero_button = $(".btn_zero, .btn_double_zero"); // 「0」または「00」の入力
  let cullulate_button = $(".btn_culculate"); // 「=」の入力
  let decimal_point_button = $(".btn_decimal_point"); // 小数点「.」の入力

  // 定義 > 定数
  const NOT_INPUT = 0; // 未入力
  const ADD = $(".btn_add").text(); // 足し算（＋）
  const SUB = $(".btn_sub").text(); // 引き算（-）
  const MUL = $(".btn_mul").text(); // 掛け算（*）
  const DIV = $(".btn_div").text(); // 割り算（/）
  const DECIMAL_POINT = $(".btn_decimal_point").text(); // 小数点（.）
  const ZERO = $(".btn_zero").text(); // 数字「0」
  const DOUBLE_ZERO = $(".btn_double_zero").text(); // 数字「00」


  // 1~9ボタンの入力を受ける
  natural_number_button.on("click", function() {
    let value = $(this).text();
    currentInput.push(value);
    updateDisplay();
  });

  // 小数点「.」の入力を受ける
  decimal_point_button.on("click", function() {
    let value = $(this).text();

    // 入力が空のときは無効
    if (currentInput.length === NOT_INPUT && value === DECIMAL_POINT) {
      return;
    }

    const lastValue = currentInput[currentInput.length - 1];

    if (lastValue === ADD || lastValue === SUB || lastValue === MUL || lastValue === DIV) {
      return;
    }
    // 配列の末端に格納されている要素の取得
    let currentNumber = "";
    for (let i = currentInput.length - 1; i >= 0; i--) {
      if (!isNaN(currentInput[i]) || currentInput[i] === ".") {
        currentNumber = currentInput[i] + currentNumber;
      } else {
        break;
      }
    }
    // 取得した要素に小数点「.」が含まれていれば無効
    if (currentNumber.includes(DECIMAL_POINT)) {
      return;
    }

      currentInput.push(value);
      updateDisplay();
  });


  // 0または00ボタンの入力を受ける
  zero_button.on("click", function() {
    let value = $(this).text();

    // 空の状態で「0」「00」は入力不可
    if (currentInput.length === NOT_INPUT && (value === DOUBLE_ZERO || value === ZERO)) {
      return;
    }

    const lastValue = currentInput[currentInput.length - 1];

    // 前回の入力値から「0」「00」が入力可能か確認
    if (!isNaN(lastValue)) {
      // 前回の入力が「0」または「00」の時、入力不可
      if (lastValue === ZERO && value === ZERO || lastValue === ZERO && value === DOUBLE_ZERO) {
        return;
      }
      currentInput[currentInput.length - 1] += value;
      updateDisplay();
    } else if (lastValue === ADD || lastValue === SUB || lastValue === MUL || lastValue === DIV) {
      if (value === DOUBLE_ZERO) {
        return;
      }
      currentInput.push(value);
      updateDisplay();
    } else {
      currentInput.push(value);
      updateDisplay();
    }
  });


  // 算術演算子（+, -, *, /）の入力を受ける
  operator_button.on("click", function() {
    let value = $(this).text();

    // 空の状態で「00」は入力不可
    if (currentInput.length === NOT_INPUT && (value === MUL || value === DIV)) {
      return;
    }

    const lastValue = currentInput[currentInput.length - 1];
    if (lastValue === ADD || lastValue === SUB || lastValue === MUL || lastValue === DIV) {
      return;
    }

    // 前回の入力がある時のみ、入力状態が小数点「.」で終わっていないか確認
    if (currentInput.length !== NOT_INPUT) {
      if (typeof lastValue === "string" && lastValue.endsWith(DECIMAL_POINT)) {
        return;
      }
    }

    currentInput.push(value);
    updateDisplay();
  });

  // 「=」の入力を受け、計算を行う。
  cullulate_button.on("click", function() {
    if (currentInput.length === NOT_INPUT) {
      return;
    }

    try {
      const result = eval(currentInput.join("")); // 配列を文字列にして計算
      currentInput = [result]; // 結果を配列に格納
      updateDisplay();
    } catch (e) {
      alert("計算に失敗しました。\n正しい数式を入力してください。"); // 式の途中(例：4 +)の場合、エラー表示
  }
  });


  // ACボタンの押下で表示クリア
  clear_button.on("click", function() {
    currentInput = [];
    updateDisplay();
  });


  // ディスプレイへの表示更新
  function updateDisplay() {
    currentInput.length != NOT_INPUT ? $(".formula_display").text(currentInput.join("")) : $(".formula_display").text(NOT_INPUT);
  }
});
