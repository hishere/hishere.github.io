<script>
// ========== 标题自动编号功能（附加脚本 - _$编号_ 蓝色版） ==========
(function() {
    let isExecuted = false; // 防重复执行锁

    function addHeadingNumbers() {
        if (isExecuted) return;
        const container = document.getElementById('markdown-rendered');
        if (!container) return;
        
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) return;
        
        const counters = [0, 0, 0, 0, 0, 0]; // 对应 h1-h6
        
        headings.forEach(heading => {
            // 如果已经处理过则跳过
            if (heading.querySelector('.heading-number')) return;
            
            const level = parseInt(heading.tagName.substring(1));
            
            // 重置更低级别的计数器
            for (let i = level; i < 6; i++) {
                counters[i] = 0;
            }
            
            // 增加当前级别计数
            counters[level - 1]++;
            
            // 构建编号，如 "1.1"
            let number = '';
            for (let i = 0; i < level; i++) {
                if (counters[i] > 0) {
                    number += counters[i] + '.';
                }
            }
            number = number.slice(0, -1);
            
            // 查找原有的锚点链接（markdown-it-anchor 生成的带 § 的元素）
            const anchorLink = heading.querySelector('a[href^="#"]');
            
            if (anchorLink) {
                // 清空原 § 符号
                anchorLink.innerHTML = '';
                
                // 创建 _$编号_ 节点
                const numberSpan = document.createElement('span');
                numberSpan.className = 'heading-number';
                numberSpan.style.marginRight = '6px';
                // 继承锚点原有的蓝色和下划线，不强制覆盖颜色和装饰线
                numberSpan.style.fontWeight = 'normal';
                numberSpan.textContent = '_$' + number + '_';
                
                // 将编号嵌入锚点内部
                anchorLink.appendChild(numberSpan);
                
                // 保留原有蓝色：不覆盖 color；保留下划线：不覆盖 textDecoration
                // 仅确保点击区域正常
                anchorLink.style.color = ''; 
                anchorLink.style.textDecoration = '';
            } else {
                // 无锚点时的兜底处理：直接插入标题最前（默认灰色）
                const numberSpan = document.createElement('span');
                numberSpan.className = 'heading-number';
                numberSpan.style.marginRight = '6px';
                numberSpan.style.color = '#666';
                numberSpan.textContent = '_$' + number + '_';
                heading.insertBefore(numberSpan, heading.firstChild);
            }
        });
        
        isExecuted = true; // 标记执行完毕
    }
    
    // 等待 fetch 异步渲染完成，延迟执行确保 DOM 已生成
    function init() {
        setTimeout(addHeadingNumbers, 300);
    }

    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
    
    // 兜底：监听渲染容器的变化
    const observer = new MutationObserver(function(mutations) {
        if (!isExecuted && document.querySelector('#markdown-rendered h1, #markdown-rendered h2, #markdown-rendered h3')) {
            addHeadingNumbers();
        }
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const target = document.getElementById('markdown-rendered');
        if (target) observer.observe(target, { childList: true, subtree: true });
    });
})();
</script>
