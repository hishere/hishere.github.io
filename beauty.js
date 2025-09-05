const fs = require('fs');
const beautify = require('js-beautify').html;

// 获取命令行参数
const fileName = process.argv[2];

if (!fileName) {
    console.error('请提供要格式化的 HTML 文件名。');
    console.log('用法: node format-html.js <文件名>');
    process.exit(1); // 退出并返回错误代码
}

// 格式化选项（可根据需要调整）
const options = {
    indent_size: 2, // 缩进使用 2 个空格
    indent_char: ' ',
    max_preserve_newlines: 5, // 保留的最大连续换行数
    preserve_newlines: true,
    wrap_line_length: 80,
    wrap_attributes: 'auto', // 属性换行方式 ('auto', 'force', 'force-aligned', 'force-expand-multiline')
    end_with_newline: false,
    indent_scripts: 'normal' // 脚本标签内的缩进方式
};

// 读取文件、格式化并写回
try {
    // 读取原始 HTML 内容
    const originalContent = fs.readFileSync(fileName, 'utf8');
    console.log(`正在格式化文件: ${fileName}`);

    // 格式化 HTML
    const formattedContent = beautify(originalContent, options);

    // 将格式化后的内容写回原文件（覆盖）
    fs.writeFileSync(fileName, formattedContent, 'utf8');
    console.log('✅ HTML 格式化完成！');

} catch (error) {
    console.error('❌ 处理文件时出错:', error.message);
    process.exit(1);
}

