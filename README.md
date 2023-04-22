# Diamond-Tofu-Careers-Server


## 問題

### 問題 1

修改完node檔案後需要重啟伺服器，但重啟卻遇到 localhost: 3001 inused     

解決：   
安裝nodemon，nodemon是自動重啟node的工具，監聽目錄下的文件，當文件修改時，自動重啟應用程序。   
安裝方式：   
需要全局安裝，讓所有資料夾使用。    
```
npm install --save-dev nodemon
```
但只輸入這個指令會遇到問題：permission denied  
原因：加 -g 代表 npm 會在系統資料夾內安裝程式，而這樣的行為需要管理員權限才可以執行。   
所以要在指令前面加sudo，代表透過管理員權限安裝nodemon。   

```
sudo npm install -g nodemon
```
https://juejin.cn/post/6844904191316459527
### 問題 2
傳到後端的資料不行被解構（destructed），所以obejct 顯示undefined。    
當使用POST request將json傳到後端時，通常是json 是放在request body，如果需要使用放在request body 的 json data 需要使用 parser 中間件 在Express。    

解決方式：   
使用 body-parser middleware，這樣路由處理器可以從POST request中的request body得到正確的json data。   
```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```
### 問題 3
使用不同的module 模塊，要如何用只使用app.js，啟動所有模塊中的路由處理器。     
在主應用中引入module，ex: 在 app.js 引入 wiki.js中的路由     
要注意的是  wiki.js中的路由參數，將全部接著從/wiki 子目錄中往下定義。   
在wiki.js文件底部加上
```javascript
module.exports = router;
```
在app.js加上
```javascript
const wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```
https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/routes
### 問題 4

用某一次的commit 紀錄覆蓋掉main。
1. 先用log 找到commit 紀錄的SHA KEY
```
git log
```
2. 接著切換到那次commit 紀錄
```
git checkout <SHA>
```
3. 為那次commit紀錄創建一個新的分支
```
git checkout -b new_branch_name
```
4. 將更改推到github上
```
git add .
git commit -m "commit message"
git push origin new_branch_name
```
5. 切換到分支
```
git checkout branch_name
```
6. 使用ours 將分支內容合併到main，並且忽略掉main上的內容，這樣可以直接將分之內容覆蓋掉main分支。
```
git merge -s ours main
```
7. 最後，將合併後的更改，推到github上的main分支
```
git checkout main
git merge branch_name
git push origin main
```
