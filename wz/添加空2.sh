#!/bin/bash

# 配置变量
target_dir="/data/data/com.tencent.tmgp.sgame/files/QtsVFSCache/packages/"
groups="zu1 zu2"



zu1_name="zu1"
zu1_ids="8 12"
zu2_name="zu2"
zu2_ids="305000000000 300100000000 305000000001 305000100159 305000000163 305000005025"

# 主逻辑
echo "==================================="
echo "        正在执行全部组别(zu1-zu6)"
echo "==================================="
echo ""

# 确保目标目录存在
if [ ! -d "$target_dir" ]; then
    echo "目标目录不存在，正在创建: $target_dir"
    mkdir -p "$target_dir" || { echo "错误：无法创建目录 $target_dir"; exit 1; }
fi

for g in $groups; do
    # 获取组名
    name_var="${g}_name"
    group_name="${!name_var}"
    
    echo ""
    echo "---------- 正在处理 ${group_name} ----------"
    
    # 获取该组的ID列表
    ids_var="${g}_ids"
    ids="${!ids_var}"
    
    # 遍历处理每个ID
    for id in $ids; do
        echo "  处理ID: $id"
        
        # ID对应的目录路径
        dir_path="${target_dir}/${id}"
        
        # 1. 如果目录不存在，则创建
        if [ ! -d "$dir_path" ]; then
            echo "    目录不存在，正在创建: $dir_path"
            mkdir -p "$dir_path" || { echo "    错误：无法创建目录 $dir_path"; continue; }
        fi
        
        # 2. 在目录下创建以ID为名称、.db为后缀的空文件
        db_file="${dir_path}/${id}.db"
        
        # 如果文件已存在，先删除再创建（确保是空文件）
        if [ -e "$db_file" ]; then
            rm -f "$db_file"
        fi
        
        # 创建空文件
        if touch "$db_file" 2>/dev/null; then
            echo "    已创建空文件: $db_file"
        else
            echo "    错误：无法创建文件 $db_file"
            continue
        fi
        
        # 3. 设置权限为0400（只读）
        if chmod 0400 "$db_file" 2>/dev/null; then
            echo "    权限设置成功: $(stat -c '%a' "$db_file")"
        else
            echo "    警告：权限设置失败"
        fi
    done
done

echo ""
echo "全部组别处理完成！"
