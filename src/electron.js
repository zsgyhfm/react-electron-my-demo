//导入electron app是程序句柄   BrowserWindow 是窗口
import {app,BrowserWindow} from 'electron';
// 声明全局变量接收窗口，防止 窗口被释放掉
let win;
//创建窗口
function createWindow() {
    //创建窗口
    win=new BrowserWindow({
        width:800,height:600
    });
    //指定窗口页面 这里是react 所以指定 调试的地址
    win.loadURL("http://127.0.0.1:3000");
    // win.loadFile() 打包后 可以直接加载本地文件

    //打开调试工具
    win.webContents.openDevTools();
    // 监听窗口关闭事件
    win.on('close',()=>{
        // 释放掉窗口
        win=null;
    });

}

//app 是程序主进程
app.on('ready',()=>{
    createWindow();
});
// 当窗口都关闭时
app.on('window-all-close',()=>{
    if(process.platform!=='darwin'){
        //如果不是mac 就直接退出
        app.quit();
    }
});

//mac 因为dockers 所以 app会驻留
app.on('active',()=>{
    if(win==null){
        createWindow();
    }
});
