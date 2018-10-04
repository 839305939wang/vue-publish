const uploadBySftp = require("./modules/ssh.js");
let config = require("../config/index.js");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
async function startUpload(config){
      config = initOption(config);
      const localPath = config.publish.localSourcePath;
      const targetPath = config.publish.remoteDir;
      let desc =  "*******************************************\n"
                 +"***              开始部署               ***\n"
                 +"*******************************************\n"
    //1 压缩
    let localZipPath = await uploadBySftp.zipLocalFile(localPath,targetPath);
    //2 连接ssh
     let upload = new uploadBySftp(config.publish.serverConfig);
     await upload.connect();
     try {
            //3 上传文件
            let remotePath = await upload.startUploadFile(localZipPath,targetPath,true);
            //4 解压
            let remoteZipPath = await upload.unzipRemoteFile(remotePath,targetPath,false);
            //5 删除远程压缩文件
            await upload.deleteZipFile(remoteZipPath);
            //删除原先已经存在的文件夹
            await upload.deleteFolder(upload.newName);
            let desc =  "\n******************************************\n"
                        +"***              部署成功              ***\n"
                       +"******************************************\n"
            console.log(chalk.green(desc));
     
     } catch (error) {
            console.error(chalk.red("文件部署失败"));
            await upload.rolUp();//开始回滚
     }
     //关闭连接
     upload.close();
}
/**
 * 初始化参数
 */
function initOption(config){
   let hostPattern = /(?:(?:(?:25[0-5]|2[0-4]\d|(?:(?:1\d{2})|(?:[1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|(?:(?:1\d{2})|(?:[1-9]?\d))))/ig;
   let remoteHost = process.argv[2];
   let dirPattern = /(\/opt\/dss\/client\/){1}/ig
   let dir = process.argv[3];
  if(remoteHost){
    if(hostPattern.test(remoteHost)){
      config.publish.serverConfig.host = remoteHost;
    }
  }

   if(dir){
      config.publish.remoteDir = path.join(path.dirname(config.publish.remoteDir),dir).split(path.sep).join("/");
      console.log(config.publish.remoteDir);
   }
   //校验输出地址是否合法
   if(!dirPattern.test(config.publish.remoteDir)){
      throw new Error("上传地址非法");
      return
  }
   if(config.publish){
      if(!config.publish.remoteDir){
        throw new Error("请配置远程文件夹地址")
        return
      }

      if(!config.publish.localSourcePath){
          config.publish.localSourcePath = path.join(process.cwd(),"dist");
      }

      if(!config.publish.serverConfig.host||!config.publish.serverConfig.username||!config.publish.serverConfig.password){
        throw new Error("请配置远程服务器信息")
        return
      }

      return config;
   }else{
      return;
   }
};
startUpload(config);