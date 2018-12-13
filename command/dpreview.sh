#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成 release rpk
yarn release

# 输出至 dest 目录下
cp ./dist/com.quickapp.nicelinks.release.rpk ./dest/

echo '✓  Okay, have finished your [dpreview] command.'