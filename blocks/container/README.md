# Container Block 使用說明

## 概述

Container 是一個響應式容器佈局元件，支援兩種主要佈局模式：
1. **分欄式佈局（Split Layout）** - Variant 1
2. **疊層式佈局（Overlay Layout）** - Variants 2-5

## 基本用法

### 1. 分欄式佈局（Variant 1）

建立一個兩欄分割的容器：

```
| Container (6:6) |
|-----------------|
| Container 1     |
| Container 2     |
```

#### 可用的欄位比例（Desktop）
- `3:9` - 左側 3 欄，右側 9 欄
- `4:8` - 左側 4 欄，右側 8 欄
- `5:7` - 左側 5 欄，右側 7 欄
- `6:6` - 左右各 6 欄（預設）
- `7:5` - 左側 7 欄，右側 5 欄
- `8:4` - 左側 8 欄，右側 4 欄
- `9:3` - 左側 9 欄，右側 3 欄

#### CSS Class 用法

```html
<div class="container 6:6">
  <div>Container 1 內容</div>
  <div>Container 2 內容</div>
</div>
```

反向排列：
```html
<div class="container 6:6 reverse">
  <div>Container 1</div>
  <div>Container 2</div>
</div>
```

### 2. 疊層式佈局（Overlay Layout）

建立前景與背景疊層的容器：

```
| Container (variant-2) |
|-----------------------|
| Background            |
| Foreground            |
```

#### 可用的 Variants

- `variant-2` - 前景寬度 2 欄
- `variant-3` - 前景寬度 3 欄
- `variant-4` - 前景寬度 4 欄
- `variant-5` - 前景寬度 12 欄（全寬）

#### CSS Class 用法

```html
<div class="container variant-2">
  <div>背景容器（通常放置 Media Block）</div>
  <div>前景容器（文字內容）</div>
</div>
```

## 進階設定

### 垂直對齊

控制兩個容器之間的垂直對齊方式：

```html
<!-- 預設：靠上對齊 -->
<div class="container 6:6">...</div>

<!-- 置中對齊 -->
<div class="container 6:6 align-center">...</div>

<!-- 靠下對齊 -->
<div class="container 6:6 align-bottom">...</div>
```

### 容器設定

可以在個別容器上設定樣式：

```html
<div class="container 6:6">
  <div style="background-color: #f0f0f0; max-width: 800px;">
    Container 1
  </div>
  <div style="text-align: center;">
    Container 2
  </div>
</div>
```

## 響應式行為

### 桌機（> 1024px）
- 分欄式：依設定的欄位比例顯示
- 疊層式：前景與背景依設定交疊

### 平板（768px - 1024px）
- 分欄式：調整為平板適用比例（5:7, 6:6, 7:5）
- 疊層式：前景調整為 2 或 5 欄寬度

### 手機（< 768px）
- 所有佈局自動轉換為上下垂直堆疊
- 失去欄位分配效果

## 允許的子元件

### 分欄式佈局
兩個容器均可放置：
- Text_block（文字區塊）
- featureitem_group（功能項目群組）
- Media_block（媒體區塊）
- btn_learnmore（了解更多按鈕）
- bar_chart（圖表）

### 疊層式佈局

**背景容器（Container 1）**
- 僅允許：Media_block

**前景容器（Container 2）**
- 允許：Text_block, featureitem_group, btn_learnmore, bar_chart
- 不允許：Media_block

## 範例

### 範例 1：簡單的兩欄佈局

```html
<div class="container 4:8">
  <div>
    <h2>側邊欄</h2>
    <p>這是側邊欄內容</p>
  </div>
  <div>
    <h2>主要內容</h2>
    <p>這是主要內容區域</p>
  </div>
</div>
```

### 範例 2：圖片背景 + 文字前景

```html
<div class="container variant-3 align-center">
  <div>
    <img src="background-image.jpg" alt="Background">
  </div>
  <div style="background-color: rgba(255,255,255,0.9); padding: 40px;">
    <h2>標題文字</h2>
    <p>前景內容會顯示在圖片上方</p>
  </div>
</div>
```

### 範例 3：反向排列

```html
<div class="container 7:5 reverse">
  <div>左側內容（在桌機上會顯示在右側）</div>
  <div>右側內容（在桌機上會顯示在左側）</div>
</div>
```

## 注意事項

1. **手機裝置**：所有佈局會自動轉換為垂直堆疊
2. **容器數量**：Container block 需要恰好 2 個子容器
3. **元件限制**：疊層式佈局的背景容器只能放置 Media_block
4. **效能考量**：避免過度嵌套 Container
5. **響應式測試**：建議在不同裝置尺寸下測試佈局效果

## 瀏覽器支援

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

支援所有現代瀏覽器的 CSS Grid 功能。
