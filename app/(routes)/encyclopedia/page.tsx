'use client'

import { useState, useEffect } from 'react';
import EncyclopediaLayout from './_components/encyclopedia-layout';

interface Message {
  role: 'user' | 'bot';
  type: 'text' | 'image';
  content: string;
}

// 预设的查询按钮内容
const presetQueries = [
  "什么是人工智能",
  "区块链技术",
  "量子计算",
  "机器学习",
  "深度学习",
  "大数据分析",
  "云计算技术",
  "物联网",
  "5G技术",
  "虚拟现实",
  "增强现实",
  "网络安全",
  "边缘计算",
  "自然语言处理",
  "计算机视觉",
  "机器人技术",
  "数字孪生",
  "区块链应用",
  "元宇宙",
  "人工智能伦理"
];

export default function EncyclopediaPage() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://api.coze.cn/open_api/v2/chat';
  const BOT_ID = '7458635080693891122';
  const AUTH_TOKEN = 'pat_hSpsKkQE4xfd3GenvEFToapb35HmoVynzk3TIS5pKhekIjd2EEaSNiRCFZUmzXff';
  const USER_ID = 'user_' + Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    const savedMessages = localStorage.getItem('encyclopediaMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSend = async () => {
    const message = messageInput.trim();
    if (!message || isLoading) return;

    try {
      setIsLoading(true);
      setMessageInput('');
      
      const newMessages = [...messages, { role: 'user', type: 'text', content: message }];
      setMessages(newMessages);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          bot_id: BOT_ID,
          user: USER_ID,
          query: message,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // 处理所有返回的消息
      let processedContent = data.messages?.filter(
        (msg: any) => msg.role === 'assistant'
      ).map((msg: any) => {
        let content = msg.content;
        
        // 移除所有JSON格式相关内容
        if (content.includes('{"')) {
          try {
            // 1. 处理msg_type的JSON
            if (content.includes('{"msg_type"')) {
              const jsonObj = JSON.parse(content);
              content = jsonObj.data || '';
            }
            
            // 2. 移除plugin相关信息
            content = content.replace(/,"plugin_id":[^}]+}/g, '');
            content = content.replace(/\{"name":"[^"]+","arguments"[^}]+\}/g, '');
            
            // 3. 移除uuid和finish_reason相关信息
            content = content.replace(/\{"uuid":"[^}]+\}/g, '');
            content = content.replace(/\{"finish_reason":[^}]+\}/g, '');
            
          } catch (e) {
            console.error('JSON parse error:', e);
          }
        }

        // 移除插件调用相关信息
        content = content.replace(/baikequanshushaoerban_1\s+directly\s+streaming\s+reply\./g, '');
        
        // 处理图片标记
        const imageRegex = /!\[image\]\((https:\/\/s\.coze\.cn\/[^\)]+)\)/g;
        const hasImage = imageRegex.test(content);
        
        if (hasImage) {
          imageRegex.lastIndex = 0;
          const imageUrl = imageRegex.exec(content)?.[1] || '';
          content = content.replace(imageRegex, '').trim();
          
          const messages: Message[] = [];
          if (content) {
            messages.push({
              role: 'bot',
              type: 'text',
              content: formatContent(content)
            });
          }
          
          if (imageUrl) {
            messages.push({
              role: 'bot',
              type: 'image',
              content: imageUrl
            });
          }
          
          return messages;
        } else {
          return [{
            role: 'bot',
            type: 'text',
            content: formatContent(content)
          }];
        }
      }).flat();

      if (processedContent && processedContent.length > 0) {
        const updatedMessages = [...newMessages, ...processedContent];
        setMessages(updatedMessages);
        localStorage.setItem('encyclopediaMessages', JSON.stringify(updatedMessages));
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessages = [...messages, { role: 'bot', type: 'text', content: '抱歉，我暂时无法回答这个问题。' }];
      setMessages(errorMessages);
      localStorage.setItem('encyclopediaMessages', JSON.stringify(errorMessages));
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm('确定要清空所有聊天记录吗？')) {
      setMessages([]);
      localStorage.removeItem('encyclopediaMessages');
    }
  };

  const copyMessage = async (text: string, buttonElement: HTMLButtonElement) => {
    try {
      await navigator.clipboard.writeText(text);
      const tooltip = buttonElement.querySelector('.copy-tooltip');
      if (tooltip) {
        tooltip.textContent = '已复制';
        buttonElement.classList.add('copy-success');
        setTimeout(() => {
          tooltip.textContent = '复制';
          buttonElement.classList.remove('copy-success');
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const addPresetQuery = (query: string) => {
    setMessageInput(query);
  };

  const formatContent = (content: string): string => {
    // 移除任何剩余的JSON字符串
    content = content.replace(/\{[^}]+\}/g, '');
    
    // 移除工作流相关信息
    content = content.replace(/^(baikequanshushaoerban_\d+\s+directly\s+streaming\s+reply\.\s*)/i, '');
    
    // 移除多余的换行
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // 移除特殊标记
    content = content.replace(/\[特定讲解\]|\[标准讲解\]|\[定制讲解\]/g, '');
    
    // 移除 ##
    content = content.replace(/##/g, '');
    
    // 清理开头和结尾的空白字符
    content = content.trim();
    
    // 移除空行
    content = content.replace(/^\s*[\r\n]/gm, '');
    
    // 移除连续的空格
    content = content.replace(/\s+/g, ' ');
    
    return content;
  };

  return (
    <EncyclopediaLayout>
      <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-800">
        {/* 预设按钮区域 */}
        <div className="w-48 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {presetQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => addPresetQuery(query)}
                className="px-3 py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1 p-6">
          <div className="split-container">
            <div className="left-panel">
              <h2 className="text-white text-xl font-bold mb-6">AI百科全书</h2>
              <div className="input-wrapper">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 w-full p-5 rounded-xl bg-white/10 text-white resize-none min-h-[200px]"
                  placeholder="请输入您想了解的内容..."
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '查询中...' : '开始查询'}
                </button>
              </div>
            </div>

            <div className="right-panel">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-bold">查询结果</h2>
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  清空记录
                </button>
              </div>
              <div className="messages-container">
                {messages.map((msg, index) => (
                  <div key={index} className="message-container">
                    <div className="message-role">
                      {msg.role === 'user' ? '你' : 'AI'}
                    </div>
                    <div className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                      {msg.type === 'text' ? (
                        <div className="text-message">
                          <span className="whitespace-pre-wrap">{msg.content}</span>
                          {msg.role === 'bot' && (
                            <button
                              className="copy-button"
                              onClick={(e) => copyMessage(msg.content, e.currentTarget)}
                            >
                              复制
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="image-message">
                          <img 
                            src={msg.content} 
                            alt="AI生成的图片" 
                            className="max-w-full h-auto rounded-lg shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .split-container {
            @apply flex h-full gap-6;
          }

          .left-panel {
            @apply w-[400px] min-w-[400px] flex flex-col gap-4;
          }

          .right-panel {
            @apply flex-1 flex flex-col overflow-hidden;
            max-width: calc(100% - 432px);
          }

          .input-wrapper {
            @apply space-y-4;
          }

          .messages-container {
            @apply flex-1 overflow-y-auto space-y-4 pr-4;
            height: calc(100vh - 240px);
          }

          .message-container {
            @apply flex flex-col gap-2;
          }

          .message-role {
            @apply text-sm text-white/80;
          }

          .message {
            @apply p-4 rounded-lg break-words;
            width: fit-content;
            max-width: 90%;
          }

          .user-message {
            @apply bg-white/20 text-white ml-auto;
          }

          .bot-message {
            @apply bg-white/30 text-white;
          }

          .text-message {
            @apply relative whitespace-pre-wrap;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          .copy-button {
            @apply absolute -right-2 -top-2 p-2 bg-white/20 hover:bg-white/30 rounded-full opacity-0 transition-opacity duration-200;
          }

          .text-message:hover .copy-button {
            @apply opacity-100;
          }

          .image-message {
            @apply mt-2;
          }

          .image-message img {
            @apply max-w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform duration-200;
            max-height: 400px;
            object-fit: contain;
          }

          .image-message img:hover {
            @apply transform scale-[1.02];
          }

          /* 自定义滚动条样式 */
          .messages-container::-webkit-scrollbar {
            width: 8px;
          }

          .messages-container::-webkit-scrollbar-track {
            @apply bg-transparent;
          }

          .messages-container::-webkit-scrollbar-thumb {
            @apply bg-white/20 rounded-full;
          }

          .messages-container::-webkit-scrollbar-thumb:hover {
            @apply bg-white/30;
          }
        `}
      </style>
    </EncyclopediaLayout>
  );
}
