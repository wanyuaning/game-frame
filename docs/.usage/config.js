module.exports.config = {
    title: '标题文本',
    description: '说明文本',
    
    // 默认主题配置
    themeConfig: {
        logo: '/logo.png', // 公共资源库：docs/.vuepress/public/
        nav: [
            { text: '指南', link: '/' },
        ],
        sidebarDepth: 2,
        sidebar: 'auto'
    },
}

// 依赖列表 vuepress会自动安装无需罗列
module.exports.dependencies = [
    //{name: 'vuepress', version: '', type: 'save-dev'}
]

// 命令别名
module.exports.aliasCommand = {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}