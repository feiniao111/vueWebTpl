#!/bin/sh
set -x
###########################################
###自动编译、并提交webapp目录的内容到svn###
# 1. 将该脚本置于前端vueWebTpl目录下
# 2. 执行  sh  auto-commit.sh  ${comment}
#
# 适用的项目结构
# |-- vueWebTpl (etc.)  前端项目根目录
# |  |-- auto-commit.sh
# |  |-- webapp  生产代码
# 适用的svn客户端Tortoise SVN 1.9+
###########################################
rootDir='vueWebTpl'  # 根据需要改成实际的根目录

comment=$1
#检验评论长度，必须大于4个字符
if [ ${#comment} -le 4 ];then
    echo "评论长度必须大于4个字符"
    echo "Usage: sh auto-commit.sh \${comment}"
    exit
fi

sourcePath=`pwd`
#校验脚本存放路径，必须置于前端项目根目录中
if [ "${sourcePath##*/}" != "${rootDir}" ];then
    echo "脚本未置于根目录中，自动编译和提交无法生效"
    exit
fi

#编译前强制同步svn最新代码
if [ -d webapp ];then
    [ -d webapp.bak ] && rm -rf webapp.bak
    echo "备份当前webapp为webapp.bak"
    mv webapp webapp.bak
    if [ $? -ne 0 ];then
        echo "备份旧文件失败，请检查webapp是否正在被占用"
        exit
    fi
fi

svn update
if [ $? -ne 0 ];then
    echo "执行svn update出错，请检查"
    exit
fi

#如果webapp未托管到svn，托管之
if [ ! -d  webapp ];then
    echo "不存在webapp目录，创建之"
    mkdir webapp
    echo "添加webapp目录到svn"
    svn add webapp
    svn ci webapp -m "添加webapp目录到svn"
fi

#为了添加新编译代码中出现的新文件，需要先删除svn上的生产版本
cd webapp
buildPath=`pwd`
if [ `ls|wc -l` -gt 0 ];then
    svn delete *
    echo "删除svn上的生产版本"
    svn ci * -m "删除之前的生产版本"
fi

#编译代码
echo "执行代码编译"
cd $sourcePath
npm run build
if [ $? -ne 0 ];then
    echo "代码编译失败！请检查"
    exit
fi

#提交代码到svn
cd $buildPath
svn add *
echo "提交新代码"
svn ci * -m "***自动提交***${comment}"




