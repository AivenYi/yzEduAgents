'use client'

import { useState, useEffect } from 'react';
import MathLayout from '../_components/math-layout';
import Link from 'next/link';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function SpeakingPage() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://api.coze.cn/open_api/v2/chat';
  const BOT_ID = '7454971403092688935';
  const AUTH_TOKEN = 'pat_hSpsKkQE4xfd3GenvEFToapb35HmoVynzk3TIS5pKhekIjd2EEaSNiRCFZUmzXff';
  const USER_ID = 'user_' + Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    const savedMessages = localStorage.getItem('speakingMessages');
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
      
      const newMessages = [...messages, { role: 'user', content: message }];
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
      const botMessage = data.messages?.find(
        (msg: any) => msg.role === 'assistant' && msg.type === 'answer'
      );

      if (botMessage) {
        const updatedMessages = [...newMessages, { role: 'bot', content: botMessage.content }];
        setMessages(updatedMessages);
        localStorage.setItem('speakingMessages', JSON.stringify(updatedMessages));
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessages = [...messages, { role: 'bot', content: '抱歉，我暂时无法回答这个问题。' }];
      setMessages(errorMessages);
      localStorage.setItem('speakingMessages', JSON.stringify(errorMessages));
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm('确定要清空所有聊天记录吗？')) {
      setMessages([]);
      localStorage.removeItem('speakingMessages');
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

  return (
    <MathLayout>
      <div className="split-container p-10">
        <div className="left-panel">
          <h2 className="text-white text-xl font-bold mb-6">口语对话</h2>
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
              placeholder="请输入您想练习的口语内容..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? '对话中...' : '开始对话'}
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-bold">转换结果</h2>
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
                  {msg.content}
                  {msg.role === 'bot' && (
                    <button
                      className="copy-button"
                      onClick={(e) => copyMessage(msg.content, e.currentTarget)}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2"
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span className="copy-tooltip">复制</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link href="/" className="back-button">返回主页</Link>
      <button className="clear-button" onClick={clearHistory}>清空记录</button>
    </MathLayout>
  );
}