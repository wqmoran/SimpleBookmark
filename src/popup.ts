// 定义 countBookmarks 函数，用于递归统计书签数量
// 参数 bookmarks 是 chrome.bookmarks.BookmarkTreeNode[] 类型，表示书签节点的数组
// 参数 count 默认值为 0，表示当前的书签计数
const countBookmarks = (bookmarks: chrome.bookmarks.BookmarkTreeNode[], count: number = 0): number => {
    // 遍历书签节点数组
    for (const node of bookmarks) {
        // 判断当前节点是否没有子节点（即没有 children 属性），认为它是一个书签而非文件夹
        if (!node.children) {
            // 如果当前节点是书签，计数器加一
            count++;
        } else {
            // 如果当前节点是一个文件夹，则递归调用 countBookmarks 函数，统计其子节点中的书签数，并更新计数器
            count = countBookmarks(node.children, count);
        }
    }
    // 返回统计完成后的书签总数
    return count;
}

// 调用 chrome.bookmarks.getTree 方法获取所有书签的树状结构
chrome.bookmarks.getTree((bookmarks) => {
    // 调用 countBookmarks 函数，传入书签树，开始统计书签总数
    const totalBookmarks = countBookmarks(bookmarks);

    // 在扩展界面显示总书签数
    const bookmarksCountElement = document.getElementById('bookmarksCount');
    // 检查元素是否存在，避免 null 引用错误
    if (bookmarksCountElement !== null) {
        bookmarksCountElement.textContent = totalBookmarks.toString();
    } else {
        // 处理元素不存在的情况，例如：打印错误消息到控制台
        console.error('无法找到显示书签总数的元素');
    }
})