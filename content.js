// 全域變數
let checkCount = 0;
const MAX_CHECKS = 3;
let checkInterval = null;
let isChecking = false;

// 用於除錯的logger
const logger = {
    info: (message) => console.log(`[YouTube AutoSkip] ${message}`),
    error: (message) => console.error(`[YouTube AutoSkip] ${message}`)
};

// 重置所有狀態
function resetState() {
    checkCount = 0;
    isChecking = false;
    if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
    }
    logger.info('狀態已重置');
}

// 檢查是否為觀看頁面
function isWatchPage() {
    return window.location.href.includes('/watch');
}

// 尋找不喜歡按鈕
function findDislikeButton() {
    const possibleSelectors = [
        '#segmented-dislike-button > ytd-toggle-button-renderer > yt-button-shape > button',
        'ytd-menu-renderer button[aria-label*="不喜歡"]',
        'button[aria-label*="不喜歡"]',
        '#segmented-dislike-button button'
    ];

    for (const selector of possibleSelectors) {
        const button = document.querySelector(selector);
        if (button) {
            return button;
        }
    }
    return null;
}

// 尋找下一個影片按鈕
function findNextButton() {
    return document.querySelector('.ytp-next-button');
}

// 主要檢查邏輯
function checkAndSkip() {
    if (!isWatchPage()) {
        resetState();
        return;
    }

    if (isChecking) {
        return;
    }

    isChecking = true;
    logger.info(`執行第 ${checkCount + 1} 次檢查`);

    try {
        // 檢查是否達到最大檢查次數
        if (checkCount >= MAX_CHECKS) {
            logger.info('已達到最大檢查次數，停止檢查');
            resetState();
            return;
        }

        const dislikeButton = findDislikeButton();
        if (!dislikeButton) {
            logger.info('找不到不喜歡按鈕');
            checkCount++;
            isChecking = false;
            return;
        }

        // 檢查是否已經按過不喜歡
        const isDisliked = dislikeButton.getAttribute('aria-pressed') === 'true';
        logger.info(`不喜歡按鈕狀態: ${isDisliked ? '已按' : '未按'}`);

        if (isDisliked) {
            const nextButton = findNextButton();
            if (nextButton) {
                logger.info('找到下一部影片按鈕，準備切換');
                nextButton.click();
                resetState();
            } else {
                logger.error('找不到下一部影片按鈕');
            }
        }

        checkCount++;
    } catch (error) {
        logger.error(`檢查過程發生錯誤: ${error.message}`);
    } finally {
        isChecking = false;
    }
}

// 開始檢查程序
function startChecking() {
    if (!isWatchPage()) {
        resetState();
        return;
    }

    if (checkInterval) {
        return;
    }

    logger.info('開始檢查程序');
    resetState();
    checkInterval = setInterval(checkAndSkip, 1000);
}

// 初始化擴充功能
function initialize() {
    logger.info('初始化 YouTube AutoSkip');

    // 監聽 YouTube 的頁面變化
    document.addEventListener('yt-navigate-finish', () => {
        logger.info('偵測到頁面變化');
        startChecking();
    });

    // 監聽網址變化（備用方案）
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            logger.info('偵測到網址變化');
            lastUrl = currentUrl;
            startChecking();
        }
    }).observe(document, { subtree: true, childList: true });

    // 初始檢查
    startChecking();
}

// 啟動擴充功能
initialize();